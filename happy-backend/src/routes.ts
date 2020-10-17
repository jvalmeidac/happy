import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/upload";

import OrphanagesController from "./controllers/OrphanagesController";
import UserController from "./controllers/UserController";

const routes = Router();
const upload = multer(uploadConfig);

//Orphanage Route
routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);
routes.post("/orphanages", upload.array("images"), OrphanagesController.create);

//User Router
routes.get("/users", UserController.getUsers);
routes.get("/users/:id", UserController.getUser);
routes.post("/users", UserController.create);

export default routes;
