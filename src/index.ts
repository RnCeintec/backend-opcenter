import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import RouterUser from "./routes/user.router";
import Routes from "./routes";

import {
  PORT,
  NODE_ENV,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
  DB_SERVER,
  DB_USERNAME,
  // TABLEPREFIX,
} from "./config";
import { control, trim } from "./middlewares";
import {
  validateToken,
  user,
  product,
  token,
  category,
  client,
  sales,
  pymentTypes,
  dashboard,
  facturas,
} from "./security";
// import { Category } from './core/entities';

const app = express();
const main = async () => {
  await createConnection({
    type: "mysql",
    host: DB_SERVER,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: ["dist/core/entities/**/*.js"],
    charset: "utf8mb4_spanish2_ci",
    timezone: "America/Lima",
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());
  app.set("trust proxy", true);

  //TODO Check function
  app.use(control); //* CORS fix 🐛
  app.use(trim); //* Trim

  app.use("/public", express.static("public")); //Expose public folder 📁

  //* Security Layout
  app.use(token);
  app.use(user);
  app.use(product);
  app.use(category);
  app.use(client);
  app.use(sales);
  app.use(pymentTypes);
  app.use(dashboard);
  app.use(facturas);

  // routes
  Routes({ app, version: "/api/v1/" });

  app.use("/api/v1/", RouterUser);

  app.get("/", function (_: Request, res: Response) {
    res.status(200).send(`<h1>Start server 🚀</h1>`);
  });

  app.get("*", function (_: Request, res: Response) {
    res.status(404).send("Page not found");
  });

  app.listen(PORT, () =>
    console.log(`Start server on port ${PORT} 🚀`, NODE_ENV)
  );
};

main();
