import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { subjectAPI } from "../../services/api";
import "../../styles/VerMaterias.css";

const SubjectsView = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [enrolling, setEnrolling] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const data = await subjectAPI.getSubjects();
      setSubjects(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!busqueda.trim()) {
      fetchSubjects();
      return;
    }

    try {
      const data = await subjectAPI.searchSubjects(busqueda);
      setSubjects(data);
    } catch (error) {
      console.error("Error en búsqueda:", error);
    }
  };

  const handleEnroll = async (subjectId) => {
    if (!userId) {
      alert("Debes iniciar sesión para inscribirte");
      return;
    }

    setEnrolling(subjectId);
    try {
      await subjectAPI.enrollStudent(subjectId, userId);
      alert("¡Inscripción exitosa!");
      fetchSubjects();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setEnrolling(null);
    }
  };

  if (loading) return <div className="ver-materias-page"><p>Cargando materias...</p></div>;

  return (
    <div className="ver-materias-page">
      <div className="ver-materias-container">
        <Link to="/" className="back-link">← Volver al Inicio</Link>
        <h2>📚 Materias Ofertadas</h2>
        
        <form onSubmit={handleBuscar} className="busqueda-form">
          <input 
            type="text" 
            placeholder="Buscar por nombre o código..." 
            value={busqueda} 
            onChange={(e) => setBusqueda(e.target.value)} 
          />
          <button type="submit">Buscar</button>
        </form>

        {subjects.length === 0 ? (
          <p className="no-subjects">No hay materias ofertadas en este momento</p>
        ) : (
          <div className="subjects-grid">
            {subjects.map(subject => (
              <div key={subject._id} className="subject-card">
                <div className="subject-header">
                  <h3>{subject.nombre_materia}</h3>
                  <span className="codigo-badge">{subject.codigo}</span>
                </div>
                <div className="subject-info">
                  <p><strong>📚 Docente:</strong> {subject.docente_asignado.nombre}</p>
                  <p><strong>⏰ Horario:</strong> {subject.horario}</p>
                  <p><strong>👥 Cupos disponibles:</strong> {subject.cupos_disponibles}/{subject.cupos}</p>
                </div>
                <button 
                  onClick={() => handleEnroll(subject._id)}
                  disabled={subject.cupos_disponibles === 0 || enrolling === subject._id}
                  className={`btn-enroll ${subject.cupos_disponibles === 0 ? 'disabled' : ''}`}
                >
                  {enrolling === subject._id ? "Inscribiendo..." : subject.cupos_disponibles === 0 ? "Cupos Agotados" : "Inscribirse"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectsView;
