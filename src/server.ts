import { app, port } from "./app";

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
