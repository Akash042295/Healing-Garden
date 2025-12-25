// routes/chat.js
import express from "express";
import { getAIResponse } from "../services/aiService.js";

const router = express.Router();
const sessions = {};

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const userId = req.ip;

    if (!sessions[userId]) {
      sessions[userId] = {
        stage: "initial",
        symptoms: []
      };
    }

    const session = sessions[userId];

    // if user says a NEW symptom anytime → reset flow
    const newSymptomKeywords = ["fever", "diarrhea", "headache", "vomiting", "cold"];
    const isNewSymptom = newSymptomKeywords.some(k =>
      userMessage.toLowerCase().includes(k)
    );

    if (isNewSymptom && session.stage !== "initial") {
      session.stage = "initial";
      session.symptoms = [];
    }

    let prompt = "";

    if (session.stage === "initial") {
      session.symptoms.push(userMessage);

      prompt = `
You are a medical assistant chatbot.

User just mentioned symptoms: ${session.symptoms.join(", ")}

Task:
- Ask 2–3 follow-up questions ONLY.
- Do NOT give advice.
- Do NOT suggest medicines.
- Be calm and caring.

Ask questions now.
`;
      session.stage = "followup";
    }

    else if (session.stage === "followup") {
      session.symptoms.push(userMessage);

      prompt = `
You are a medical assistant chatbot.

Collected information:
${session.symptoms.join(" | ")}

Task:
- Give final suggestions.
- Include home care tips.
- Mention warning signs.
- Do NOT diagnose.

Respond now.
`;
      session.stage = "done";
    }

    else {
      delete sessions[userId];
      return res.json({
        reply: "If you have more symptoms or questions, feel free to tell me 💛"
      });
    }

    const reply = await getAIResponse(prompt);
    res.json({ reply });

  } catch (error) {
    console.error("Chatbot error:", error.message);
    res.status(500).json({ reply: "Sorry, something went wrong with the AI. Please try again." });
  }
});

export default router;
