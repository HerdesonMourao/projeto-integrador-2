import { Router } from "express";
import CardsController from "../controllers/CardsController";

const routes = Router();

routes.post('/', CardsController.store);
routes.get('/', CardsController.index);

export default routes;