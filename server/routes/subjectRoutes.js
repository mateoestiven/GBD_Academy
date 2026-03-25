import express from 'express';
import {
  createSubject,
  getSubjects,
  getSubjectById,
  searchSubjects,
  updateSubject,
  enrollStudent,
  getStudentSchedule,
  deleteSubject
} from '../controllers/subjectController.js';

const router = express.Router();

// Ofertar materia (crear)
router.post('/', createSubject);

// Obtener todas las materias disponibles
router.get('/', getSubjects);

// Buscar materias
router.get('/buscar/search', searchSubjects);

// Obtener una materia por ID
router.get('/:id', getSubjectById);

// Actualizar materia
router.put('/:id', updateSubject);

// Inscribir estudiante a materia
router.post('/:subject_id/enroll', enrollStudent);

// Obtener horario del estudiante
router.get('/horario/:estudiante_id', getStudentSchedule);

// Eliminar materia
router.delete('/:id', deleteSubject);

export default router;
