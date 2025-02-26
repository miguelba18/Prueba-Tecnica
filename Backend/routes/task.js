const express = require("express");
const router = express.Router();
const pool = require("../db");

// Obtener todas las tareas
router.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Crear una nueva tarea
router.post("/tasks", async (req, res) => {
  try {
    const { text, start_date, duration, progress, parent } = req.body;
    const newTask = await pool.query(
      "INSERT INTO tasks (text, start_date, duration, progress, parent) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [text, start_date, duration, progress, parent]
    );
    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Actualizar una tarea
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, start_date, duration, progress, parent } = req.body;
    const updateTask = await pool.query(
      "UPDATE tasks SET text = $1, start_date = $2, duration = $3, progress = $4, parent = $5 WHERE id = $6 RETURNING *",
      [text, start_date, duration, progress, parent, id]
    );
    res.json(updateTask.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Eliminar una tarea
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
