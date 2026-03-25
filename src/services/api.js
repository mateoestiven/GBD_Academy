const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Función para obtener el token del localStorage
const getToken = () => localStorage.getItem('token');

// Función genérica para hacer peticiones
const apiCall = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en la petición');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ==================== USUARIOS ====================
export const authAPI = {
  signup: (userData) =>
    apiCall('/users/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (email, password) =>
    apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getProfile: (userId) =>
    apiCall(`/users/profile/${userId}`, { method: 'GET' }),

  getAllUsers: () =>
    apiCall('/users/all/users', { method: 'GET' }),

  getTeachers: () =>
    apiCall('/users/teachers/all', { method: 'GET' }),
};

// ==================== MATERIAS ====================
export const subjectAPI = {
  // Ofertar materia
  createSubject: (subjectData) =>
    apiCall('/subjects', {
      method: 'POST',
      body: JSON.stringify(subjectData),
    }),

  // Obtener todas las materias disponibles
  getSubjects: () =>
    apiCall('/subjects', { method: 'GET' }),

  // Obtener una materia por ID
  getSubjectById: (id) =>
    apiCall(`/subjects/${id}`, { method: 'GET' }),

  // Buscar materias
  searchSubjects: (query) =>
    apiCall(`/subjects/buscar/search?q=${query}`, { method: 'GET' }),

  // Actualizar materia
  updateSubject: (id, subjectData) =>
    apiCall(`/subjects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(subjectData),
    }),

  // Inscribir estudiante
  enrollStudent: (subjectId, estudianteId) =>
    apiCall(`/subjects/${subjectId}/enroll`, {
      method: 'POST',
      body: JSON.stringify({ estudiante_id: estudianteId }),
    }),

  // Obtener horario del estudiante
  getStudentSchedule: (estudianteId) =>
    apiCall(`/subjects/horario/${estudianteId}`, { method: 'GET' }),

  // Eliminar materia
  deleteSubject: (id) =>
    apiCall(`/subjects/${id}`, { method: 'DELETE' }),
};

// ==================== CURSOS ====================
export const courseAPI = {
  // Crear curso
  createCourse: (courseData) =>
    apiCall('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    }),

  // Obtener todos los cursos
  getCourses: () =>
    apiCall('/courses', { method: 'GET' }),

  // Obtener un curso por ID
  getCourseById: (id) =>
    apiCall(`/courses/${id}`, { method: 'GET' }),

  // Actualizar curso
  updateCourse: (id, courseData) =>
    apiCall(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    }),

  // Eliminar curso
  deleteCourse: (id) =>
    apiCall(`/courses/${id}`, { method: 'DELETE' }),
};

// ==================== CLASES ====================
export const classAPI = {
  // Obtener todas las clases
  getClasses: () =>
    apiCall('/classes', { method: 'GET' }),

  // Crear una clase
  createClass: (classData) =>
    apiCall('/classes', {
      method: 'POST',
      body: JSON.stringify(classData),
    }),

  // Obtener una clase por ID
  getClassById: (id) =>
    apiCall(`/classes/${id}`, { method: 'GET' }),

  // Actualizar una clase
  updateClass: (id, classData) =>
    apiCall(`/classes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(classData),
    }),

  // Eliminar una clase
  deleteClass: (id) =>
    apiCall(`/classes/${id}`, { method: 'DELETE' }),
};

export default {
  authAPI,
  subjectAPI,
  courseAPI,
  classAPI,
};
