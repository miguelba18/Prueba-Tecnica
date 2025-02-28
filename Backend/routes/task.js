const express = require("express");
const router = express.Router();
const pool = require("../db");

// 📌 Obtener todas las tareas
router.get("/", async (req, res) => {  
  try {
    console.log("📌 GET /api/tasks"); // 🔥 Log para verificar llamadas
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error obteniendo tareas:", err.message);
    res.status(500).send("Error en el servidor");
  }
});

// 📌 Crear una nueva tarea
router.post("/", async (req, res) => {  
  try {
    console.log("📌 POST /api/tasks:", req.body);
    const { text, start_date, duration, progress, parent } = req.body;
    const newTask = await pool.query(
      "INSERT INTO tasks (text, start_date, duration, progress, parent) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [text, start_date, duration, progress, parent]
    );
    res.json(newTask.rows[0]);
  } catch (err) {
    console.error("❌ Error creando tarea:", err.message);
    res.status(500).send("Error en el servidor");
  }
});

// 📌 Actualizar una tarea
router.put("/:id", async (req, res) => {
  try {
    console.log("📌 PUT /api/tasks/:id", req.params.id, req.body);
    const { id } = req.params;
    const { text, start_date, duration, progress, parent } = req.body;
    const updateTask = await pool.query(
      "UPDATE tasks SET text = $1, start_date = $2, duration = $3, progress = $4, parent = $5 WHERE id = $6 RETURNING *",
      [text, start_date, duration, progress, parent, id]
    );
    res.json(updateTask.rows[0]);
  } catch (err) {
    console.error("❌ Error actualizando tarea:", err.message);
    res.status(500).send("Error en el servidor");
  }
});

// 📌 Eliminar una tarea
router.delete("/:id", async (req, res) => {
  try {
    console.log("📌 DELETE /api/tasks/:id", req.params.id);
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (err) {
    console.error("❌ Error eliminando tarea:", err.message);
    res.status(500).send("Error en el servidor");
  }
});

module.exports = router;
