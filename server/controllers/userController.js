import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Signup
export const signup = async (req, res) => {
  const { documento, nombre, telefono, email, password, tipoUsuario } =
    req.body;
  try {
    // Validaciones
    if (!documento || !nombre || !telefono || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Validar documento (10 dígitos)
    if (!/^\d{10}$/.test(documento)) {
      return res
        .status(400)
        .json({ message: "El documento debe tener exactamente 10 dígitos" });
    }

    // Validar nombre (máximo 40 caracteres, sin caracteres especiales)
    if (nombre.length > 40 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
      return res.status(400).json({
        message:
          "El nombre debe tener máximo 40 caracteres y sin caracteres especiales",
      });
    }

    // Validar teléfono (10 dígitos)
    if (!/^\d{10}$/.test(telefono)) {
      return res
        .status(400)
        .json({ message: "El teléfono debe tener exactamente 10 dígitos" });
    }

    // Validar email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Correo electrónico inválido" });
    }

    // Validar contraseña (mínimo 8 caracteres)
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "La contraseña debe tener mínimo 8 caracteres" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      $or: [{ email }, { documento }, { telefono }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res
          .status(400)
          .json({ message: "El correo ya está registrado" });
      }
      if (existingUser.documento === documento) {
        return res
          .status(400)
          .json({ message: "El documento ya está registrado" });
      }
      if (existingUser.telefono === telefono) {
        return res
          .status(400)
          .json({ message: "El teléfono ya está registrado" });
      }
    }

    const newUser = new User({
      documento,
      nombre,
      telefono,
      email,
      password,
      tipoUsuario: tipoUsuario || "estudiante",
    });

    if ((tipoUsuario || "estudiante") === "estudiante") {
      newUser.clasesMatriculadas = [];
    }

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, tipoUsuario: newUser.tipoUsuario },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" },
    );

    res.status(201).json({
      message: "Registro exitoso",
      token,
      user: {
        id: newUser._id,
        documento: newUser.documento,
        nombre: newUser.nombre,
        email: newUser.email,
        tipoUsuario: newUser.tipoUsuario,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res
        .status(400)
        .json({ message: `El ${field} ya está registrado` });
    }
    res.status(500).json({ message: "Error en el registro: " + error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validaciones
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Correo y contraseña son requeridos" });
    }

    const user = await User.findOne({ email })
     .populate("clasesMatriculadas");
    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { id: user._id, tipoUsuario: user.tipoUsuario },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" },
    );

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id,
        documento: user.documento,
        nombre: user.nombre,
        email: user.email,
        tipoUsuario: user.tipoUsuario,
        clases: user.clasesMatriculadas,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el inicio de sesión: " + error.message });
  }
};

// Obtener perfil del usuario
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el perfil: " + error.message });
  }
};

// Obtener todos los usuarios (solo para administrador)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener usuarios: " + error.message });
  }
};

// Obtener docentes
export const getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ tipoUsuario: "docente" }).select(
      "-password",
    );
    res.json(teachers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener docentes: " + error.message });
  }
};

// Obtener perfil del usuario logueado

export const getPerfil = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "No autorizado" });
  }
};
