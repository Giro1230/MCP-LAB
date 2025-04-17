import { BaseLLMConfig } from "./baseLLMConfig";
import { LLM_CONFIG } from "../config/llm.config";

type CohereChatResponse = {
    text?: string;
    generation?: { text: string };
    response_id?: string;
    message?: string;
};

class CohereDto extends BaseLLMConfig {
    readonly url: string;
    readonly apiKey: string;

    constructor() {
        super();
        const config = LLM_CONFIG.cohere;
        this.url = config.url;
        this.apiKey = config.apiKey;
    }

    async generateText(prompt: string): Promise<string> {
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    message: prompt
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Cohere 요청 실패: ${response.status} - ${errorText}`);
            }

            const data = await response.json() as CohereChatResponse;

            return data.text || data.message || "Cohere 응답에서 텍스트를 찾을 수 없습니다.";
        } catch (error: any) {
            return `Cohere 에러: ${error.message || String(error)}`;
        }
    }
}

export { CohereDto };
