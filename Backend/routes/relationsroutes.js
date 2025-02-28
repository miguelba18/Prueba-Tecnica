const express = require("express");
const { createRelation, deleteRelation, getRelations } = require("../controller/relationscontroller");

const router = express.Router();

router.post("/", (req, res) => {
  createRelation(req, res);
});

router.delete("/:id", (req, res) => {
  deleteRelation(req, res);
});

router.get("/", (req, res) => {
  getRelations(req, res);
});

module.exports = router;
