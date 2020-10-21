import { Response, Request, NextFunction } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../models/User";

export default {
  async getUsers(req: Request, res: Response) {
    const userRepository = getRepository(User);

    const users = await userRepository.find({
      select: ["id", "email", "name", "surname"],
    });

    return res.status(200).json(users);
  },
  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id);
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    return res.status(200).json(user);
  },

  async create(req: Request, res: Response) {
    let { name, surname, email, password } = req.body;
    const userRepository = getRepository(User);

    const verifyEmail = await userRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .getOne();

    if (verifyEmail !== undefined) {
      res.status(409).json({ error: "Email already exists." });
      return;
    }

    let user = new User();

    user.name = name;
    user.surname = surname;
    user.email = email;
    user.password = password;

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).json({ error: errors });
      return;
    }

    user.hashPassword();
    await userRepository.save(user);

    return res.status(201).json({ message: "User created successfully!" });
  },
};
