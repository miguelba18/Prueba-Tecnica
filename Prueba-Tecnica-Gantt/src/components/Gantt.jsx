import React, { useEffect, useRef } from "react";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import gantt from "dhtmlx-gantt";
import { useGanttTasks } from "../hooks/useGanttTasks";

const GanttChart = () => {
  const ganttContainer = useRef(null);
  const { tasks,createTasks,updateTask,deleteTasks } = useGanttTasks();

  useEffect(() => {
    gantt.config.readonly = false; // Permitir edición de tareas
    gantt.init(ganttContainer.current);

    // Definir estructuras de tareas
    const tasks = {
      data: [
        { id: 1, text: "Proyecto 1", start_date: "2024-03-01", duration: 10, progress: 0.4, type: "project", open: true },
        { id: 2, text: "Tarea Principal 1", start_date: "2024-03-02", duration: 6, parent: 1, progress: 0.6, type: "task" },
        { id: 3, text: "Subtarea 1.1", start_date: "2024-03-03", duration: 3, parent: 2, progress: 0.8, type: "task" },
        { id: 4, text: "Subtarea 1.2", start_date: "2024-03-04", duration: 4, parent: 2, progress: 0.5, type: "task" },
        { id: 5, text: "Tarea Principal 2", start_date: "2024-03-05", duration: 7, parent: 1, progress: 0.3, type: "task" },
        { id: 6, text: "Subtarea 2.1", start_date: "2024-03-06", duration: 5, parent: 5, progress: 0.7, type: "task" },
      ],
    };

    gantt.parse(tasks);

    return () => {
      gantt.clearAll(); // Limpia el Gantt al desmontar el componente
    };
  }, []);

  return <div ref={ganttContainer} style={{ width: "100%", height: "500px" }} />;
};

export default GanttChart;
