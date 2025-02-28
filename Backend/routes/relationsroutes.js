const express = require("express");
const { createRelation, deleteRelation, getRelations } = require("../controller/relationscontroller");

const router = express.Router();

router.post("/", (req, res) => {
  console.log("📌 POST /api/relations", req.body);
  createRelation(req, res);
});

router.delete("/:id", (req, res) => {
  console.log("📌 DELETE /api/relations/:id", req.params.id);
  deleteRelation(req, res);
});

router.get("/", (req, res) => {
  console.log("📌 GET /api/relations");
  getRelations(req, res);
});

module.exports = router;
