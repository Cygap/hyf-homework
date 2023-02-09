import express, { json } from "express";
const app = express();
const port = process.env.PORT || 3000;

import router from "./routes.js";

// Support parsing JSON requests
app.use(json());
app.use(router);

app.get("/", (req, res) => {
  res.send("This is a search engine");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
