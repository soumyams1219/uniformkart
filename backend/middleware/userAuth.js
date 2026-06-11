import jwt from 'jsonwebtoken';

export const userAuthorization = (allowRoles) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Authorization header missing or invalid" });
            }

            const token = authHeader.split(" ")[1];

            const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

            console.log("Decoded token:", decoded);

            if (!allowRoles.includes(decoded.userrole)) {
                return res.status(403).json({ message: "User not authorized" });
            }

            req.userid = decoded.userid;
            req.userrole = decoded.userrole;

            next();

        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    };
};