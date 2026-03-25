import Subject from '../models/Subject.js';
import User from '../models/User.js';

// Ofertar una nueva materia (administrador)
export const createSubject = async (req, res) => {
  try {
    const { codigo, nombre_materia, docente_asignado, horario, cupos } = req.body;

    // Validaciones
    if (!codigo || !nombre_materia || !docente_asignado || !horario || !cupos) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    if (!/^\d{10}$/.test(codigo)) {
      return res.status(400).json({ message: 'El código debe tener exactamente 10 dígitos' });
    }

    if (nombre_materia.length > 50) {
      return res.status(400).json({ message: 'El nombre de la materia no puede exceder 50 caracteres' });
    }

    // Verificar que el docente existe
    const docente = await User.findById(docente_asignado);
    if (!docente || docente.tipoUsuario !== 'docente') {
      return res.status(400).json({ message: 'El docente especificado no existe o no es válido' });
    }

    const newSubject = new Subject({
      codigo,
      nombre_materia,
      docente_asignado,
      horario,
      cupos,
      cupos_disponibles: cupos,
      estudiantes_inscritos: []
    });

    const savedSubject = await newSubject.save();
    res.status(201).json({ message: 'Materia ofertada exitosamente', subject: savedSubject });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'El código de la materia ya existe' });
    }
    res.status(500).json({ message: 'Error al ofertar la materia: ' + error.message });
  }
};

// Obtener todas las materias ofertadas
export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ estado: 'Disponible' })
      .populate('docente_asignado', 'nombre email');
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener materias: ' + error.message });
  }
};

// Obtener una materia por ID
export const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id)
      .populate('docente_asignado', 'nombre email')
      .populate('estudiantes_inscritos', 'nombre email documento');
    
    if (!subject) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la materia: ' + error.message });
  }
};

// Buscar materias por nombre o código
export const searchSubjects = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Parámetro de búsqueda requerido' });
    }

    const subjects = await Subject.find({
      $or: [
        { nombre_materia: { $regex: q, $options: 'i' } },
        { codigo: { $regex: q, $options: 'i' } }
      ],
      estado: 'Disponible'
    }).populate('docente_asignado', 'nombre email');

    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error en la búsqueda: ' + error.message });
  }
};

// Actualizar una materia ofertada (administrador)
export const updateSubject = async (req, res) => {
  try {
    const { nombre_materia, docente_asignado, horario, cupos, estado } = req.body;

    // Validaciones
    if (nombre_materia && nombre_materia.length > 50) {
      return res.status(400).json({ message: 'El nombre de la materia no puede exceder 50 caracteres' });
    }

    if (docente_asignado) {
      const docente = await User.findById(docente_asignado);
      if (!docente || docente.tipoUsuario !== 'docente') {
        return res.status(400).json({ message: 'El docente especificado no existe o no es válido' });
      }
    }

    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }

    // Actualizar campos
    if (nombre_materia) subject.nombre_materia = nombre_materia;
    if (docente_asignado) subject.docente_asignado = docente_asignado;
    if (horario) subject.horario = horario;
    if (cupos) {
      const diferencia = cupos - subject.cupos;
      subject.cupos = cupos;
      subject.cupos_disponibles += diferencia;
    }
    if (estado) subject.estado = estado;

    const updatedSubject = await subject.save();
    res.json({ message: 'Materia actualizada exitosamente', subject: updatedSubject });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la materia: ' + error.message });
  }
};

// Inscribir estudiante a una materia
export const enrollStudent = async (req, res) => {
  try {
    const { estudiante_id } = req.body;
    const { subject_id } = req.params;

    if (!estudiante_id) {
      return res.status(400).json({ message: 'ID del estudiante requerido' });
    }

    const subject = await Subject.findById(subject_id);
    if (!subject) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }

    // Verificar que el estudiante existe
    const estudiante = await User.findById(estudiante_id);
    if (!estudiante || estudiante.tipoUsuario !== 'estudiante') {
      return res.status(400).json({ message: 'El estudiante especificado no existe o no es válido' });
    }

    // Verificar si ya está inscrito
    if (subject.estudiantes_inscritos.includes(estudiante_id)) {
      return res.status(400).json({ message: 'El estudiante ya está inscrito en esta materia' });
    }

    // Verificar cupos disponibles
    if (subject.cupos_disponibles <= 0) {
      return res.status(400).json({ message: 'Cupos agotados' });
    }

    // Inscribir estudiante
    subject.estudiantes_inscritos.push(estudiante_id);
    subject.cupos_disponibles -= 1;

    const updatedSubject = await subject.save();
    res.json({ message: 'Inscripción exitosa', subject: updatedSubject });
  } catch (error) {
    res.status(500).json({ message: 'Error en la inscripción: ' + error.message });
  }
};

// Obtener horario de estudiante (materias inscritas)
export const getStudentSchedule = async (req, res) => {
  try {
    const { estudiante_id } = req.params;

    const subjects = await Subject.find({
      estudiantes_inscritos: estudiante_id,
      estado: 'Disponible'
    }).populate('docente_asignado', 'nombre email documento');

    // Siempre devolver lista de materias (vacía si no hay inscripciones)
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el horario: ' + error.message });
  }
};

// Eliminar una materia
export const deleteSubject = async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
    if (!deletedSubject) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }
    res.json({ message: 'Materia eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la materia: ' + error.message });
  }
};
