import dotenv from "dotenv";
dotenv.config();

import knex from "knex";

// create connection
const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  pool: { min: 0, max: 7 }
});
let contactsTable;
// Check that the connection works
db.raw("SELECT VERSION()").then(() => {
  console.log(`connection to db successful!`);
});
db("contacts")
  .columnInfo()
  .then((result) => {
    contactsTable = Object.keys(result);
    console.log(
      "\x1b[32m",
      "%cdatabase.js line:23 db.contactsTable",
      "\x1b[0m",
      contactsTable
    );
  });
export { contactsTable as contactsTable };
export default db;
