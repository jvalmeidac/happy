import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";

import { User } from "../models/User";

export default {
  async login(req: Request, res: Response) {
    let { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({ error: "Invalid login data" });
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).json({ error: "Invalid password!" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      <string>process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json(token);
  },

  async changePassword(req: Request, res: Response) {
    const id = res.locals.jwtPayload.userId;

    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).json({ error: "Bad Request!" });
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).json({ error: "Unauthorized!" });
    }

    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).json({ error: "Invalid old password!" });
      return;
    }

    user.password = newPassword;
    user.hashPassword();
    userRepository.save(user);

    res.status(204);
  },
};
