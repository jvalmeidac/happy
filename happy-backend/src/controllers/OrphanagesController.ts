import { Request, Response } from "express";
import { Any, getRepository } from "typeorm";
import { validate } from "class-validator";

import Orphanage from "../models/Orphanage";
import orphanageView from "../views/orphanage_views";

export default {
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    const orphanages = await orphanagesRepository.find({
      relations: ["images"],
    });

    return res.json(orphanageView.renderMany(orphanages));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return res.json(orphanageView.render(orphanage));
  },

  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;
    const requestImages = req.files as Express.Multer.File[];

    const orphanagesRepository = getRepository(Orphanage);

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    let orphanage = new Orphanage();

    orphanage.name = name;
    orphanage.about = about;
    orphanage.instructions = instructions;
    orphanage.latitude = latitude;
    orphanage.longitude = longitude;
    orphanage.opening_hours = opening_hours;
    orphanage.open_on_weekends = open_on_weekends === "true";
    orphanage.images = images;

    const errors = await validate(orphanage);
    if (errors.length > 0) {
      res.status(400).json({ errors: errors });
      return;
    }

    await orphanagesRepository.save(orphanage);

    return res.status(201).json({ message: "Successful!", orphanage });
  },
};
