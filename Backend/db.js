require("dotenv").config();
const { Pool } = require("pg");

// Configurar la conexión con PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Neon siempre requiere SSL
  },
  max: 20, // Máximo de conexiones simultáneas
  idleTimeoutMillis: 30000, // Cierra conexiones inactivas tras 30 segundos
  connectionTimeoutMillis: 2000 // Timeout de conexión de 2 segundos
});

// Probar la conexión (opcional, solo para desarrollo)
if (process.env.NODE_ENV !== "production") {
  pool.connect((err, client, release) => {
    if (err) {
      console.error("🔴 Error conectando a PostgreSQL:", err.stack);
      return;
    }
    console.log("🟢 Conectado a PostgreSQL");
    release(); // Libera la conexión de vuelta al pool
  });
}

// Exportar el pool
module.exports = pool;