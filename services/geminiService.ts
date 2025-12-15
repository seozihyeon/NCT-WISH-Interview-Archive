
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export interface SearchResult {
  text: string;
  sources: { title: string; uri: string }[];
}

export const performWishSearch = async (query: string): Promise<SearchResult> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Search for information about NCT WISH regarding: ${query}. Provide a friendly, fan-focused response in Korean.`,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "You are a helpful and enthusiastic assistant for NCT WISH fans. Always prioritize accurate and recent information about the group members: Sion, Riku, Yushi, Jaehee, Ryo, and Sakuya."
      },
    });

    const text = response.text || "검색 결과를 가져오지 못했습니다. 다시 시도해주세요!";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || "Source",
        uri: chunk.web?.uri || "#"
      }))
      .filter((s: any) => s.uri !== "#") || [];

    return { text, sources };
  } catch (error) {
    console.error("Search failed:", error);
    return {
      text: "죄송합니다. 검색 중 오류가 발생했습니다. (API Key가 올바른지 확인해주세요!)",
      sources: []
    };
  }
};
