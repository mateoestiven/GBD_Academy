import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  colorIdx: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  professor: { type: String, required: true },
  credits: { type: Number, required: true },
  schedule: [
    {
      day: String,
      time: String,
      room: String,
    },
  ],
  period: {
    type: String,
    enum: ["morning", "afternoon", "evening"],
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Class", classSchema);