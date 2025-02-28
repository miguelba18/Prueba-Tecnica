const express = require("express");
const { createRelation, deleteRelation, getRelations } = require("../controller/relationscontroller");

const router = express.Router();

router.post("/", createRelation);  // Ahora la ruta es "/api/relations/"
router.delete("/:id", deleteRelation); 
router.get("/", getRelations);

module.exports = router;
//suba cambios ps