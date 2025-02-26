import {useState, useEffect} from 'react';

const API_URL = 'http://localhost:5000/api/tasks';

export const useGanttTasks = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setTasks(data);
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
            if(response.ok) fetchTasks();
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
        } catch (error) {
            console.error("error eliminado tarea:",error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return {tasks, createTasks, updateTask, deleteTasks};
    

};