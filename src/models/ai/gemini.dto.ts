import dotenv from "dotenv";
import { BaseLLMConfig } from "./baseLLMConfig";

dotenv.config();

type GeminiResponse = {
    text?: string;
    error?: string;
};

class GeminiDto extends BaseLLMConfig {
    readonly url: string;
    readonly apiKey: string;

    constructor() {
        super();
        this.url = process.env.GEMINI_URL || "";
        this.apiKey = process.env.GEMINI_API_KEY || "";
    }

    async generateText(prompt: string): Promise<string> {
        try {
            const response = await fetch(`${this.url}?key=${this.apiKey}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                            text: prompt
                        }],
                    model: "gemini-2.0-flash-lite-001"
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Gemini 요청 실패: ${response.status} - ${errorText}`);
            }

            const data = await response.json() as GeminiResponse;

            return data.text || data.error || "Gemini 응답에서 텍스트를 찾을 수 없습니다.";
        } catch (error: any) {
            return `Gemini 에러: ${error.message || String(error)}`;
        }
    }
}

export { GeminiDto };
