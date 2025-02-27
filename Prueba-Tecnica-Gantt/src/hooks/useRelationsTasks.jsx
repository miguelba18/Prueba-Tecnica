import {useState, useEffect, use} from 'react';
import { toast } from "react-toastify";

const API_URL = 'http://localhost:5000/api/relations';

export const useRelationsTasks = () => {
    const [relations, setRelations] = useState([]);

    const fetchRelations = async () => {
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
            const data = await response.json();
            setRelations(data);
            }
        } catch (error) {
            console.error("error obteniendo relaciones:",error);
        }
    };

    

    const createRelation = async (relation) => {
        try {
            const response = await fetch(API_URL,{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(relation),
            });
            if (response.ok) fetchRelations();
            toast.success("Tarea creada exitosamente",);
        } catch (error) {
            console.error("error creando tareas:",error);
        }
    };
    
    
    const deleteRelation = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`,{
                method: "DELETE",
            });
            if(response.ok) fetchRelations();
            toast.success("Relacion eliminada correctamente");
        } catch (error) {
            console.error("error eliminado tarea:",error);
        }
    };
    useEffect(() => {
        fetchRelations();
    }, []);

    
    return {relations, createRelation,  deleteRelation};
    

};