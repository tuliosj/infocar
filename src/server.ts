import "reflect-metadata";
import express from "express";
import "./database";
import { router } from "./routes";

const app = express();
const port = 3333;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
