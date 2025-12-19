
import { GoogleGenAI } from "@google/genai";

export interface SearchResult {
  text: string;
  sources: Array<{ uri: string; title: string }>;
}

export const performWishSearch = async (query: string): Promise<SearchResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `NCT WISH(엔시티 위시) 멤버 또는 활동에 관한 다음 질문에 답해줘: ${query}`,
      config: {
        systemInstruction: "너는 NCT WISH의 공식 열혈 팬이자 도우미야. 밝고 귀여운 말투(반말/존댓말 섞어서 사용 가능)로 정보를 알려줘. 항상 최신 정보를 바탕으로 답변해.",
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "미안해, 정보를 찾지 못했어. 다시 한번 물어봐 줄래? 💚";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      uri: chunk.web?.uri || "",
      title: chunk.web?.title || "출처",
    })).filter((s: any) => s.uri !== "") || [];

    return { text, sources };
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return {
      text: "앗! 검색 중에 작은 문제가 생겼어. 잠시 후에 다시 시도해줘! 💚",
      sources: [],
    };
  }
};
