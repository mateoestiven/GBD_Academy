import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const Topbar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/users/perfil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUserName(data.nombre);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* 🔹 Logo */}
        <Link to="/" className="navbar-logo">
          <Icon icon="mdi:school-outline" className="logo-icon" />
          <span>GBD Academy</span>
        </Link>

        {/* 🔹 Usuario */}
        <div className="user-section">
          <Icon icon="mdi:account-circle-outline" className="user-icon" />
          <span className="welcome-text">
            Bienvenido, <strong>{userName}</strong>
          </span>

          {/* 🔹 Logout */}
          <button className="logout-btn" onClick={handleLogout}>
            <Icon icon="mdi:logout" />
            Cerrar sesión
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Topbar;