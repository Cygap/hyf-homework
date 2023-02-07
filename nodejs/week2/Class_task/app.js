const express = require("express");
const router = require("./api/snippets");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello Class!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
