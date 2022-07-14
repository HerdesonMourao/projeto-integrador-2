import { Router } from "express";
import DashboardController from "../controllers/DashboardController";

const routes = Router();

routes.get('/', DashboardController.store);

export default routes;