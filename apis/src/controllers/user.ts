import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import * as UserRepository from "../repositories/user";
import { User } from "../models/user";

interface IRequest extends Request {
  user?: any;
}
interface MongoError {
  code?: number;
  name?: string;
  message?: string;
}

export const profile = async (req: IRequest, res: Response) => {
  const user = await UserRepository.findById(req.user.userId);

  return res.status(200).json(user);
};

export const fetchUsers = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await UserRepository.all());
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await UserRepository.create(name, email, password);

    const payload = {
      userId: newUser.id,
      userEmail: newUser.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!);

    return res.status(201).json({ newUser, token });
  } catch (error) {
    const err = error as MongoError;

    console.error(error);

    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", details: err.message });
    }

    if (err.code === 11000) {
      return res.status(409).json({
        message: "Duplicate Key Error",
        details: "Email already exists",
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
      details: "An unexpected error occurred",
    });
  }
};

export const logInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserRepository.findByEmail(email);

  try {
    if (user && email && password && user?.password === password) {
      const payload = {
        userId: user.id,
        userEmail: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET!);

      return res.status(200).json({ user, token });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
