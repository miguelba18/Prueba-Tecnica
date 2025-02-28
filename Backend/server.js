require("dotenv").config(); // Cargar variables de entorno desde .env

const express = require("express");
const cors = require("cors");

const app = express();

// 🔥 Verificar que las variables se están cargando correctamente
console.log("📌 DATABASE_URL:", process.env.DATABASE_URL ? "✅ OK" : "❌ No definida");
console.log("📌 FRONTEND_URL:", process.env.FRONTEND_URL || "❌ No definida");

// Configurar CORS para permitir frontend en local y producción
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "https://prueba-tecnica-gantt-j6rg95l36-miguelba18s-projects.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 🚀 Prueba de conexión
app.get("/", (req, res) => {
  res.send("🚀 Backend funcionando correctamente en Vercel!");
});

// No usar `app.listen()` en Vercel (solo local)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}

module.exports = app;
