import {useState, useEffect} from 'react';
import { toast } from "react-toastify";
//nodes no usa meta para produccion verga de error, le iba a decir lo mismo jaja 
const API_URL = process.env.VITE_API_URL || 'https://backend-at9b6v5cb-miguelba18s-projects.vercel.app/api/tasks';

export const useGanttTasks = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
           
            if (!Array.isArray(data)) {
                throw new Error("Formato de respuesta incorrecto");
              }
              const formattedTasks = data.map(task => ({
                ...task,
                start_date: new Date(task.start_date).toLocaleString("es-CO", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }).replace(",", ""), 
              }));
      
              setTasks(formattedTasks);
        } catch (error) {
            console.error("error obteniendo tareas:",error);
        }
    };
    const createTasks = async (task) => {
        try {
            const response = await fetch(API_URL,{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(task),
            });
            if (response.ok) fetchTasks();
            toast.success("Tarea creada exitosamente",);
        } catch (error) {
            console.error("error creando tareas:",error);
        }
    };
    
    const updateTask = async (id, updatedTask) => {
        try {
            const response = await fetch(`${API_URL}/${id}`,{
                method: "PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(updatedTask),
            });
            if (response.ok) {
                toast.success("Tarea actualizada correctamente"); 
                fetchTasks(); 
            } else {
                toast.error("Error al actualizar la tarea");
            }
        } catch (error) {
            console.error("error actualizando tareas:",error);
        }
    };
    const deleteTasks = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`,{
                method: "DELETE",
            });
            if(response.ok) fetchTasks();
            toast.success("Tarea eliminada correctamente");
        } catch (error) {
            console.error("error eliminado tarea:",error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return {tasks, createTasks, updateTask, deleteTasks};
    

};