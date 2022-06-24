import { Router } from "express";
import CardsController from "../controllers/CardsController";

const routes = Router();

routes.post('/', CardsController.store);
routes.get('/:id/all', CardsController.index);
routes.get('/:id', CardsController.show);
routes.put('/:id', CardsController.update);
routes.delete('/:id', CardsController.destroy);

export default routes;