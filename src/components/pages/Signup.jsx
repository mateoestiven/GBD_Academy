import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    documento: "",
    nombre: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: "",
    tipoUsuario: "estudiante",
    aceptaTerminos: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (form.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres";
    }

    if (!form.documento) {
      newErrors.documento = "El documento es requerido";
    } else if (!/^\d{11}$/.test(form.documento)) {
      newErrors.documento = "El documento debe tener exactamente 11 dígitos";
    }

    if (!form.telefono) {
      newErrors.telefono = "El teléfono es requerido";
    } else if (!/^\d{10}$/.test(form.telefono)) {
      newErrors.telefono = "El teléfono debe tener exactamente 10 dígitos";
    }

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

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!form.aceptaTerminos) {
      newErrors.aceptaTerminos = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
    // Limpiar error del campo
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
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documento: form.documento,
          nombre: form.nombre,
          telefono: form.telefono,
          email: form.email,
          password: form.password,
          tipoUsuario: form.tipoUsuario,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userName", data.user.nombre);
        localStorage.setItem("userType", data.user.tipoUsuario);
        localStorage.setItem("isLoggedIn", "true");
        
        setLoading(false);
        navigate("/");
      } else {
        setErrors({ ...errors, server: data.message });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setErrors({ ...errors, server: "Error de conexión con el servidor" });
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-box">
          <div className="signup-header">
            <h1>GBD Academy</h1>
            <h2>Crear Cuenta</h2>
            <p>Únete a nuestra comunidad de aprendizaje</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                placeholder="Juan Pérez"
                value={form.nombre}
                onChange={handleChange}
                className={errors.nombre ? "input-error" : ""}
              />
              {errors.nombre && <span className="error-message">{errors.nombre}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="documento">Documento (11 dígitos)</label>
              <input
                id="documento"
                type="text"
                name="documento"
                placeholder="12345678901"
                value={form.documento}
                onChange={handleChange}
                className={errors.documento ? "input-error" : ""}
              />
              {errors.documento && <span className="error-message">{errors.documento}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono (10 dígitos)</label>
              <input
                id="telefono"
                type="text"
                name="telefono"
                placeholder="9876543210"
                value={form.telefono}
                onChange={handleChange}
                className={errors.telefono ? "input-error" : ""}
              />
              {errors.telefono && <span className="error-message">{errors.telefono}</span>}
            </div>

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
              <label htmlFor="tipoUsuario">¿Qué eres?</label>
              <select
                id="tipoUsuario"
                name="tipoUsuario"
                value={form.tipoUsuario}
                onChange={handleChange}
              >
                <option value="estudiante">Estudiante</option>
                <option value="profesor">Profesor</option>
              </select>
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

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <div className="password-input-wrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "input-error" : ""}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group checkbox">
              <input
                id="aceptaTerminos"
                type="checkbox"
                name="aceptaTerminos"
                checked={form.aceptaTerminos}
                onChange={handleChange}
              />
              <label htmlFor="aceptaTerminos">
                Acepto los <a href="#terms">términos y condiciones</a>
              </label>
              {errors.aceptaTerminos && <span className="error-message">{errors.aceptaTerminos}</span>}
            </div>

            <button 
              type="submit" 
              className="btn-signup"
              disabled={loading}
            >
              {loading ? "Creando cuenta..." : "Registrarse"}
            </button>
          </form>

          <div className="signup-footer">
            <p>
              ¿Ya tienes cuenta? <Link to="/login" className="login-link">Inicia sesión aquí</Link>
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

export default Signup;
