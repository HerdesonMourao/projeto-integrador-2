import { Router } from "express";
import CategoryController from "../controllers/CategoryController";

const routes = Router();

routes.post('/', CategoryController.store);
routes.get('/', CategoryController.index);
routes.get('/:id', CategoryController.show);
routes.put('/:id', CategoryController.update);
routes.delete('/:id', CategoryController.destroy);

export default routes;