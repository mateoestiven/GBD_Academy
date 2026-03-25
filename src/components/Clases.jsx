import { useState, useEffect } from "react";
import "../styles/Clases.css";

const Clases = () => {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClases();
  }, []);

  const fetchClases = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/classes');
      if (!response.ok) throw new Error('Error al obtener las clases');
      const data = await response.json();
      setClases(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las clases. Asegúrate de que el servidor esté corriendo.");
      setLoading(false);
      // Fallback a datos estáticos si falla la conexión
      setClases([
        { _id: "1", nombre: "Programación Web", profesor: "Carlos Ramirez", estudiantes: 32, estado: "Disponible", horario: "Lunes y Miércoles 10:00 AM" },
        { _id: "2", nombre: "Bases de Datos", profesor: "Ana Martinez", estudiantes: 25, estado: "Disponible", horario: "Martes y Jueves 2:00 PM" }
      ]);
    }
  };

  if (loading) return <section className="clases-section"><div className="clases-container"><p>Cargando clases...</p></div></section>;

  return (
    <section id="clases" className="clases-section">
      <div className="clases-container">
        <h2>Clases Disponibles</h2>
        <p className="section-subtitle">Elige la clase que mejor se adapte a tus necesidades</p>
        {error && <p className="error-message" style={{ textAlign: 'center', color: '#e74c3c' }}>{error}</p>}

        <div className="clases-grid">
          {clases.map((clase) => (
            <div key={clase._id} className="clase-card">
              <div className="clase-header">
                <h3>{clase.nombre}</h3>
                <span className={`estado-badge estado-${clase.estado ? clase.estado.toLowerCase().replace(' ', '-') : 'disponible'}`}>
                  {clase.estado || 'Disponible'}
                </span>
              </div>

              <div className="clase-info">
                <p><strong>👨‍🏫 Profesor:</strong> {clase.profesor}</p>
                <p><strong>👥 Estudiantes:</strong> {clase.estudiantes}</p>
                <p><strong>⏰ Horario:</strong> {clase.horario}</p>
              </div>

              <button className="btn-ver-clase">Ver clase</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clases;
