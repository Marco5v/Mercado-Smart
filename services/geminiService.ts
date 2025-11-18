import { GoogleGenAI } from "@google/genai";

interface ProductAIResponse {
    nome_produto: string;
    marca: string;
    peso_volume: string;
    categoria_sugerida: string;
}

// It's crucial to handle the case where the API returns the JSON string
// wrapped in markdown backticks.
const parseJsonResponse = (rawText: string): ProductAIResponse | null => {
    const trimmedText = rawText.trim();
    const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
    const match = trimmedText.match(jsonRegex);
    
    const jsonString = match ? match[1] : trimmedText;

    try {
        return JSON.parse(jsonString) as ProductAIResponse;
    } catch (error) {
        console.error("Failed to parse JSON from Gemini response:", error);
        console.error("Raw response was:", rawText);
        return null;
    }
};

export const identifyProductFromImage = async (base64ImageData: string): Promise<ProductAIResponse | null> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const prompt = `Analise a imagem deste produto de supermercado. Retorne APENAS um JSON com: { "nome_produto": string, "marca": string, "peso_volume": string (ex: 500g, 1L), "categoria_sugerida": string }.`;
        
        const imagePart = {
            inlineData: {
                mimeType: 'image/jpeg',
                data: base64ImageData,
            },
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, { text: prompt }] },
        });
        
        const text = response.text;
        if (!text) {
            throw new Error("No text returned from Gemini API.");
        }
        
        return parseJsonResponse(text);
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return null;
    }
};
