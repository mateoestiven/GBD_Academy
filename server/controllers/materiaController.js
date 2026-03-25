import Class from '../models/Class.js';

export const getMaterialasOfertadas = async (req, res) => {
  try {
    const materias = await Class.find({ estado: 'Disponible' });
    res.json(materias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const buscarMaterias = async (req, res) => {
  try {
    const { q } = req.query;
    const materias = await Class.find({
      $or: [
        { nombre: { $regex: q, $options: 'i' } },
        { codigo: { $regex: q, $options: 'i' } }
      ],
      estado: 'Disponible'
    });
    res.json(materias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};