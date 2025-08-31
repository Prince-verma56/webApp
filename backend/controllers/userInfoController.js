import UserForm from "../models/userInfoModel.js";

export const submitUserForm = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { age, gender, occupation, sleep_cycle, relationship_status } = req.body;

    if (!age || !gender || !occupation || !sleep_cycle || !relationship_status) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let form = await UserForm.findOne({ user: userId });

    if (form) {
      form.age = age;
      form.gender = gender;
      form.occupation = occupation;
      form.sleep_cycle = sleep_cycle;
      form.relationship_status = relationship_status;

      await form.save();
      return res.status(200).json({ message: "Form updated successfully", form });
    } else {
      form = new UserForm({
        user: userId,
        age,
        gender,
        occupation,
        sleep_cycle,
        relationship_status,
      });
      await form.save();
      return res.status(201).json({ message: "Form submitted successfully", form });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getUserForm = async (req, res) => {
  try {
    const userId = req.user.id;

    const form = await UserForm.findOne({ user: userId });
    if (!form) {
      return res.status(404).json({ message: "Form not found for this user" });
    }

    return res.status(200).json({ form });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
