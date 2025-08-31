import  { DoctorInfo }  from "../models/doctorinfoModel.js";
import { Slot } from "../models/slotModel.js";

// Add or update doctor info
export const addOrUpdateDoctorInfo = async (req, res) => {
  try {
    const { name, contact, license, speciality, experience, clinicAddress, feePerHour } = req.body;
    let doctor = await DoctorInfo.findOne({ userId: req.user._id });

    if (doctor) {
      Object.assign(doctor, { name, contact, license, speciality, experience, clinicAddress, feePerHour });
      await doctor.save();
      return res.json({ message: "Doctor info updated", doctor });
    }

    doctor = new DoctorInfo({ userId: req.user._id, name, contact, license, speciality, experience, clinicAddress, feePerHour });
    await doctor.save();
    res.status(201).json({ message: "Doctor info added", doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all doctors (for users)
export const listDoctors = async (req, res) => {
  try {
    const doctors = await DoctorInfo.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
