import { detectSymptom, getSymptomResponse } from "./symptomService.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getAIResponse(userMessage) {
  console.log("Preparing Gemini response for:", userMessage);

  // 1️⃣ Detect symptom from JSON first (your logic stays same)
  const foundSymptom = detectSymptom(userMessage);

  if (foundSymptom) {
    const info = getSymptomResponse(foundSymptom);

    const mild = info.mild;
    const question =
      mild.questions[Math.floor(Math.random() * mild.questions.length)];

    return `
It seems like you're having *${foundSymptom}*.
${question}

For now, try these:
- ${mild.remedies.join("\n- ")}

If it gets worse, or matches any severe symptoms, please visit a doctor.
`;
  }

  // 2️⃣ Fallback to Gemini AI if no symptom found
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
You are a simple medical assistant chatbot.
Rules:
- Ask ONLY ONE follow-up question
- Suggest 2–3 simple home remedies
- Clearly say if doctor consultation is needed
- Do NOT diagnose

User message: "${userMessage}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text().trim();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, something went wrong with the AI. Please try again.";
  }
}
