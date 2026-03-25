import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
    length: 10,
    match: /^\d{10}$/ // Solo números, longitud 10
  },
  nombre_materia: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  docente_asignado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  horario: {
    type: String,
    required: true,
    trim: true
  },
  cupos: {
    type: Number,
    required: true,
    min: 1
  },
  cupos_disponibles: {
    type: Number,
    required: true,
    min: 0
  },
  estado: {
    type: String,
    enum: ['Disponible', 'No disponible', 'Cerrada'],
    default: 'Disponible'
  },
  estudiantes_inscritos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
