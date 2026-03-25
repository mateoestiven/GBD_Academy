import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
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

    // Validar documento (11 dígitos)
    if (!form.documento) {
      newErrors.documento = "El documento es requerido";
    } else if (!/^\d{11}$/.test(form.documento)) {
      newErrors.documento = "El documento debe tener exactamente 11 dígitos";
    }

    // Validar nombre (máximo 40 caracteres)
    if (!form.nombre) {
      newErrors.nombre = "El nombre es requerido";
    } else if (form.nombre.length > 40) {
      newErrors.nombre = "El nombre no puede exceder 40 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.nombre)) {
      newErrors.nombre = "El nombre no puede contener caracteres especiales";
    }

    // Validar teléfono (10 dígitos)
    if (!form.telefono) {
      newErrors.telefono = "El teléfono es requerido";
    } else if (!/^\d{10}$/.test(form.telefono)) {
      newErrors.telefono = "El teléfono debe tener exactamente 10 dígitos";
    }

    // Validar email
    if (!form.email) {
      newErrors.email = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Correo inválido";
    }

    // Validar contraseña (mínimo 8 caracteres)
    if (!form.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (form.password.length < 8) {
      newErrors.password = "La contraseña debe tener mínimo 8 caracteres";
    }

    // Validar confirmación de contraseña
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Debe confirmar la contraseña";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    // Validar términos
    if (!form.aceptaTerminos) {
      newErrors.aceptaTerminos = "Debe aceptar los términos y condiciones";
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
      const response = await authAPI.signup({
        documento: form.documento,
        nombre: form.nombre,
        telefono: form.telefono,
        email: form.email,
        password: form.password,
        tipoUsuario: form.tipoUsuario,
      });

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
              <label htmlFor="telefono">Teléfono (10 dígitos)</label>
              <input
                id="telefono"
                type="text"
                name="telefono"
                placeholder="3001234567"
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
                <option value="docente">Docente</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña (mínimo 8 caracteres)</label>
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

            {errors.server && <span className="error-message">{errors.server}</span>}

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
