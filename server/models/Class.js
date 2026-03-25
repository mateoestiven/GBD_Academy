import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  codigo: { type: String, default: "" },
  nombre: { type: String, default: "" },
  profesor: { type: String, default: "" },
  horario: { type: String, default: "" },
  cupos_disponibles: { type: Number, default: 0 },
  estado: { type: String, default: "Disponible" }
}, { strict: false, timestamps: true }); // 'strict: false' es la clave aquí

const Class = mongoose.model('Class', classSchema);
export default Class;
  