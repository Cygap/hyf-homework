import express from "express";
import documents from "./documents.json" assert { type: "json" };

const router = express.Router();

const filterObject = (searchValue) => {
  return documents.filter((doc) =>
    Object.values(doc).find((value) => value.toString().includes(searchValue))
  );
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
    res.json(filterObject(req.query.q));
  } else if (req.body.fields) {
    const result = documents.filter((doc) => {
      let found = true;

      Object.entries(req.body.fields).forEach(([key, value]) => {
        if (!(doc[key] === value)) {
          found = false;
        }
      });
      return found;
    });

    res.json(result);
  }
});

export default router;
