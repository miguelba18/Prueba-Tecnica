require("dotenv").config();
const { Pool } = require("pg");

// Configurar la conexión con PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Probar la conexión
pool.connect()
    .then(() => console.log("🟢 Conectado a PostgreSQL"))
    .catch(err => console.error("🔴 Error conectando a PostgreSQL:", err));

module.exports = pool;
