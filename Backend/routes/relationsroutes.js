const express = require("express");
const { createRelation, deleteRelation, getRelations } = require("../controller/relationscontroller");

const router = express.Router();

router.post("/", createRelation); 
router.delete("/:id", deleteRelation); 
router.get("/", getRelations); // Obtener todas las relaciones

module.exports = router;