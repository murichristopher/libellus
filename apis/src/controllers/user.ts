import { Request, Response } from "express";
import * as UserRepository from "../repositories/user";

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
    const newUser = await UserRepository.create(req.body);

    return res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const logInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserRepository.findByEmail(email);

  try {
    if (email && password && user?.password === password) {
      return res.status(200).json(user);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
