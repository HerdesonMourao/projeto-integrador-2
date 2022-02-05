import { Router } from 'express';
import user from './User.routes';
import card from './Cards.routes';
import revenue from './Revenue.routes';
import category from './Category.routes';
import expenditure from './Expenditure.routes';

const routes = Router();

routes.use('/user', user);
routes.use('/card', card);
routes.use('/revenue', revenue);
routes.use('/category', category);
routes.use('/expenditure', expenditure);

export default routes;