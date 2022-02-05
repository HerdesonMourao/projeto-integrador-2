import { Router } from "express";
import RevenueController from "../controllers/RevenueController";

const routes = Router();

routes.post('/', RevenueController.store);
routes.get('/', RevenueController.index);
routes.get('/:id', RevenueController.show);
routes.put('/:id', RevenueController.update);
routes.delete('/:id', RevenueController.destroy);

export default routes;