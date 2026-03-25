import Class from '../models/Class.js';

// Obtener todas las clases (Para el Home y Gestión)
export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({ createdAt: -1 });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos: " + error.message });
  }
};

// Crear una nueva clase
export const createClass = async (req, res) => {
  try {
    const newClass = new Class(req.body);
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    res.status(400).json({ message: "Error al guardar: " + error.message });
  }
};

// Obtener una clase por ID
export const getClassById = async (req, res) => {
  try {
    const foundClass = await Class.findById(req.params.id);
    if (!foundClass) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }
    res.json(foundClass);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la clase: ' + error.message });
  }
};

// Actualizar una clase
export const updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar: ' + error.message });
  }
};

// Eliminar una clase
export const deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
