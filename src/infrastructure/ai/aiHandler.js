const { GoogleGenAI } = require("@google/genai");

async function generateRecipe(prompt) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 0
      }
    }
  });

  const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text || "";

  try {
    // Sometimes Gemini might wrap JSON in code block, so we extract it
    const jsonText = rawText.trim().replace(/^```json\n?/, '').replace(/```$/, '');
    const parsed = JSON.parse(jsonText);
    return parsed;
  } catch (error) {
    console.error("Failed to parse AI response:", rawText);
    throw new Error("Failed to parse recipe from AI.");
  }
}

module.exports = generateRecipe;
