import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class McpService {
  private readonly modelUrl = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1';
  private readonly token: string;

  constructor() {
    const token = process.env.HF_TOKEN;
    if (!token) {
      throw new Error('HF_TOKEN environment variable is not set');
    }
    this.token = token;
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const response = await fetch(this.modelUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: prompt })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`HuggingFace API Error: ${error.error}`);
      }

      const result = await response.json();
      
      if (Array.isArray(result)) {
        return result
          .map(r => r.generated_text)
          .filter(Boolean)
          .join('\n');
      }

      if (result.error) {
        throw new Error(result.error);
      }

      return result.generated_text || JSON.stringify(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate text: ${error.message}`);
      }
      throw new Error('Failed to generate text: Unknown error occurred');
    }
  }
} 