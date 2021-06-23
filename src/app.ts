import "reflect-metadata";
import express from 'express';
import './database';

const app = express();
const port = 3333;

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});