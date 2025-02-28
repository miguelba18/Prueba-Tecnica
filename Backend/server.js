require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const relationRoutes = require("./routes/relationsroutes");
const tasksRoutes = require("./routes/task");


const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],  // Permite solicitudes desde localhost:5173
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// 🔹 Configuración adicional para garantizar que CORS funcione bien en producción
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");  // Permite solicitudes desde localhost:5173
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
});

// 🔹 Manejador de solicitudes preflight OPTIONS
app.options("*", (req, res) => {
  res.status(200).end();
});

// 🔹 Definir rutas
app.use("/api", tasksRoutes);
app.use("/api/relations", relationRoutes);

// 🔹 Ruta de prueba para ver si el backend funciona
app.get("/", (req, res) => {
  res.send("🚀 Backend funcionando en Vercel!");
});

// 🔹 Asegurar que Vercel no intente usar `app.listen()`
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

// Exportar para que Vercel lo maneje correctamente
module.exports = app;
