import dotenv from "dotenv";
import { BaseLLMConfig } from "./baseLLMConfig";

dotenv.config();

type OpenAIResponse = {
    choices: { message: { content: string } }[];
};

class OpenAiDto extends BaseLLMConfig {
    readonly url: string;
    readonly apiKey: string;

    constructor() {
        super();
        this.url = process.env.OPENAI_URL || "";
        this.apiKey = process.env.OPENAI_API_KEY || "";
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
                    model: "gpt-3.5-turbo",
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
