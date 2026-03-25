import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>GBD Academy</h3>
          <p>Plataforma de educación online con grabación y transcripción automática.</p>
        </div>

        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><a href="#clases">Clases</a></li>
            <li><a href="#como-funciona">Cómo Funciona</a></li>
            <li><a href="#beneficios">Beneficios</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <ul>
            <li>📧 <a href="mailto:info@gbdacademy.com">info@gbdacademy.com</a></li>
            <li>📞 +1 (555) 123-4567</li>
            <li>📍 Ciudad, País</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} GBD Academy. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
