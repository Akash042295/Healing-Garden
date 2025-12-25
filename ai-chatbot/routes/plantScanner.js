// ai-chatbot/routes/plantScanner.js

import { Router } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/scan-plant', async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ 
        success: false, 
        message: 'No image provided' 
      });
    }

    // Remove data:image/jpeg;base64, prefix if present
    const base64Data = imageBase64.replace(/^data:image\/[^;]+;base64,/, '');

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert botanist and plant identification AI. Analyze this plant image and provide detailed information in valid JSON format.

Please respond ONLY with a valid JSON object (no other text) in this exact format:
{
  "plantName": "Common name of the plant",
  "scientificName": "Scientific name if identifiable",
  "description": "2-3 sentence description of the plant and its characteristics",
  "benefits": ["Health benefit 1", "Health benefit 2", "Health benefit 3"],
  "careInstructions": "2-3 sentences about basic care",
  "wateringNeeds": "How often to water (e.g., 'Every 3-4 days')",
  "sunlight": "Sunlight requirements (e.g., 'Bright indirect light')",
  "toxicity": "Safe/Toxic status (e.g., 'Non-toxic to pets and humans' or 'Toxic - keep away from children and pets')"
}

If you cannot identify the plant with reasonable confidence, respond with:
{"error": "Unable to identify plant - image too unclear or plant not recognizable"}`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: 'image/jpeg'
        }
      },
      prompt
    ]);

    const response = await result.response;
    const text = response.text().trim();

    // Parse JSON from response
    let jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      return res.status(400).json({
        success: false,
        message: 'Could not identify plant. Please try a clearer image.'
      });
    }

    let plantData;
    try {
      plantData = JSON.parse(jsonMatch[0]);
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: 'Invalid response from AI. Please try again.'
      });
    }

    if (plantData.error) {
      return res.status(400).json({
        success: false,
        message: plantData.error
      });
    }

    return res.json({
      success: true,
      plantName: plantData.plantName || 'Unknown',
      scientificName: plantData.scientificName || 'N/A',
      description: plantData.description || 'No description available',
      benefits: Array.isArray(plantData.benefits) ? plantData.benefits : [],
      careInstructions: plantData.careInstructions || 'Provide regular care and maintenance',
      wateringNeeds: plantData.wateringNeeds || 'Water regularly',
      sunlight: plantData.sunlight || 'Bright light required',
      toxicity: plantData.toxicity || 'Toxicity unknown'
    });

  } catch (error) {
    console.error('Plant scanner error:', error);
    res.status(500).json({
      success: false,
      message: 'Error scanning plant. Please try again.'
    });
  }
});

export default router;