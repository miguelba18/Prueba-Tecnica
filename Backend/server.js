require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const relationRoutes = require("./routes/relationsroutes"); // Ruta corregida
const tasksRoutes = require("./routes/task"); // Ruta corregida

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/tasks", tasksRoutes);
app.use("/api/relations", relationRoutes);

// Prueba de conexión
app.get("/", (req, res) => {
  res.send("🚀 Backend funcionando en Vercel!");
});

// Ruta para obtener todas las tareas
app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM tasks");
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

// Ruta para crear una nueva tarea
app.post("/tasks", async (req, res) => {
  try {
    const { text, start_date, duration, progress, parent } = req.body;
    const newTask = await pool.query(
      "INSERT INTO tasks (text, start_date, duration, progress, parent) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [text, start_date, duration, progress, parent]
    );
    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en el servidor");
  }
});

// 🚨 Importante: No uses app.listen() en Vercel
module.exports = app;
