import express, { request, response } from "express";
const router = express.Router();
import db from "../database.js";
import { contactsTable } from "../database.js";

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const contacts = await db("contacts").select("*");
    response.json(contacts);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    const contact = request.body;

    if (!contact) return response.status(400);

    console.log(contact);
    // This could be insecure!!
    await db("contacts").insert(contact);
    response.status(201).json(contact);
  } catch (error) {
    console.error(error);
    response.status(500).send(error.message);
  }
});

router.get("/search", async (request, response) => {
  const { name, phoneNumber } = request.query;
  try {
    if (!request.query) {
      throw new Error("No parameter provided");
    }
    let contactsQuery = db("contacts");
    Object.keys(request.query).forEach((key) => {
      if (contactsTable.includes(key)) {
        contactsQuery = contactsQuery.where(
          `${key}`,
          "like",
          `%${request.query[key]}%`
        );
      } else {
        throw new Error("Wrong parameters");
      }
    });

    const contacts = await contactsQuery;

    if (!contacts.length) {
      throw new Error("No user contact found");
    }
    console.log(contacts);
    response.json(contacts);
  } catch (error) {
    console.error(error);
    switch (error.message) {
      case "No parameter provided":
        response.status(400).send(error.message);
        break;
      case "No user contact found":
        response.status(404).send(error.message);
        break;
      default:
        response.status(500).end();
    }
  }
});

export default router;
