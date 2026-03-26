import Class from "../models/Class.js";
const User = require("../models/User");

// Obtener todas las clases (Para el Home y Gestión)
export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({ createdAt: -1 });
    res.json(classes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener datos: " + error.message });
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
      return res.status(404).json({ message: "Clase no encontrada" });
    }
    res.json(foundClass);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la clase: " + error.message });
  }
};

// Actualizar una clase
export const updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedClass) {
      return res.status(404).json({ message: "Clase no encontrada" });
    }
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar: " + error.message });
  }
};

// Eliminar una clase
export const deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las clases del usuario autenticado
export  const getUserClasses = async (req, res) => {
  try {
    const userId = req.user.id; // Asumiendo que tienes autenticación con JWT

    // Buscar el usuario y popular las clases matriculadas
    const user = await User.findById(userId)
      .populate("clasesMatriculadas")
      .select("-password"); // Excluir la contraseña

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: user.clasesMatriculadas,
      total: user.clasesMatriculadas.length,
    });
  } catch (error) {
    console.error("Error al obtener clases del usuario:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener las clases",
      error: error.message,
    });
  }
};

// Obtener una clase específica del usuario
export  const getUserClassById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { classId } = req.params;

    // Verificar que el usuario existe y tiene la clase matriculada
    const user = await User.findOne({
      _id: userId,
      clasesMatriculadas: classId,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado o no está matriculado en esta clase",
      });
    }

    // Obtener la información completa de la clase
    const classData = await Class.findById(classId);

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Clase no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      data: classData,
    });
  } catch (error) {
    console.error("Error al obtener la clase:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener la clase",
      error: error.message,
    });
  }
};
