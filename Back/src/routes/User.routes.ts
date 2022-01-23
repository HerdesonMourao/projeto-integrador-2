import { Router } from "express";
import UserController from "../controllers/UserController";

const routes = Router();

routes.post('/', UserController.store);
routes.get('/', UserController.index);
routes.get('/:id', UserController.show);

export default routes;