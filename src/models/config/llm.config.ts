import { LLMConfig } from './types';

export const LLM_CONFIG: Record<string, LLMConfig> = {
    huggingface: {
        url: process.env.HF_URL || '',
        apiKey: process.env.HF_TOKEN || '',
        model: 'Mistral-7B-Instruct-v0.1'
    },
    openai: {
        url: process.env.OPENAI_URL || '',
        apiKey: process.env.OPENAI_API_KEY || '',
        model: 'gpt-3.5-turbo'
    },
    gemini: {
        url: process.env.GEMINI_URL || '',
        apiKey: process.env.GEMINI_API_KEY || '',
        model: 'gemini-2.0-flash-lite-001'
    },
    cohere: {
        url: process.env.COHERE_URL || '',
        apiKey: process.env.COHERE_API_KEY || '',
        model: 'command'
    }
}; 