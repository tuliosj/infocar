import "reflect-metadata";
import express from "express";
import createConnection from "./database";
import { router } from "./routes";

createConnection();
const app = express();
const port = 3333;

app.use(express.json());
app.use(router);

export { app, port };
