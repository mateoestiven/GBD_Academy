import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .login-page {
    min-height: 100vh;
    display: flex;
    font-family: 'DM Sans', sans-serif;
    background: #0a0a0f;
    overflow: hidden;
    position: relative;
  }

  /* Decorative left panel */
  .login-panel-left {
    display: none;
    flex: 1;
    position: relative;
    background: linear-gradient(135deg, #1a0533 0%, #0d1b4b 50%, #0a2a1a 100%);
    overflow: hidden;
  }

  @media (min-width: 900px) {
    .login-panel-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .panel-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    animation: drift 8s ease-in-out infinite alternate;
  }

  .panel-orb-1 {
    width: 420px;
    height: 420px;
    background: #7c3aed;
    top: -80px;
    left: -80px;
  }

  .panel-orb-2 {
    width: 300px;
    height: 300px;
    background: #0ea5e9;
    bottom: 60px;
    right: -60px;
    animation-delay: -3s;
  }

  .panel-orb-3 {
    width: 200px;
    height: 200px;
    background: #10b981;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -5s;
  }

  @keyframes drift {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(30px, 20px) scale(1.08); }
  }

  .panel-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
  }

  .panel-logo {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 4vw, 3.8rem);
    font-weight: 900;
    letter-spacing: -1px;
    background: linear-gradient(135deg, #e9d5ff, #bfdbfe, #a7f3d0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
    margin-bottom: 1rem;
  }

  .panel-tagline {
    color: rgba(255,255,255,0.55);
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .panel-divider {
    width: 48px;
    height: 2px;
    background: linear-gradient(90deg, #7c3aed, #0ea5e9);
    margin: 1.5rem auto;
    border-radius: 2px;
  }

  /* Right / main form area */
  .login-panel-right {
    flex: 0 0 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    position: relative;
    background: #0a0a0f;
  }

  @media (min-width: 900px) {
    .login-panel-right {
      flex: 0 0 480px;
      padding: 3rem 2.5rem;
    }
  }

  /* Mobile top glow */
  .login-panel-right::before {
    content: '';
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%);
    pointer-events: none;
  }

  .login-box {
    width: 100%;
    max-width: 420px;
    position: relative;
    z-index: 1;
  }

  /* Mobile logo */
  .mobile-logo {
    display: block;
    text-align: center;
    margin-bottom: 2.5rem;
  }

  @media (min-width: 900px) {
    .mobile-logo {
      display: none;
    }
  }

  .mobile-logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    font-weight: 900;
    background: linear-gradient(135deg, #e9d5ff, #bfdbfe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .login-heading {
    font-size: 1.05rem;
    font-weight: 400;
    color: rgba(255,255,255,0.4);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 0.4rem;
  }

  .login-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 5vw, 2.4rem);
    font-weight: 700;
    color: #f1f0f5;
    margin-bottom: 2rem;
    line-height: 1.2;
  }

  /* Form */
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .form-group label {
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }

  .input-wrapper {
    position: relative;
  }

  .input-wrapper input {
    width: 100%;
    padding: 0.9rem 1.1rem;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #f1f0f5;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
    outline: none;
    -webkit-appearance: none;
  }

  .input-wrapper input::placeholder {
    color: rgba(255,255,255,0.2);
  }

  .input-wrapper input:focus {
    border-color: #7c3aed;
    background: rgba(124,58,237,0.07);
    box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
  }

  .input-wrapper input.input-error {
    border-color: #f43f5e;
    background: rgba(244,63,94,0.05);
  }

  .input-wrapper input.input-error:focus {
    box-shadow: 0 0 0 3px rgba(244,63,94,0.15);
  }

  /* Password eye */
  .input-wrapper input[type="password"],
  .input-wrapper input[type="text"] {
    padding-right: 3rem;
  }

  .toggle-password {
    position: absolute;
    right: 0.9rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: rgba(255,255,255,0.35);
    padding: 0.2rem;
    line-height: 1;
    transition: color 0.2s;
  }

  .toggle-password:hover {
    color: rgba(255,255,255,0.7);
  }

  .error-message {
    font-size: 0.78rem;
    color: #f43f5e;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .error-message::before {
    content: '⚠';
    font-size: 0.7rem;
  }

  .server-error {
    padding: 0.75rem 1rem;
    background: rgba(244,63,94,0.1);
    border: 1px solid rgba(244,63,94,0.25);
    border-radius: 8px;
    font-size: 0.85rem;
    color: #fda4af;
    text-align: center;
  }

  /* Submit button */
  .btn-login {
    margin-top: 0.5rem;
    padding: 1rem;
    width: 100%;
    background: linear-gradient(135deg, #7c3aed, #5b21b6);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }

  .btn-login::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .btn-login:hover:not(:disabled)::after {
    opacity: 1;
  }

  .btn-login:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(124,58,237,0.4);
  }

  .btn-login:active:not(:disabled) {
    transform: translateY(0);
  }

  .btn-login:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-login-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  /* Loading spinner */
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Footer links */
  .login-footer {
    margin-top: 1.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9rem;
  }

  .forgot-password {
    font-size: 0.85rem;
    color: rgba(167,139,250,0.8);
    text-decoration: none;
    transition: color 0.2s;
  }

  .forgot-password:hover {
    color: #a78bfa;
    text-decoration: underline;
  }

  .signup-text {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.35);
  }

  .signup-link {
    color: #a78bfa;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .signup-link:hover {
    color: #c4b5fd;
    text-decoration: underline;
  }

  .btn-back {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 1.8rem;
    font-size: 0.82rem;
    color: rgba(255,255,255,0.25);
    text-decoration: none;
    letter-spacing: 0.5px;
    transition: color 0.2s;
  }

  .btn-back:hover {
    color: rgba(255,255,255,0.5);
  }

  /* Divider */
  .form-divider {
    height: 1px;
    background: rgba(255,255,255,0.07);
    margin: 0.5rem 0;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
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
    } else if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userName", data.user.nombre);
        localStorage.setItem("userType", data.user.tipoUsuario);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/MisClases");
      } else {
        setErrors({ ...errors, server: data.message });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setErrors({ ...errors, server: "Error de conexión con el servidor" });
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-page">
        {/* Left decorative panel */}
        <div className="login-panel-left">
          <div className="panel-orb panel-orb-1" />
          <div className="panel-orb panel-orb-2" />
          <div className="panel-orb panel-orb-3" />
          <div className="panel-content">
            <div className="panel-logo">GBD<br />Academy</div>
            <div className="panel-divider" />
            <div className="panel-tagline">Tu espacio de aprendizaje</div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="login-panel-right">
          <div className="login-box">
            {/* Mobile logo */}
            <div className="mobile-logo">
              <span className="mobile-logo-text">GBD Academy</span>
            </div>

            <p className="login-heading">Bienvenido de vuelta</p>
            <h1 className="login-title">Iniciar Sesión</h1>

            <form onSubmit={handleSubmit} className="login-form" noValidate>
              {errors.server && (
                <div className="server-error">{errors.server}</div>
              )}

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="tu@correo.com"
                    value={form.email}
                    onChange={handleChange}
                    className={errors.email ? "input-error" : ""}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className={errors.password ? "input-error" : ""}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <button type="submit" className="btn-login" disabled={loading}>
                <span className="btn-login-inner">
                  {loading && <span className="spinner" />}
                  {loading ? "Iniciando sesión..." : "Ingresar"}
                </span>
              </button>
            </form>

            <div className="form-divider" style={{ marginTop: "1.5rem" }} />

            <div className="login-footer">
              <Link to="/forgot-password" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </Link>
              <p className="signup-text">
                ¿No tienes cuenta?{" "}
                <Link to="/signup" className="signup-link">
                  Regístrate aquí
                </Link>
              </p>
            </div>

            <Link to="/" className="btn-back">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;