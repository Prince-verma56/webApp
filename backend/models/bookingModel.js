import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "DoctorInfo", required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
  fee: { type: Number, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String
  },
  meetLink: String
}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);
