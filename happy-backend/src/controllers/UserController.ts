import { Response, Request } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import * as Yup from "yup";

import User from "../models/User";

export default {
  async getUsers(req: Request, res: Response) {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return res.status(200).json(users);
  },
  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id);

    return res.status(200).json(user);
  },

  async create(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;

    const userRepository = getRepository(User);

    const passwordHash = await bcrypt.hash(password, 10);

    const data = { name, surname, email, password: passwordHash };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      surname: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = userRepository.create(data);

    await userRepository.save(user);

    return res.status(201).json({ message: "User created successfully!" });
  },
};
