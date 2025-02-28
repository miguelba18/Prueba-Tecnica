require("dotenv").config(); // Cargar variables de entorno
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// 🔥 Mostrar variables cargadas (depuración)
console.log("📌 Conectado a la base de datos:", process.env.DATABASE_URL ? "✅ OK" : "❌ No definida");
console.log("📌 Permitido CORS para:", process.env.FRONTEND_URL || "❌ No definida");

// 🔥 Configuración de CORS (permite localhost y producción en Vercel)
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "https://prueba-tecnica-gantt.vercel.app", // Frontend en producción
    "http://localhost:5173" // Frontend en desarrollo
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 📌 Ruta para obtener todas las tareas
app.get("/api/tasks", async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM tasks");
    res.json(allTasks.rows);
  } catch (err) {
    console.error("Error obteniendo tareas:", err.message);
    res.status(500).send("Error en el servidor");
  }
});

// 📌 Ruta para crear una nueva tarea
app.post("/api/tasks", async (req, res) => {
  try {
    const { text, start_date, duration, progress, parent } = req.body;

    const newTask = await pool.query(
      "INSERT INTO tasks (text, start_date, duration, progress, parent) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [text, start_date, duration, progress, parent]
    );

    res.json(newTask.rows[0]); // 🔥 Devuelve la nueva tarea creada
  } catch (err) {
    console.error("Error al crear la tarea:", err.message);
    res.status(500).send("Error en el servidor");
  }
});

// 🔍 Prueba de conexión
app.get("/", (req, res) => {
  res.send("🚀 Backend funcionando correctamente en Vercel!");
});

// 🚀 No usar `app.listen()` en Vercel (solo para local)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}

module.exports = app;
