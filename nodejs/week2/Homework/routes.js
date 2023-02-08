import express from "express";
import documents from "./documents.json" assert { type: "json" };

const router = express.Router();

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
const filterObject = (searchValue) => {
  return documents.filter((doc) => {
    const found = Object.values(doc).find((value) => {
      return value.toString().includes(searchValue);
    });
    console.log("Found this value: ", found);
    return found;
  });
};

router.get("/search", (req, res) => {
  let result;
  if (!req.query.q) {
    result = documents;
  } else {
    result = filterObject(req.query.q);
  }
  res.json(result);
});

router.get("/documents/:id", (req, res) => {
  const result = documents.filter((doc) => {
    return +doc.id === +req.params.id;
  });
  if (result.length) {
    res.json(result[0]);
  } else {
    res.status(404).json({ response: "No documents found with provided id" });
  }
});

router.post("/search", (req, res) => {
  if ((req.body.fields && req.query.q) || !(req.body.fields || req.query.q)) {
    res.status(400).json({
      response:
        "Both ?q= and fields list cannot be provided, but at least one should be. Please, choose one option"
    });
  } else if (req.query.q) {
    console.log("query: ", req.query.q, "Result: ", filterObject(req.query.q));
    res.json(filterObject(req.query.q));
  } else if (req.body.fields) {
    res.json({ response: "filtered objects" });
  }
});

export default router;
