import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .signup-page {
    min-height: 100vh;
    display: flex;
    font-family: 'DM Sans', sans-serif;
    background: #0a0a0f;
    overflow-x: hidden;
  }

  /* Left decorative panel */
  .signup-panel-left {
    display: none;
    flex: 0 0 360px;
    position: relative;
    background: linear-gradient(135deg, #1a0533 0%, #0d1b4b 50%, #0a2a1a 100%);
    overflow: hidden;
  }

  @media (min-width: 900px) {
    .signup-panel-left {
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
  .panel-orb-1 { width: 380px; height: 380px; background: #7c3aed; top: -80px; left: -80px; }
  .panel-orb-2 { width: 260px; height: 260px; background: #0ea5e9; bottom: 60px; right: -60px; animation-delay: -3s; }
  .panel-orb-3 { width: 180px; height: 180px; background: #10b981; top: 50%; left: 50%; transform: translate(-50%,-50%); animation-delay: -5s; }

  @keyframes drift {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(30px,20px) scale(1.08); }
  }

  .panel-orb-3 {
    animation-name: drift3;
  }
  @keyframes drift3 {
    from { transform: translate(-50%,-50%) scale(1); }
    to   { transform: translate(calc(-50% + 30px), calc(-50% + 20px)) scale(1.08); }
  }

  .panel-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
  }

  .panel-logo {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 3.5vw, 3.2rem);
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
    color: rgba(255,255,255,0.5);
    font-size: 0.85rem;
    font-weight: 300;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .panel-divider {
    width: 48px;
    height: 2px;
    background: linear-gradient(90deg, #7c3aed, #0ea5e9);
    margin: 1.2rem auto;
    border-radius: 2px;
  }

  .panel-steps {
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: left;
  }

  .panel-step {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .step-dot {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(124,58,237,0.3);
    border: 1px solid rgba(124,58,237,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    color: #c4b5fd;
    font-weight: 500;
    flex-shrink: 0;
  }

  .step-text {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.45);
  }

  /* Right form area */
  .signup-panel-right {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 2rem 1.5rem;
    position: relative;
    overflow-y: auto;
  }

  @media (min-width: 900px) {
    .signup-panel-right {
      padding: 3rem 2.5rem;
      align-items: center;
    }
  }

  .signup-panel-right::before {
    content: '';
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%);
    pointer-events: none;
  }

  .signup-box {
    width: 100%;
    max-width: 480px;
    position: relative;
    z-index: 1;
    padding-top: 8rem;
  }

  /* Mobile logo */
  .mobile-logo {
    display: block;
    text-align: center;
    margin-bottom: 2rem;
  }

  @media (min-width: 900px) {
    .mobile-logo { display: none; }
  }

  .mobile-logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 900;
    background: linear-gradient(135deg, #e9d5ff, #bfdbfe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .signup-heading {
    font-size: 1rem;
    font-weight: 400;
    color: rgba(255,255,255,0.4);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 0.35rem;
  }

  .signup-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.7rem, 4vw, 2.2rem);
    font-weight: 700;
    color: #f1f0f5;
    margin-bottom: 0.4rem;
    line-height: 1.2;
  }

  .signup-subtitle {
    font-size: 0.88rem;
    color: rgba(255,255,255,0.3);
    margin-bottom: 1.8rem;
  }

  /* Two-column grid for desktop */
  .signup-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (min-width: 560px) {
    .form-row {
      grid-template-columns: 1fr 1fr;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .form-group label {
    font-size: 0.76rem;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
  }

  .input-wrapper {
    position: relative;
  }

  .input-wrapper input,
  .signup-form select {
    width: 100%;
    padding: 0.85rem 1rem;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #f1f0f5;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
  }

  .input-wrapper input::placeholder {
    color: rgba(255,255,255,0.18);
  }

  .input-wrapper input:focus,
  .signup-form select:focus {
    border-color: #7c3aed;
    background: rgba(124,58,237,0.07);
    box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
  }

  .input-wrapper input.input-error,
  .signup-form select.input-error {
    border-color: #f43f5e;
    background: rgba(244,63,94,0.05);
  }

  /* Select arrow */
  .select-wrapper {
    position: relative;
  }

  .select-wrapper::after {
    content: '▾';
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.35);
    pointer-events: none;
    font-size: 0.8rem;
  }

  .select-wrapper select {
    padding-right: 2.5rem;
    cursor: pointer;
  }

  .select-wrapper select option {
    background: #1a1a2e;
    color: #f1f0f5;
  }

  /* Password toggle */
  .input-wrapper input[type="password"],
  .input-wrapper input[type="text"] {
    padding-right: 3rem;
  }

  .toggle-password {
    position: absolute;
    right: 0.85rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: rgba(255,255,255,0.3);
    padding: 0.2rem;
    line-height: 1;
    transition: color 0.2s;
  }

  .toggle-password:hover {
    color: rgba(255,255,255,0.65);
  }

  .error-message {
    font-size: 0.76rem;
    color: #f43f5e;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .error-message::before {
    content: '⚠';
    font-size: 0.68rem;
  }

  /* Checkbox */
  .form-group-check {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .check-row {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  .check-row input[type="checkbox"] {
    width: 17px;
    height: 17px;
    flex-shrink: 0;
    accent-color: #7c3aed;
    cursor: pointer;
  }

  .check-row label {
    font-size: 0.84rem;
    color: rgba(255,255,255,0.4);
    cursor: pointer;
    line-height: 1.4;
  }

  .check-row label a {
    color: #a78bfa;
    text-decoration: none;
  }

  .check-row label a:hover {
    text-decoration: underline;
  }

  /* Server error */
  .server-error {
    padding: 0.75rem 1rem;
    background: rgba(244,63,94,0.1);
    border: 1px solid rgba(244,63,94,0.25);
    border-radius: 8px;
    font-size: 0.85rem;
    color: #fda4af;
    text-align: center;
  }

  /* User type selector */
  .user-type-group {
    display: flex;
    gap: 0.6rem;
  }

  .user-type-btn {
    flex: 1;
    padding: 0.75rem 0.5rem;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: rgba(255,255,255,0.4);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
  }

  .user-type-btn .type-icon {
    font-size: 1.3rem;
  }

  .user-type-btn.active {
    background: rgba(124,58,237,0.15);
    border-color: #7c3aed;
    color: #c4b5fd;
    box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
  }

  .user-type-btn:hover:not(.active) {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.65);
  }

  /* Submit */
  .btn-signup {
    margin-top: 0.4rem;
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

  .btn-signup::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .btn-signup:hover:not(:disabled)::after { opacity: 1; }
  .btn-signup:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(124,58,237,0.4);
  }
  .btn-signup:active:not(:disabled) { transform: translateY(0); }
  .btn-signup:disabled { opacity: 0.6; cursor: not-allowed; }

  .btn-signup-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* Footer */
  .signup-footer {
    margin-top: 1.5rem;
    text-align: center;
  }

  .signup-footer p {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.3);
  }

  .login-link {
    color: #a78bfa;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .login-link:hover {
    color: #c4b5fd;
    text-decoration: underline;
  }

  .btn-back {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 1.2rem;
    font-size: 0.82rem;
    color: rgba(255,255,255,0.22);
    text-decoration: none;
    letter-spacing: 0.5px;
    transition: color 0.2s;
  }

  .btn-back:hover { color: rgba(255,255,255,0.5); }

  .form-divider {
    height: 1px;
    background: rgba(255,255,255,0.07);
    margin: 0.5rem 0;
  }

  .section-label {
    font-size: 0.72rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    margin-bottom: 0.6rem;
    margin-top: 0.4rem;
  }
`;

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
    } else if (!/^\d{10}$/.test(form.documento)) {
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
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documento: String(form.documento),
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
    <>
      <style>{styles}</style>
      <div className="signup-page">
        {/* Left panel */}
        <div className="signup-panel-left">
          <div className="panel-orb panel-orb-1" />
          <div className="panel-orb panel-orb-2" />
          <div className="panel-orb panel-orb-3" />
          <div className="panel-content">
            <div className="panel-logo">GBD<br />Academy</div>
            <div className="panel-divider" />
            <div className="panel-tagline">Tu espacio de aprendizaje</div>
            <div className="panel-steps">
              {["Crea tu cuenta gratis", "Elige tu rol", "Accede a tus clases"].map((s, i) => (
                <div className="panel-step" key={i}>
                  <div className="step-dot">{i + 1}</div>
                  <span className="step-text">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="signup-panel-right">
          <div className="signup-box">
            <div className="mobile-logo">
              <span className="mobile-logo-text">GBD Academy</span>
            </div>

            <p className="signup-heading">Únete hoy</p>
            <h1 className="signup-title">Crear Cuenta</h1>
            <p className="signup-subtitle">Completa el formulario para comenzar</p>

            <form onSubmit={handleSubmit} className="signup-form" noValidate>
              {errors.server && <div className="server-error">{errors.server}</div>}

              {/* Nombre + Documento */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo</label>
                  <div className="input-wrapper">
                    <input
                      id="nombre" type="text" name="nombre"
                      placeholder="Juan Pérez"
                      value={form.nombre} onChange={handleChange}
                      className={errors.nombre ? "input-error" : ""}
                      autoComplete="name"
                    />
                  </div>
                  {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="documento">Documento (10 dígitos)</label>
                  <div className="input-wrapper">
                    <input
                      id="documento" type="text" name="documento"
                      placeholder="12345678901"
                      value={form.documento} onChange={handleChange}
                      className={errors.documento ? "input-error" : ""}
                      inputMode="numeric" maxLength={10}
                    />
                  </div>
                  {errors.documento && <span className="error-message">{errors.documento}</span>}
                </div>
              </div>

              {/* Teléfono + Email */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono (10 dígitos)</label>
                  <div className="input-wrapper">
                    <input
                      id="telefono" type="text" name="telefono"
                      placeholder="9876543210"
                      value={form.telefono} onChange={handleChange}
                      className={errors.telefono ? "input-error" : ""}
                      inputMode="numeric" maxLength={10}
                    />
                  </div>
                  {errors.telefono && <span className="error-message">{errors.telefono}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <div className="input-wrapper">
                    <input
                      id="email" type="email" name="email"
                      placeholder="tu@correo.com"
                      value={form.email} onChange={handleChange}
                      className={errors.email ? "input-error" : ""}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              {/* Tipo de usuario */}
              <div className="form-group">
                <label>¿Qué eres?</label>
                <div className="user-type-group">
                  <button
                    type="button"
                    className={`user-type-btn${form.tipoUsuario === "estudiante" ? " active" : ""}`}
                    onClick={() => { setForm({ ...form, tipoUsuario: "estudiante" }); }}
                  >
                    <span className="type-icon">🎓</span>
                    Estudiante
                  </button>
                  <button
                    type="button"
                    className={`user-type-btn${form.tipoUsuario === "profesor" ? " active" : ""}`}
                    onClick={() => { setForm({ ...form, tipoUsuario: "profesor" }); }}
                  >
                    <span className="type-icon">📚</span>
                    Profesor
                  </button>
                </div>
              </div>

              {/* Contraseñas */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <div className="input-wrapper">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password" placeholder="••••••••"
                      value={form.password} onChange={handleChange}
                      className={errors.password ? "input-error" : ""}
                      autoComplete="new-password"
                    />
                    <button type="button" className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                  <div className="input-wrapper">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword" placeholder="••••••••"
                      value={form.confirmPassword} onChange={handleChange}
                      className={errors.confirmPassword ? "input-error" : ""}
                      autoComplete="new-password"
                    />
                    <button type="button" className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                      {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              </div>

              {/* Términos */}
              <div className="form-group-check">
                <div className="check-row">
                  <input
                    id="aceptaTerminos" type="checkbox"
                    name="aceptaTerminos"
                    checked={form.aceptaTerminos} onChange={handleChange}
                  />
                  <label htmlFor="aceptaTerminos">
                    Acepto los <a href="#terms">términos y condiciones</a>
                  </label>
                </div>
                {errors.aceptaTerminos && <span className="error-message">{errors.aceptaTerminos}</span>}
              </div>

              <button type="submit" className="btn-signup" disabled={loading}>
                <span className="btn-signup-inner">
                  {loading && <span className="spinner" />}
                  {loading ? "Creando cuenta..." : "Registrarse"}
                </span>
              </button>
            </form>

            <div className="form-divider" style={{ marginTop: "1.5rem" }} />

            <div className="signup-footer">
              <p>
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="login-link">Inicia sesión aquí</Link>
              </p>
            </div>

            <Link to="/" className="btn-back">← Volver al inicio</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;