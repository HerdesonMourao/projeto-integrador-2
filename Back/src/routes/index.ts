import { Router } from 'express';
import user from './User.routes';
import card from './Cards.routes';

const routes = Router();

routes.use('/user', user);
routes.use('/card', card);

export default routes;