// Contents of api/snippets.js

const { response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");

class AccessError extends Error {
  constructor(mainCause, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AccessError);
    }

    this.name = "AccessError";
    // Custom debugging information
    this.mainCause = mainCause;
    this.date = new Date();
  }
}

// GET /api/snippets
router.get("/api/snippets", async (req, res) => {
  try {
    if (!req.headers.authorization) {
      const data = await knex("snippets").where("is_private", "false");
      res.json(data);
    } else {
      const token = req.headers.authorization?.split(" ")[1];
      const data = await knex("snippets")
        .join("users", "users.id", "=", "snippets.user_id")
        .where("users.token", token);

      if (!data.length) {
        throw new AccessError(
          "No token",
          "The token is in a wrong format, missing or wrong"
        );
      }
      res.json(data);
    }
  } catch (err) {
    if (err instanceof AccessError) {
      res.status(403).send(`Access denied. ${err.mainCause}. ${err.message}.`);
    } else {
      res.status(500).send(err.message);
    }
  }
});

// TODO: POST /api/snippets
router.post("/api/snippets", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!req.body.title || !req.body.contents) {
      throw new AccessError(
        "No required fields supplied",
        "Title and contents are obligatory fields"
      );
    }
    if (!token) {
      throw new AccessError(
        "No token",
        "No token specified or token format is wrong..."
      );
    }
    const data = await knex("users").where("token", token);

    if (!data.length) {
      throw new AccessError("No user", "invalid credentials!");
    }
    await knex("snippets").insert(req.body);
    res.status(201).json(req.body);
  } catch (err) {
    if (err instanceof AccessError) {
      res.status(403).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
});

// TODO: GET /api/snippets/:id
router.get("/api/snippets/:id", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      throw new AccessError(
        "No token",
        "The token is missing or in a wrong format"
      );
    }
    const userId = await knex("users")
      .select("id")
      .where("users.token", token)
      .pluck("id");
    console.log(userId[0]);
    if (!userId[0]) {
      throw new AccessError("Wrong token", "Wrong credential data!");
    }
    const snippet = await knex("snippets")
      .where("snippets.id", req.params.id)
      .where("user_id", userId[0]);

    if (!snippet.length) throw new Error("No snippet found!");
    res.json(snippet);
  } catch (err) {
    if (err instanceof AccessError) {
      res.status(403).send(`${err.mainCause}. ${err.message}`);
    } else {
      res.status(404).send(err.message);
    }
  }
});
module.exports = router;
