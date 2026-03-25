import Course from '../models/Course.js';
import User from '../models/User.js';

// Crear un nuevo curso (solo administrador)
export const createCourse = async (req, res) => {
  try {
    const { nombre_curso, codigo_curso, descripcion, id_docente } = req.body;

    // Validaciones
    if (!nombre_curso || !codigo_curso || !id_docente) {
      return res.status(400).json({ message: 'Campos requeridos: nombre_curso, codigo_curso, id_docente' });
    }

    if (nombre_curso.length < 5 || nombre_curso.length > 80) {
      return res.status(400).json({ message: 'El nombre del curso debe tener entre 5 y 80 caracteres' });
    }

    if (codigo_curso.length > 10 || !/^[a-zA-Z0-9]+$/.test(codigo_curso)) {
      return res.status(400).json({ message: 'El código debe contener solo letras y números (máximo 10)' });
    }

    // Verificar que el docente existe
    const docente = await User.findById(id_docente);
    if (!docente || docente.tipoUsuario !== 'docente') {
      return res.status(400).json({ message: 'El docente especificado no existe o no es válido' });
    }

    const newCourse = new Course({
      nombre_curso,
      codigo_curso,
      descripcion: descripcion || '',
      id_docente
    });

    const savedCourse = await newCourse.save();
    res.status(201).json({ message: 'Curso creado exitosamente', course: savedCourse });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'El código del curso ya existe' });
    }
    res.status(500).json({ message: 'Error al crear el curso: ' + error.message });
  }
};

// Obtener todos los cursos
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('id_docente', 'nombre email');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cursos: ' + error.message });
  }
};

// Obtener un curso por ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('id_docente', 'nombre email');
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el curso: ' + error.message });
  }
};

// Actualizar un curso
export const updateCourse = async (req, res) => {
  try {
    const { nombre_curso, codigo_curso, descripcion, id_docente } = req.body;

    // Validaciones
    if (nombre_curso && (nombre_curso.length < 5 || nombre_curso.length > 80)) {
      return res.status(400).json({ message: 'El nombre del curso debe tener entre 5 y 80 caracteres' });
    }

    if (codigo_curso && (codigo_curso.length > 10 || !/^[a-zA-Z0-9]+$/.test(codigo_curso))) {
      return res.status(400).json({ message: 'El código debe contener solo letras y números (máximo 10)' });
    }

    if (id_docente) {
      const docente = await User.findById(id_docente);
      if (!docente || docente.tipoUsuario !== 'docente') {
        return res.status(400).json({ message: 'El docente especificado no existe o no es válido' });
      }
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { nombre_curso, codigo_curso, descripcion, id_docente },
      { new: true, runValidators: true }
    ).populate('id_docente', 'nombre email');

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    res.json({ message: 'Curso actualizado exitosamente', course: updatedCourse });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'El código del curso ya existe' });
    }
    res.status(500).json({ message: 'Error al actualizar el curso: ' + error.message });
  }
};

// Eliminar un curso
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.json({ message: 'Curso eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el curso: ' + error.message });
  }
};
