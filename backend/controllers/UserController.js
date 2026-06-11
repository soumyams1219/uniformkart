import UserModel from "../models/UserSchema.js";
import bcrypt from "bcrypt";
export const Usercreate = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password, confirmpassword } = req.body;
        const emailverify = await UserModel.findOne({ email });
        if (emailverify) {
            return res.status(400).json({ message: "Email already exists" });
        }
        else {
            if (password === confirmpassword) {
                const encrpassword = await bcrypt.hash(password, 3);
                await UserModel.create({ ...req.body, password: encrpassword });
                return res.status(201).json({ message: "User created successfully" });
            }
            else {
                return res.status(400).json({ message: "Password didn't match" });
            }
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });

    }
};

export const userupdate = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(req.userid, req.body);
        res.send("profile updated");
    } catch (error) {
        console.log(error);
    }
};

export const userview = async (req, res) => {
    try {
        const fetchdata = await UserModel.findById(req.userid);
        res.send(fetchdata);

    } catch (error) {
        console.log(error);

    }
}

export const userdelete = async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.userid, req.body);
        res.json({ message: "user profile deleted" });

    } catch (error) {
        console.log(error)
    }

}
