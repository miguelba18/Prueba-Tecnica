const express = require("express");
const cors = require("cors");

const app = express();

// 🔥 Configurar CORS correctamente
app.use(cors({
    origin: "http://localhost:5173", // Cambia esto por la URL de tu frontend en producción
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: false // No necesitas credentials si no usas autenticación con cookies
}));

app.use(express.json()); // Permitir JSON en el body de las peticiones

// 🔥 Manejar preflight requests de CORS (Opcional pero recomendado)
app.options("*", cors());

// 🔥 Ruta de prueba para verificar que el backend está respondiendo
app.get("/", (req, res) => {
    res.send("🚀 Backend funcionando correctamente con CORS habilitado!");
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
