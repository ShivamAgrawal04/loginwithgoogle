import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from auth server");
});

app.use("/api/auth", authRoutes);

const port = process.env.PORT;
if (!port) console.log("port not defined");

app.listen(port, () => {
  connectDB();
  console.log("server connected");
});
