import { GoogleGenAI } from "@google/genai";
import { Platform, Tone } from "../types";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

const SYSTEM_PROMPT = `You are Social Flow AI, a premium AI content generator specializing in viral, high-engagement social media content.
Your goal is to create content that feels authentic, impactful, and optimized for the specific platform.

Guidelines:
- If the platform is TikTok, provide scripts with visual cues.
- If the platform is Instagram, focus on catchy hooks and structured captions with aesthetic emojis.
- If the platform is Twitter (X), focus on threads or punchy, short-form viral posts.
- If the platform is LinkedIn, maintain a professional yet engaging tone with actionable insights.
- If the platform is Facebook, focus on community engagement, storytelling, and clear call-to-actions.
- If the platform is WhatsApp, focus on punchy, personal status updates or broadcast-style messages with emojis.
- Always include relevant hashtags if appropriate.
- Adapt your voice based on the selected tone.
- Be concise but impactful.

Return only the generated content without any meta-talk.`;

export async function generateSocialContent(prompt: string, platform: Platform, tone: Tone) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: `Generate content for ${platform} with a ${tone} tone based on this prompt: "${prompt}"` }]
        }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.8,
        topP: 0.95,
      }
    });

    return response.text || "I couldn't generate any content. Please try again.";
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate content. Please check your API key and connection.");
  }
}
