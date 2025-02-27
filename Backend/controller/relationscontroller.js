const pool = require("../db"); // Asegúrate de importar tu conexión a PostgreSQL

const createRelation = async (req, res) => {
    try {
        const { source_task_id, target_task_id, type } = req.body;

        const result = await pool.query(
            "INSERT INTO task_relations (source_task_id, target_task_id, type) VALUES ($1, $2, $3) RETURNING *",
            [source_task_id, target_task_id, type]
        );

        res.status(201).json(result.rows[0]); // Retorna la relación creada
    } catch (error) {
        console.error("Error creando relación:", error);
        res.status(500).json({ error: "Error al crear relación" });
    }
};

const deleteRelation = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query("DELETE FROM task_relations WHERE id = $1", [id]);

        res.status(200).json({ message: "Relación eliminada correctamente" });
    } catch (error) {
        console.error("Error eliminando relación:", error);
        res.status(500).json({ error: "Error al eliminar relación" });
    }
};

const getRelations = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM task_relations");

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error obteniendo relaciones:", error);
        res.status(500).json({ error: "Error al obtener relaciones" });
    }
};
module.exports = {
    createRelation,
    deleteRelation,
    getRelations
};