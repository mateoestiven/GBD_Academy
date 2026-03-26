import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    documento: {
      type: String,
      required: true,
      unique: true,
      length: 10,
      match: /^\d{10}$/, // Solo números, longitud 10
      trim: true,
    },
    nombre: {
      type: String,
      required: true,
      maxlength: 40,
      trim: true,
      match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Sin caracteres especiales
    },
    telefono: {
      type: String,
      required: true,
      unique: true,
      length: 10,
      match: /^\d{10}$/, // Solo números, longitud 10
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validación email
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Mínimo 8 caracteres según requisitos
    },
    tipoUsuario: {
      type: String,
      enum: ["estudiante", "profesor"],
      required: true,
    },
    clasesMatriculadas: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Class",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
