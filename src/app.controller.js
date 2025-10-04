import express from "express";
import authController from "./modules/auth/auth.controller.js";
import userController from "./modules/user/user.controller.js";
import messageController from "./modules/message/message.controller.js";
import connectDB from "./DB/connection.db.js";
import { globalErrorHandling } from "./utils/response.js";
import * as dotenv from "dotenv";

dotenv.config({});
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
export default async function bootstrap() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));

  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 2000,
    standardHeaders: "draft-8",
  });

  app.use(limiter);
  app.use(express.json());
  await connectDB();

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to app" });
  });
  app.use("/auth", authController);
  app.use("/user", userController);
  app.use("/message", messageController);
  app.all("{/*dummy}", (req, res) => {
    res.status(404).json({ message: "In-Valid url" });
  });

  app.use(globalErrorHandling);

  app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server listening on port:::${port}`);
  });
}
