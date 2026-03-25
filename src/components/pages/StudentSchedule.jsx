import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { subjectAPI } from "../../services/api";
import "../../styles/VerMaterias.css";

const StudentSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const data = await subjectAPI.getStudentSchedule(userId);
      setSchedule(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar horario:", error);
      setLoading(false);
    }
  };

  if (loading) return <div className="ver-materias-page"><p>Cargando horario...</p></div>;

  return (
    <div className="ver-materias-page">
      <div className="ver-materias-container">
        <Link to="/" className="back-link">← Volver al Inicio</Link>
        <h2>📅 Mi Horario</h2>

        {schedule.length === 0 ? (
          <div className="no-subjects">
            <p>No tienes materias registradas</p>
            <Link to="/subjects" className="btn-primary">Ver Materias Disponibles</Link>
          </div>
        ) : (
          <div className="schedule-container">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Materia</th>
                  <th>Código</th>
                  <th>Docente</th>
                  <th>Horario</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map(subject => (
                  <tr key={subject._id}>
                    <td>{subject.nombre_materia}</td>
                    <td>{subject.codigo}</td>
                    <td>{subject.docente_asignado.nombre}</td>
                    <td>{subject.horario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSchedule;
