require("dotenv").config(); // Cargar variables de entorno
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const relationRoutes = require("./routes/relationsroutes");
const tasksRoutes = require("./routes/task");

const app = express();

// 🔥 Mostrar variables cargadas (depuración)
console.log("📌 Conectado a la base de datos:", process.env.DATABASE_URL ? "✅ OK" : "❌ No definida");
console.log("📌 Permitido CORS para:", process.env.FRONTEND_URL || "❌ No definida");

// 🔥 Configuración de CORS (permite localhost y producción en Vercel)
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "https://prueba-tecnica-gantt.vercel.app", // Producción en Vercel
    "http://localhost:5173" // Desarrollo local
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 📌 Rutas
app.use("/api/tasks", tasksRoutes);
app.use("/api/relations", relationRoutes);

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
