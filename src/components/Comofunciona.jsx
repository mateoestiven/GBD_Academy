import "../styles/Comofunciona.css";

const Comofunciona = () => {
  const steps = [
    {
      id: 1,
      icon: "👨‍🏫",
      title: "El profesor crea la clase",
      description: "El profesor configura la clase con título, descripción y horario"
    },
    {
      id: 2,
      icon: "👥",
      title: "Los estudiantes se unen",
      description: "Los estudiantes se registran y acceden a la clase en vivo"
    },
    {
      id: 3,
      icon: "🎥",
      title: "Grabación y transcripción",
      description: "El sistema graba automáticamente y transcribe el contenido"
    },
    {
      id: 4,
      icon: "💾",
      title: "Transcripción guardada",
      description: "Todo se almacena en la nube para acceso posterior"
    }
  ];

  return (
    <section id="como-funciona" className="comofunciona-section">
      <div className="comofunciona-container">
        <h2>¿Cómo Funciona?</h2>
        <p className="section-subtitle">Un proceso simple en 4 pasos</p>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.id} className="step">
              <div className="step-number">{step.id}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              
              {index < steps.length - 1 && <div className="step-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comofunciona;
