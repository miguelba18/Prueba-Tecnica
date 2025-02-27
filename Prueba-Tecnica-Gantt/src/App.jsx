import Gantt from './components/Gantt'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
function App() {
  

  return (
  
      <div>
        <motion.h1
      className="text-green-500 text-5xl font-bold p-4 text-center relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <span className="relative z-10">Diagrama de Gantt</span>
      <span className="absolute top-1 left-1 right-1 text-green-300 blur-md">
        Diagrama de Gantt
      </span>
    </motion.h1>
        <Gantt />
        <ToastContainer />
      </div>
      
  )
}

export default App
