import { Router } from "express";
import ExpenditureController from "../controllers/ExpenditureController";

const routes = Router();

routes.post('/', ExpenditureController.store);
routes.get('/:id/all', ExpenditureController.index);
routes.get('/:id', ExpenditureController.show);
routes.put('/:id', ExpenditureController.update);
routes.delete('/:id', ExpenditureController.destroy);

export default routes;