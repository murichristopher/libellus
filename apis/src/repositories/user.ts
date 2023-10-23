import { User } from "../models/user";

export const all = () => {
  return User.find();
};

export const findByEmail = (email: string) => {
  return User.findOne({ email: email });
};

export const findById = (id: string) => {
  return User.findOne({ _id: id });
};

export const create = async (name: string, email: string, password: string) =>
  User.create({
    name,
    email,
    password,
  });
