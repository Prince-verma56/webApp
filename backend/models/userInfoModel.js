import mongoose from "mongoose";

const userFormSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },
    gender: {
      type: String,
      enum: ["male", "female", "non-binary", "prefer-not-to-say"],
      required: true,
    },
    occupation: {
      type: String,
      enum: ["student", "professional", "homemaker", "retired", "other"],
      required: true,
    },
    sleep_cycle: {
      type: String,
      enum: ["<6", "6-8", ">8"],
      required: true,
    },
    relationship_status: {
      type: String,
      enum: ["single", "in-a-relationship", "married", "divorced"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserForm", userFormSchema);
