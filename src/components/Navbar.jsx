import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📚</span>
          GBD Academy
        </Link>
        
        <ul className="navbar-menu">
          <li>
            <button 
              className="navbar-link" 
              onClick={() => handleScroll("clases")}
            >
              Clases
            </button>
          </li>
          <li>
            <button 
              className="navbar-link" 
              onClick={() => handleScroll("como-funciona")}
            >
              Cómo Funciona
            </button>
          </li>
          <li>
            <button 
              className="navbar-link" 
              onClick={() => handleScroll("beneficios")}
            >
              Beneficios
            </button>
          </li>
          <li>
            <Link to="/manage-classes" className="navbar-link">
              Gestionar Clases
            </Link>
          </li>
          <li>
            <Link to="/login" className="navbar-link login-link">
              Iniciar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
