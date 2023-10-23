import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./src/config";
import User from "./src/routes/user";
import authenticateUser from "./src/middlewares/authenticateUser";

dotenv.config();

const app: Express = express();
dotenv.config({ path: `./${process.env.NODE_ENV}.env` });
const port = process.env.PORT || 3593;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", User);

app.get("/", (_req: Request, res: Response) => {
  res.send("Express + TypeScript Servers?");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
