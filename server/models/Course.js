import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  nombre_curso: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 80,
    trim: true
  },
  codigo_curso: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10,
    trim: true,
    match: /^[a-zA-Z0-9]+$/ // Solo letras y números
  },
  descripcion: {
    type: String,
    maxlength: 255,
    default: ""
  },
  id_docente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
