import mongoose from "mongoose";

const doctorInfoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // doctor account
  name: { type: String, required: true },
  contact: { type: String, required: true },
  license: { type: String, required: true },
  speciality: { type: String, enum: ["psychiatrist", "psychologist"], required: true },
  experience: { type: Number, required: true },
  clinicAddress: { type: String, required: true },
  feePerHour: { type: Number, required: true } // moved here to avoid duplication in slots
}, { timestamps: true });

export const DoctorInfo = mongoose.model("DoctorInfo", doctorInfoSchema);
