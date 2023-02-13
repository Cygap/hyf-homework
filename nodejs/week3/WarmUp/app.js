require("dotenv").config();
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
  }
});

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const apiRouter = express.Router();
app.use("/api", apiRouter);

const contactsAPIRouter = express.Router();
apiRouter.use("/contacts", contactsAPIRouter);

contactsAPIRouter.get("/", async (req, res) => {
  let query = knex.select("*").from("contacts");

  if ("sort" in req.query) {
    const orderBy = req.query.sort.toString();
    if (orderBy.length > 0) {
      query = query.orderByRaw(orderBy);
    }
  }

  console.log("SQL", query.toSQL().sql);

  try {
    const data = await query;
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});
let contactsTable;
knex("contacts")
  .columnInfo()
  .then((result) => {
    contactsTable = Object.keys(result);
    console.log(
      "\x1b[32m",
      "%app.js line:46 knex.contactsTable",
      "\x1b[0m",
      contactsTable
    );
  });
const API_PORT = process.env.API_PORT;
app.listen(API_PORT, () => {
  console.log(`Listening on port ${API_PORT}`);
});
