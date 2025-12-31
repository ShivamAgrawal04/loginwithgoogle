import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from auth server");
});

app.use("/api/auth", authRoutes);
app.use(errorHandler);

const port = process.env.PORT;
if (!port) console.log("port not defined");

app.listen(port, () => {
  connectDB();
  console.log("server connected");
});
