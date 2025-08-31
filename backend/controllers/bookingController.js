import { Booking } from "../models/bookingModel.js";
import { Slot } from "../models/slotModel.js";
import { DoctorInfo } from "../models/doctorinfoModel.js";

// Book a slot
export const bookSlot = async (req, res) => {
  try {
    const { slotId } = req.body;

    const slot = await Slot.findById(slotId);
    if (!slot || slot.isBooked) return res.status(400).json({ message: "Slot not available" });

    const doctor = await DoctorInfo.findById(slot.doctorId);

    slot.isBooked = true;
    await slot.save();

    const booking = new Booking({
      userId: req.user._id,
      doctorId: doctor._id,
      slotId: slot._id,
      fee: doctor.feePerHour,
      status: "confirmed"
    });
    await booking.save();

    res.status(201).json({
      message: "Booking confirmed",
      booking: {
        ...booking.toObject(),
        doctorName: doctor.name,
        speciality: doctor.speciality
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("doctorId", "name speciality")
      .populate("slotId", "date startTime endTime");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
