import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // 1. Obtener header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No hay token",
      });
    }

    // 2. Formato: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token inválido",
      });
    }

    // 3. Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Guardar usuario en request
    req.user = decoded;

    next(); // 👉 continúa al controlador
  } catch (error) {
    console.error("Error en authMiddleware:", error);

    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }
};