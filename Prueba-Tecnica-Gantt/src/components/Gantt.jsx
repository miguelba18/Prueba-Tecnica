import React, { useEffect, useRef } from "react";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import gantt from "dhtmlx-gantt";
import { useGanttTasks } from "../hooks/useGanttTasks";
import { useRelationsTasks } from "../hooks/useRelationsTasks";
import { motion } from "framer-motion";

const GanttChart = () => {
  const ganttContainer = useRef(null);
  const { tasks, createTasks, updateTask, deleteTasks } = useGanttTasks();
  const isEventAttached = useRef(false);
  const { relations, createRelation, deleteRelation } = useRelationsTasks();

  useEffect(() => {
    gantt.config.readonly = false;
    gantt.init(ganttContainer.current);

    return () => {
      gantt.clearAll();
    };
  }, []);
  

useEffect(() => {
  const typeMapping = {
    "finish_to_start": "0",
    "start_to_start": "1",
    "finish_to_finish": "2",
    "start_to_finish": "3",
  };
  const loadGanttData = async () => {
      
      const formattedData = {
          data: tasks.map(task => ({
              ...task,
              start_date: task.start_date.split("T")[0],
          })),
          links: relations.map(relation => ({
              id: relation.id,
              source: relation.source_task_id,
              target: relation.target_task_id,
              type: typeMapping[relation.type]
          }))
      };
      
      gantt.clearAll();
      gantt.parse(formattedData);
  };

  loadGanttData();
}, [tasks, relations]);

  useEffect(() => {
    if (isEventAttached.current) return; // Evita múltiples registros
    isEventAttached.current = true;

    // Evento para agregar tarea
    gantt.attachEvent("onBeforeTaskAdd", async (id, task) => {
      ;

      const newTask = {
        text: task.text,
        start_date: new Date(task.start_date).toISOString().split("T")[0],
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
        console.error("Error al crear tarea:", error);
      }
      return false;
    });

    // Evento para actualizar tarea
    gantt.attachEvent("onAfterTaskUpdate", async (id, task) => {
      const updatedTask = {
        id,
        text: task.text,
        start_date: task.start_date.toISOString().split("T")[0], // Formato YYYY-MM-DD
        duration: task.duration,
        progress: task.progress || 0,
        parent: task.parent || null,
      };
      try {
        
        await updateTask(id, updatedTask);
      } catch (error) {
        console.error(" Error actualizando tarea:", error);
      }
    });
  
    // Evento para cambios al mover o redimensionar la barra
    gantt.attachEvent("onAfterTaskDrag", async (id, mode, task) => {
      const startDate = task.start_date && task.start_date instanceof Date 
    ? task.start_date 
    : new Date();
      const updatedTask = {
        id,
        text: task.text,
        start_date: startDate.toISOString().split("T")[0], // Formato YYYY-MM-DD
        duration: task.duration,
        progress: task.progress || 0,
        parent: task.parent || null,
      };
      try {
        
        await updateTask(id, updatedTask);
      } catch (error) {
        console.error(" Error actualizando tarea tras drag:", error);
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
    gantt.attachEvent("onAfterLinkAdd", async (id, link) => {
    
      
      const typeMapping = {
        0: "finish_to_start",
        1: "start_to_start",
        2: "finish_to_finish",
        3: "start_to_finish",
    };
  
      const newRelation = {
        source_task_id: link.source,
        target_task_id: link.target,
        type: typeMapping[link.type]
        
  
      };
    
      await createRelation(newRelation);
    });
    gantt.attachEvent("onAfterLinkDelete", async (id) => {
      
      await deleteRelation(id);
    })
  }, []);

  
  

  return (
    <>
      <div
        ref={ganttContainer}
        style={{
          width: "100%",
          height: "600px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          padding: "5px",
          position: "relative",
        }}
      />
      <style>
        {`
      
          .gantt_task {
            font-family: "Arial", sans-serif;
            font-size: 14px;
            color: #333;
          }
          
         
          .gantt_grid_head {
            background: #4CAF50 !important;
            color: #fff;
            font-weight: bold;
          }

          .gantt_grid_head_cell {
            background: #388E3C !important;
            color: white !important;
          }

          .gantt_task_line {
            background: #4CAF50 !important;
            border-radius: 5px;
            border: 1px solid #388E3C;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
          }

          /* Color de progreso dentro de la tarea */
          .gantt_task_progress {
            background: #FFC107 !important;
            border-radius: 4px;
          }

          /* Color de los enlaces entre tareas */
          .gantt_link_line {
            stroke: #FF5722 !important;
            stroke-width: 2px;
          }

          /* Mejorar la visibilidad del texto */
          .gantt_task_content {
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </>
  );
};

export default GanttChart;
