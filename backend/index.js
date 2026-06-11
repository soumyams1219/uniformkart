import express from "express";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoute from "./routes/authRoute.js";
import orderRouter from "./routes/orderRoutes.js";
import cartRouter from "./routes/cartRoutes.js";

const kartApp = express();

dotenv.config();

kartApp.use(
  cors({
  origin:"http://localhost:5173",
  credentials:true,
}));

kartApp.use(express.json());
kartApp.use(express.urlencoded({ extended: true }));
kartApp.use(cookieParser());
//kartApp.use("/upload/images", express.static("upload/images"));
kartApp.use("/api/user", userRoutes);
kartApp.use("/api/auth", authRoute);
kartApp.use("/api/schools", schoolRoutes);
kartApp.use("/api/products",productRouter);
kartApp.use("/api/order", orderRouter);
kartApp.use("/api/cart", cartRouter);

kartApp.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server is running successfully");
});
