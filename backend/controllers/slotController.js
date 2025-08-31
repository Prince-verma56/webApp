import { DoctorInfo } from "../models/doctorinfoModel.js";
import { Slot } from "../models/slotModel.js";

// Add slots (doctor)
export const addSlots = async (req, res) => {
  try {
    const { slots } = req.body; // array of { date, startTime, endTime }
    if (!slots || !Array.isArray(slots)) return res.status(400).json({ message: "Slots required" });

    const doctor = await DoctorInfo.findOne({ userId: req.user._id });
    if (!doctor) return res.status(404).json({ message: "Doctor info not found" });

    const createdSlots = await Slot.insertMany(slots.map(s => ({ ...s, doctorId: doctor._id })));
    res.status(201).json({ message: "Slots added", slots: createdSlots });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List slots by doctor
export const getSlotsByDoctor = async (req, res) => {
  try {
    const slots = await Slot.find({ doctorId: req.params.doctorId, isBooked: false });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
