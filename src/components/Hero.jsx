import { Link } from "react-router-dom";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Sistema de Clases Online</h1>
        <p className="hero-subtitle">
          Plataforma inteligente para dictar clases en línea con grabación automática,
          transcripción de audio y análisis de contenido.
        </p>

        <div className="hero-buttons">
          <Link to="/subjects" className="btn btn-primary">
            Ver clases disponibles
          </Link>
          <Link to="/signup" className="btn btn-secondary">
            Registrarse
          </Link>
          <Link to="/login" className="btn btn-tertiary">
            Ingresar
          </Link>
        </div>

        <div className="hero-features">
          <div className="feature">
            <span className="feature-icon">🎥</span>
            <p>Grabación Automática</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📝</span>
            <p>Transcripción IA</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <p>Análisis Detallado</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
