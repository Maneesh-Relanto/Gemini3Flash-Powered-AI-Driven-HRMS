
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  async getHRInsights(employeeCount: number, leaveCount: number) {
    const ai = getAI();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze these HR metrics: Total Employees: ${employeeCount}, Pending Leave Requests: ${leaveCount}. Provide 3 actionable insights for management in JSON format with keys: trend, recommendation, impact.`,
      });
      return response.text;
    } catch (error) {
      console.error("AI Insights Error:", error);
      return null;
    }
  },

  async checkCompliance(query: string) {
    const ai = getAI();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `As a GDPR Compliance Assistant, answer this HR compliance query: "${query}". Ensure the answer references specific articles of the GDPR or standard labor laws. Keep it concise.`,
      });
      return response.text;
    } catch (error) {
      console.error("Compliance Check Error:", error);
      return "Unable to process compliance query at this time.";
    }
  }
};
