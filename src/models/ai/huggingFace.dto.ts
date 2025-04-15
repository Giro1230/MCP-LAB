import dotenv from "dotenv";
import { BaseLLMConfig } from "./baseLLMConfig";

dotenv.config();

type HuggingFaceResponse = 
  | { generated_text: string }[]
  | { error: string };

class HuggingFaceDto extends BaseLLMConfig {
    readonly url: string;
    readonly apiKey: string;

    constructor() {
        super();
        this.url = process.env.HF_URL || "";
        this.apiKey = process.env.HF_API_KEY || "";
    }

    async generateText(prompt: string): Promise<string> {
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({ inputs: prompt })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HF 요청 실패: ${response.status} - ${errorText}`);
            }

            const data = await response.json() as HuggingFaceResponse;

            // 에러 형태 확인
            if (!Array.isArray(data)) {
                throw new Error(`HF 응답 에러: ${data.error}`);
            }

            return data.map(d => d.generated_text).join("\n");
        } catch (error: any) {
            return `HuggingFace 에러: ${error.message || String(error)}`;
        }
    }
}

export { HuggingFaceDto };
