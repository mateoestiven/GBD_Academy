import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/ClassManagement.css";

const ClassManagement = () => {
  const [clases, setClases] = useState([]);
  const [form, setForm] = useState({
    codigo: "", nombre: "", profesor: "", horario: "", cupos_disponibles: 30
  });

  const fetchClases = async () => {
    const res = await fetch('http://localhost:5000/api/classes' );
    const data = await res.json();
    setClases(data);
  };

  useEffect(() => { fetchClases(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando datos:", form);
    
    const res = await fetch('http://localhost:5000/api/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form )
    });

    if (res.ok) {
      alert("¡GUARDADO CON ÉXITO!");
      setForm({ codigo: "", nombre: "", profesor: "", horario: "", cupos_disponibles: 30 });
      fetchClases();
    } else {
      const error = await res.json();
      alert("Error al guardar: " + (error.message || "Error desconocido"));
    }
  };

  return (
    <div className="management-page">
      <div className="management-container">
        <Link to="/" className="back-link">← Volver</Link>
        <form onSubmit={handleSubmit} className="form-card">
          <h3>Nueva Materia</h3>
          <div className="form-field">
            <label>Código</label>
            <input name="codigo" value={form.codigo} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Docente</label>
            <input name="profesor" value={form.profesor} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Horario</label>
            <input name="horario" value={form.horario} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Cupos</label>
            <input name="cupos_disponibles" type="number" value={form.cupos_disponibles} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-save">GUARDAR EN MONGODB</button>
        </form>

        <div className="management-grid">
          {clases.map((c) => (
            <div key={c._id} className="management-card">
              <h4>{c.nombre}</h4>
              <p>Cod: {c.codigo} | Docente: {c.profesor}</p>
              <button onClick={async () => { await fetch(`http://localhost:5000/api/classes/${c._id}`, {method:'DELETE'} ); fetchClases(); }}>Eliminar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;
