const express = require("express");
const { createRelation, deleteRelation, getRelations } = require("../controller/relationscontroller");

const router = express.Router();

router.post("/", createRelation); // Crear una relación
router.delete("/:id", deleteRelation); // Eliminar una relación
router.get("/", getRelations); // Obtener todas las relaciones

module.exports = router;