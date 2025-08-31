import { GoogleGenerativeAI } from "@google/generative-ai";
import EmotionAnalysis from "../models/emotionModel.js";

let apiKeys = process.env.GOOGLE_API_KEYS
  ? process.env.GOOGLE_API_KEYS.split(",")
  : [];
let currentKeyIndex = 0;

function getNextApiKey() {
  const key = apiKeys[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
  return key;
}

function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  };
}

export const analyzeEmotion = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file uploaded." });
  }

  try {
    const userId = req.user?.id;  
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User ID not found in token." });
    }

    const apiKey = getNextApiKey();
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt =
      "Analyze the facial expression of the person in this image and identify their emotion. Your answer must be one of the following: Anger, Disgust, Fear, Happiness, Sadness, Surprise, or Neutral. Provide only the emotion as a single word, with no other text, explanation, or details.";

    const imagePart = fileToGenerativePart(req.file.buffer, req.file.mimetype);

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;

    const emotion = response.text().trim();

    const newAnalysis = new EmotionAnalysis({
      userId,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      emotion,
    });

    await newAnalysis.save();

    res.json({
      message: "Emotion analyzed and saved successfully",
      data: {
        userId,
        emotion,
        imageId: newAnalysis._id,
      },
    });
  } catch (error) {
    console.error("Error analyzing image:", error.message);
    res.status(500).json({ error: "Failed to analyze the image." });
  }
};
