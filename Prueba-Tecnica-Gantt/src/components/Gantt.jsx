import React, { useEffect, useRef } from "react";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import gantt from "dhtmlx-gantt";
import { useGanttTasks } from "../hooks/useGanttTasks";

const GanttChart = () => {
  const ganttContainer = useRef(null);
  const { tasks, createTasks, updateTask, deleteTasks } = useGanttTasks();
  const isEventAttached = useRef(false);

  useEffect(() => {
    gantt.config.readonly = false;
    gantt.init(ganttContainer.current);

    return () => {
      gantt.clearAll();
    };
  }, []);

  useEffect(() => {
    gantt.clearAll();
    if (!tasks || tasks.length === 0) return; // Evita parsear si no hay tareas

    const formattedData = {
      data: tasks.map((task) => ({
        ...task,
        start_date: task.start_date.split("T")[0], // Extrae solo la parte YYYY-MM-DD
      })),
    };

    gantt.parse(formattedData);
  }, [tasks]);

  useEffect(() => {
    if (isEventAttached.current) return; // Evita múltiples registros
    isEventAttached.current = true;

    // Evento para agregar tarea
    gantt.attachEvent("onBeforeTaskAdd", async (id, task) => {
      console.log("📌 Nueva tarea detectada en onBeforeTaskAdd:", task);

      const newTask = {
        text: task.text,
        start_date: new Date(task.start_date).toISOString().split("T")[0], // Convertir a YYYY-MM-DD
        duration: task.duration,
        progress: task.progress || 0,
        parent: task.parent || null,
      };

      try {
        const createdTask = await createTasks(newTask);
        if (createdTask && createdTask.id) {
          gantt.changeTaskId(id, createdTask.id);
          gantt.refreshData();
        }
      } catch (error) {
        console.error("❌ Error al crear tarea:", error);
      }
      return false;
    });

    // Evento para actualizar tarea
    gantt.attachEvent("onAfterTaskUpdate", async (id, task) => {
      const updatedTask = {
        id,
        text: task.text,
        start_date: task.start_date,
        duration: task.duration,
        progress: task.progress,
        parent: task.parent,
      };
      try {
        await updateTask(id, updatedTask);
      } catch (error) {
        console.error("Error actualizando tarea:", error);
      }
    });
    
    gantt.attachEvent("onTaskDrag", async (id, mode, task) => {
      if (mode === "move" || mode === "resize") { 
        const updatedTask = {
          text: task.text,
          start_date: task.start_date.split("T")[0], // Convertir a YYYY-MM-DD
          duration: task.duration,
          progress: task.progress,
          parent: task.parent,
        };
    
        try {
          console.log("📤 Moviendo tarea, enviando actualización:", updatedTask);
          await updateTask(id, updatedTask);
        } catch (error) {
          console.error("❌ Error actualizando tarea tras mover:", error);
        }
      }
    });
    

    // Evento para eliminar tarea
    gantt.attachEvent("onAfterTaskDelete", async (id) => {
      try {
        await deleteTasks(id);
      } catch (error) {
        console.error("Error eliminando tarea:", error);
      }
    });
  }, []);

  return (
    <div ref={ganttContainer} style={{ width: "100%", height: "500px" }} />
  );
};

export default GanttChart;
