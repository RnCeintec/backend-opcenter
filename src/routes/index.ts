import { Express } from 'express';

import userRoute from './user.router';
import loginRoute from './auth.route';
import productRoute from './product.route';
import categoryRoute from './category.route';
import clientRoute from './client.route';
import salesRoute from './sales.route';
import pymentTypesRoute from './pymentTypes.route';
import shopRoute from './shop.route';
import dashboardRoute from './dashboar.route';

import facturasRoute from './facturas.routes';
import vendedorRoute from './vendedor.route';

export default ({ app, version }: { app: Express; version: string }) => {
  app.use(version, userRoute);
  app.use(version, loginRoute);
  app.use(version, productRoute);
  app.use(version, categoryRoute);
  app.use(version, clientRoute);
  app.use(version, salesRoute);
  app.use(version, pymentTypesRoute);
  app.use(version, shopRoute);
  app.use(version, dashboardRoute);
  app.use(version, vendedorRoute);

};
