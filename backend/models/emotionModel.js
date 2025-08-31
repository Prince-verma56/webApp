import mongoose from "mongoose";

const { Schema } = mongoose;

const emotionAnalysisSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    image: {
      data: Buffer,          // store image binary
      contentType: String,   // store MIME type (e.g. image/jpeg)
    },
    emotion: {
      type: String,
      enum: ["Anger", "Disgust", "Fear", "Happiness", "Sadness", "Surprise", "Neutral"],
      required: true,
    },
  },
  { timestamps: true }
);

const EmotionAnalysis = mongoose.model("EmotionAnalysis", emotionAnalysisSchema);

export default EmotionAnalysis;
