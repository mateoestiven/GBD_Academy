import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { subjectAPI, authAPI } from "../../services/api";
import "../../styles/ClassManagement.css";

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    codigo: "",
    nombre_materia: "",
    docente_asignado: "",
    horario: "",
    cupos: 30,
  });
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
  }, []);

  const fetchSubjects = async () => {
    try {
      const data = await subjectAPI.getSubjects();
      setSubjects(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar materias:", error);
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const data = await authAPI.getTeachers();
      setTeachers(data);
    } catch (error) {
      console.error("Error al cargar docentes:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await subjectAPI.updateSubject(editingId, form);
        alert("Materia actualizada exitosamente");
        setEditingId(null);
      } else {
        await subjectAPI.createSubject(form);
        alert("Materia ofertada exitosamente");
      }
      
      setForm({
        codigo: "",
        nombre_materia: "",
        docente_asignado: "",
        horario: "",
        cupos: 30,
      });
      fetchSubjects();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleEdit = (subject) => {
    setForm({
      codigo: subject.codigo,
      nombre_materia: subject.nombre_materia,
      docente_asignado: subject.docente_asignado._id,
      horario: subject.horario,
      cupos: subject.cupos,
    });
    setEditingId(subject._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta materia?")) {
      try {
        await subjectAPI.deleteSubject(id);
        alert("Materia eliminada exitosamente");
        fetchSubjects();
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({
      codigo: "",
      nombre_materia: "",
      docente_asignado: "",
      horario: "",
      cupos: 30,
    });
  };

  if (loading) return <div className="management-page"><p>Cargando...</p></div>;

  return (
    <div className="management-page">
      <div className="management-container">
        <Link to="/" className="back-link">← Volver</Link>
        
        <form onSubmit={handleSubmit} className="form-card">
          <h3>{editingId ? "Editar Materia" : "Nueva Materia"}</h3>
          
          <div className="form-field">
            <label>Código (10 dígitos)</label>
            <input 
              name="codigo" 
              value={form.codigo} 
              onChange={handleChange} 
              placeholder="1234567890"
              required 
            />
          </div>

          <div className="form-field">
            <label>Nombre de la Materia</label>
            <input 
              name="nombre_materia" 
              value={form.nombre_materia} 
              onChange={handleChange} 
              placeholder="Ej: Programación Web"
              required 
            />
          </div>

          <div className="form-field">
            <label>Docente Asignado</label>
            <select 
              name="docente_asignado" 
              value={form.docente_asignado} 
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un docente</option>
              {teachers.map(teacher => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.nombre} ({teacher.email})
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label>Horario</label>
            <input 
              name="horario" 
              value={form.horario} 
              onChange={handleChange} 
              placeholder="Lunes y Miércoles 10:00 AM"
              required 
            />
          </div>

          <div className="form-field">
            <label>Cupos Disponibles</label>
            <input 
              name="cupos" 
              type="number" 
              value={form.cupos} 
              onChange={handleChange} 
              min="1"
              required 
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-save">
              {editingId ? "Actualizar Materia" : "Guardar Materia"}
            </button>
            {editingId && (
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <h3>Materias Ofertadas</h3>
        <div className="management-grid">
          {subjects.map((subject) => (
            <div key={subject._id} className="management-card">
              <h4>{subject.nombre_materia}</h4>
              <p><strong>Código:</strong> {subject.codigo}</p>
              <p><strong>Docente:</strong> {subject.docente_asignado.nombre}</p>
              <p><strong>Horario:</strong> {subject.horario}</p>
              <p><strong>Cupos:</strong> {subject.cupos_disponibles}/{subject.cupos}</p>
              <div className="card-buttons">
                <button onClick={() => handleEdit(subject)} className="btn-edit">Editar</button>
                <button onClick={() => handleDelete(subject._id)} className="btn-delete">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectManagement;
