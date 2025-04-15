import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const HF_TOKEN = process.env.HF_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1"

const asFace = async (model_url: string, prompt: string) : Promise<string> => {
    const response = await fetch(model_url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${HF_TOKEN}`
        },
        body: JSON.stringify({
            inputs: prompt
        })
    })


    const result = await response.json();

    if (result.error) {
        throw new Error(result.error);
    }

    // huggingface는 결과가 배열로 올 수도 있음
    if (Array.isArray(result)) {
        return result.map((r) => r.generated_text).join("\n");
    }

    return result.generated_text || JSON.stringify(result);
}

export { asFace };
