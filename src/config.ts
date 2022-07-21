require("dotenv").config();
export const NODE_ENV = process.env.NODE_ENV || "test";
export const PORT = +(process.env.PORT || "3006");

export const DB_USERNAME = process.env.DB_USERNAME || "";
export const DB_DATABASE = process.env.DB_DATABASE || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_SERVER = process.env.DB_SERVER || "";
export const DB_PORT = +(process.env.DB_PORT || "3306");
export const SALT = +(process.env.SALT ?? 11);
export const SECRET_TOKEN = process.env.SECRET_TOKEN || "secret";
export const TOKEN_LIMIT = Number(process.env.TOKEN_LIMIT ?? "1");
