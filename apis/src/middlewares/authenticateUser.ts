import jwt, { DecodeOptions, JsonWebTokenError } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface IRequest extends Request {
  user?: any;
  jwtPayload?: JwtExpPayload;
}
interface UserPayload {
  id: string;
}
interface JwtExpPayload {
  exp: number;
}

const authenticateUser = (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // req.jwtPayload = jwt.decode(token!) as JwtExpPayload;

    // console.log("oioii");
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;


    req.user = payload;

    // if (req.jwtPayload) {
    //   return res.status(401);
    // }
    if (!req.user) {
      return res.status(401);
    }

    // console.log("to auqi");
    next();
  } catch (error) {
    const authorizationHeader = req.headers.authorization;

    const token = authorizationHeader

    console.log("token", token);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default authenticateUser;
