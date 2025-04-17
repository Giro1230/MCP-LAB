import dotenv from "dotenv";
import { BaseLLMConfig } from "./baseLLMConfig";
import { LLM_CONFIG } from "../config/llm.config";

dotenv.config();

type OpenAIResponse = {
    choices: { message: { content: string } }[];
};

class OpenAiDto extends BaseLLMConfig {
    readonly url: string;
    readonly apiKey: string;

    constructor() {
        super();
        const config = LLM_CONFIG.openai;
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
                    model: LLM_CONFIG.openai.model,
                    messages: [{ role: "user", content: prompt }]
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`OpenAI 요청 실패: ${response.status} - ${errorText}`);
            }

            const data = await response.json() as OpenAIResponse;
            const content = data?.choices?.[0]?.message?.content;

            return content ?? "응답에서 content를 찾을 수 없습니다.";
        } catch (error: any) {
            return `OpenAI 에러: ${error.message || String(error)}`;
        }
    }
}

export { OpenAiDto };
