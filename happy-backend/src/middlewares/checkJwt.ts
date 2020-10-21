import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export function checkJwt(req: Request, res: Response, next: NextFunction) {
  const token = <string>req.headers["auth"];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, <string>process.env.JWT_SECRET);
  } catch (e) {
    res.status(401).json(e);
    return;
  }

  const { userId, email } = jwtPayload;
  const newToken = jwt.sign({ userId, email }, <string>process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.setHeader("token", newToken);
  next();
}
