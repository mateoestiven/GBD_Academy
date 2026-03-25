import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/VerMaterias.css";

const VerMaterias = () => {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetchMaterias();
  }, []);

  const fetchMaterias = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/materias' );
      const data = await response.json();
      setMaterias(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    const url = busqueda ? `http://localhost:5000/api/materias/buscar?q=${busqueda}` : 'http://localhost:5000/api/materias';
    const response = await fetch(url );
    const data = await response.json();
    setMaterias(data);
  };

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

        <table className="materias-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Materia</th>
              <th>Docente</th>
              <th>Horario</th>
              <th>Cupos</th>
            </tr>
          </thead>
          <tbody>
            {materias.map(m => (
              <tr key={m._id}>
                <td>{m.codigo}</td>
                <td>{m.nombre}</td>
                <td>{m.profesor}</td>
                <td>{m.horario}</td>
                <td>{m.cupos_disponibles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerMaterias;