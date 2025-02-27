import Gantt from './components/Gantt'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  

  return (
  
      <div>
        <h1 className='text-green-500 text-4xl'>Diagrama de Gantt</h1>
        <Gantt />
        <ToastContainer />
      </div>
      
  )
}

export default App
