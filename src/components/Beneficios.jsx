import "../styles/Beneficios.css";

const Beneficios = () => {
  const beneficios = [
    {
      id: 1,
      icon: "🌍",
      titulo: "Acceso desde cualquier lugar",
      descripcion: "Accede a tus clases desde cualquier dispositivo y ubicación"
    },
    {
      id: 2,
      icon: "🤖",
      titulo: "Transcripción automática",
      descripcion: "IA convierte automáticamente el audio en texto editable"
    },
    {
      id: 3,
      icon: "📚",
      titulo: "Historial de clases",
      descripcion: "Accede a todas tus clases grabadas en cualquier momento"
    },
    {
      id: 4,
      icon: "⚡",
      titulo: "Fácil de usar",
      descripcion: "Interfaz intuitiva que no requiere conocimientos técnicos"
    },
    {
      id: 5,
      icon: "🔒",
      titulo: "Seguridad garantizada",
      descripcion: "Tus datos están protegidos con encriptación de nivel empresarial"
    },
    {
      id: 6,
      icon: "📊",
      titulo: "Análisis detallado",
      descripcion: "Obtén reportes y estadísticas de desempeño en tiempo real"
    }
  ];

  return (
    <section id="beneficios" className="beneficios-section">
      <div className="beneficios-container">
        <h2>Beneficios del Sistema</h2>
        <p className="section-subtitle">Descubre por qué somos la mejor opción</p>

        <div className="beneficios-grid">
          {beneficios.map((beneficio) => (
            <div key={beneficio.id} className="beneficio-card">
              <div className="beneficio-icon">{beneficio.icon}</div>
              <h3>{beneficio.titulo}</h3>
              <p>{beneficio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Beneficios;
