require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const relationRoutes = require("../Backend/routes/relationsroutes")

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
const tasksRoutes = require("../Backend/routes/task");
app.use("/api", tasksRoutes);



app.use("/api/relations", relationRoutes);

// Ruta para obtener todas las tareas
app.get("/tasks", async (req, res) => {
  try {
      const allTasks = await pool.query("SELECT * FROM tasks");
      res.json(allTasks.rows);
  } catch (err) {
      console.error(err.message);
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

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
