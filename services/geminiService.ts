import { GoogleGenAI, Type } from "@google/genai";

// Standard model names for selection
export const AVAILABLE_MODELS = [
  { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash (Fast)' },
  { id: 'gemini-3-pro-preview', name: 'Gemini 3 Pro (Analytical)' }
];

export const geminiService = {
  async getHRInsights(employeeCount: number, leaveCount: number) {
    if (!process.env.API_KEY) {
      console.warn("AI Insights: API_KEY is missing. Skipping AI generation.");
      return null;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze these HR metrics for Lumina, a GDPR-compliant HR platform: Total Employees: ${employeeCount}, Pending Leave Requests: ${leaveCount}. Provide a summary actionable insight for management.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              trend: { 
                type: Type.STRING,
                description: 'The current HR trend observed from the data.'
              },
              recommendation: { 
                type: Type.STRING,
                description: 'A concrete recommendation for management.'
              },
              impact: { 
                type: Type.STRING,
                description: 'The expected impact of implementing the recommendation.'
              },
            },
            required: ["trend", "recommendation", "impact"],
          },
        },
      });
      return response.text;
    } catch (error) {
      console.error("AI Insights Error:", error);
      return null;
    }
  },

  async checkCompliance(query: string) {
    if (!process.env.API_KEY) {
      return "The AI Compliance assistant is unavailable because the API key is not configured.";
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `As a GDPR Compliance Assistant for Lumina HR, answer this HR compliance query: "${query}". Ensure the answer references specific articles of the GDPR or standard labor laws. Keep it concise.`,
      });
      return response.text;
    } catch (error) {
      console.error("Compliance Check Error:", error);
      return "Unable to process compliance query at this time. Please ensure your API connection is active.";
    }
  }
};