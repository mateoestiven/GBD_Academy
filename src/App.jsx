import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ClassManagement from "./components/pages/ClassManagement";
import VerMaterias from "./components/pages/VerMaterias";
import MisClases from "./components/pages/MisClasses"; 


import "./App.css";

function App() { 
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/manage-classes" element={<ClassManagement />} />
        <Route path="/materias" element={<VerMaterias />} />
        <Route path="/MisClases" element={<MisClases/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
