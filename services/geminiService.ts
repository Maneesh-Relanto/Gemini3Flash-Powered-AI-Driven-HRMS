
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the GoogleGenAI client exclusively using the process.env.API_KEY environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async getHRInsights(employeeCount: number, leaveCount: number) {
    try {
      // Use ai.models.generateContent with a prompt and a response schema for structured JSON output.
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
    try {
      // Use gemini-3-pro-preview for complex reasoning and legal compliance queries.
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `As a GDPR Compliance Assistant for Lumina HR, answer this HR compliance query: "${query}". Ensure the answer references specific articles of the GDPR or standard labor laws. Keep it concise.`,
      });
      return response.text;
    } catch (error) {
      console.error("Compliance Check Error:", error);
      return "Unable to process compliance query at this time.";
    }
  }
};
