import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import "../../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Correo inválido";
    }
    if (!form.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (form.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.login(form.email, form.password);

      localStorage.setItem("token", response.token);
      localStorage.setItem("userEmail", response.user.email);
      localStorage.setItem("userName", response.user.nombre);
      localStorage.setItem("userType", response.user.tipoUsuario);
      localStorage.setItem("userId", response.user.id);
      localStorage.setItem("isLoggedIn", "true");

      setLoading(false);
      navigate("/");
    } catch (error) {
      setErrors({ ...errors, server: error.message });
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>GBD Academy</h1>
            <h2>Iniciar Sesión</h2>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="tu@correo.com"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className={errors.password ? "input-error" : ""}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {errors.server && <span className="error-message">{errors.server}</span>}

            <button 
              type="submit" 
              className="btn-login"
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Ingresar"}
            </button>
          </form>
          <div className="login-footer">
            <Link to="/forgot-password" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </Link>
            <p>
              ¿No tienes cuenta? <Link to="/signup" className="signup-link">Regístrate aquí</Link>
            </p>
          </div>
          <Link to="/" className="btn-back">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
