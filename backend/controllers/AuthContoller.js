import UserModel from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const generateAccess = (user) => {
    const accessToken = jwt.sign(
        {
            userid: user._id, userrole: user.role
        },
        process.env.ACCESS_SECRET_KEY,
        {
            expiresIn: "15m"
        },
    );
    return accessToken;

}


const generateRefresh = (user) => {
    const refreshToken = jwt.sign(
        {
            userid: user._id, userrole: user.role
        },
        process.env.REFRESH_SECRET_KEY,
        {
            expiresIn: "15d"
        },
    );
    return refreshToken;

}

export const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailverify = await UserModel.findOne({ email });
        if (emailverify) {
            const passverify = await bcrypt.compare(password, emailverify.password);
            if (passverify) {

                const accessToken = generateAccess(emailverify);
                const refreshToken = generateRefresh(emailverify);

                emailverify.refreshToken = refreshToken;
                await emailverify.save();



                return res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    sameSite: "lax"

                }).json({
                    message: "logged in successfully",
                    accessToken: accessToken,
                    user: { id: emailverify._id, username: emailverify.username, email: emailverify.email, role: emailverify.role },
                    success: true
                })
            }
            else {
                return res.status(401).json({ message: "incorrect password" });
            }
        }

        else {
            res.status(404).json({ message: "user not found" });
        }

    }
    catch (error) {
        console.log(error);
    }

}
//generating access token using refresh token
export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: "refresh token not found" });
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
        const user = await UserModel.findById(decoded.userid);
        if (!user) return res.status(401).json({ message: "user not found" });
        if (user.refreshToken !== refreshToken)
            return res.status(403).json({ message: "invalid refresh token" });

        const newAccessToken = generateAccess(user);
        return res.status(200).json({
            accessToken: newAccessToken,

            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}






export const userlogout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const user = await UserModel.findOne({ refreshToken });
            if (user) {
                user.refreshToken = null;
                await user.save();
            }
        }
        res.clearCookie("refreshToken");
        res.json({ message: "user logged out" });

    }
    catch (error) {
        console.error("error logging out user:", error)
        return res.status(500).json({ message: "internal server error" });

    }
}