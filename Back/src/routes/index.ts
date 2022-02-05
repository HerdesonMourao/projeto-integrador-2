import { Router } from 'express';
import user from './User.routes';
import card from './Cards.routes';
import revenue from './Revenue.routes';

const routes = Router();

routes.use('/user', user);
routes.use('/card', card);
routes.use('/revenue', revenue);

export default routes;