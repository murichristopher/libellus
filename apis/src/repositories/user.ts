import { User } from "../models/user";

export const all = () => {
  return User.find();
};

export const findByEmail = (email: string) => {
  return User.findOne({ email: email });
};

export const create = async (user: any) => User.create(user);
