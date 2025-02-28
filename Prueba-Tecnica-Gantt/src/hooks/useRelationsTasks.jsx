import { useState, useEffect } from 'react';
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "https://backend-at9b6v5cb-miguelba18s-projects.vercel.app"; // Solo la base

export const useRelationsTasks = () => {
  const [relations, setRelations] = useState([]);

  const fetchRelations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/relations`);
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      const data = await response.json();
      setRelations(data);
    } catch (error) {
      console.error("Error obteniendo relaciones:", error);
      toast.error("Error al cargar las relaciones");
    }
  };

  const createRelation = async (relation) => {
    try {
      const response = await fetch(`${API_URL}/api/relations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(relation),
      });
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      await fetchRelations(); // Refresca la lista
      toast.success("Relación creada exitosamente");
    } catch (error) {
      console.error("Error creando relación:", error);
      toast.error("Error al crear la relación");
    }
  };

  const deleteRelation = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/relations/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      await fetchRelations(); // Refresca la lista
      toast.success("Relación eliminada correctamente");
    } catch (error) {
      console.error("Error eliminando relación:", error);
      toast.error("Error al eliminar la relación");
    }
  };

  useEffect(() => {
    fetchRelations();
  }, []);

  return { relations, createRelation, deleteRelation };
};