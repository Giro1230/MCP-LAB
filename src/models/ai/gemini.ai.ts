import dotenv from "dotenv";
import { BaseLLMConfig } from "./baseLLMConfig";
import { LLM_CONFIG } from "../config/llm.config";

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
        const config = LLM_CONFIG.gemini;
        this.url = config.url;
        this.apiKey = config.apiKey;
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
                    model: LLM_CONFIG.gemini.model
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
