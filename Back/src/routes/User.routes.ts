import { Router } from "express";
import UserController from "../controllers/UserController";
import UpdatePasswordUserController from "../controllers/UpdatePasswordUserController";
import SignInController from "../controllers/SignInController";

const routes = Router();

routes.post('/', UserController.store);
routes.get('/', UserController.index);
routes.get('/:id', UserController.show);
routes.put('/:id', UserController.update);
routes.delete('/:id', UserController.destroy);

routes.put('/password/:id', UpdatePasswordUserController.store);

routes.post('/acess_system', SignInController.store);

export default routes;