import { useMatch } from "react-router-dom"
import Navbar from "./components/student/Navbar"
import Router from "./Router"
import "quill/dist/quill.snow.css";
import { ToastContainer } from 'react-toastify';




const App = () => {

  const isEducatorRoute= useMatch('/educator/*')
  return (
  <div className="text-default min-h-screen bg-white">
    <ToastContainer />
    {!isEducatorRoute && <Navbar/> }
    
    <Router/>
    
  </div>
  
  )
}

export default App
