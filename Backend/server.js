require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// 📌 Importar rutas
const tasksRoutes = require("./routes/task");
const relationRoutes = require("./routes/relationsroutes");

// 🔥 Mostrar variables de entorno cargadas
console.log("📌 BASE DE DATOS:", process.env.DATABASE_URL ? "✅ OK" : "❌ No definida");
console.log("📌 FRONTEND_URL:", process.env.FRONTEND_URL || "❌ No definida");

// 🔥 Configuración de CORS
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "https://prueba-tecnica-gantt-j6rg95l36-miguelba18s-projects.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 📌 Definir rutas
app.use("/api/tasks", tasksRoutes);
app.use("/api/relations", relationRoutes);

// 🔍 Ruta de prueba para verificar que el backend funciona
app.get("/", (req, res) => {
  res.send("🚀 Backend funcionando correctamente en Vercel!");
});

// 🚀 No usar `app.listen()` en Vercel (solo local)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
}

module.exports = app;
