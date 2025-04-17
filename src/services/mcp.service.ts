import { Injectable } from '@nestjs/common';
import { MCPRequest, MCPResponse } from '../models/req-res/mcp.dto';
import { HuggingFaceDto } from '../models/ai/huggingFace.ai';
import { OpenAiDto } from '../models/ai/openAi.ai';
import { GeminiDto } from '../models/ai/gemini.ai';
import { CohereDto } from '../models/ai/cohere.ai';
import { LLMResponse } from '../models/dto/llm.response';

@Injectable()
export class McpService {
    private readonly providers: Record<string, any> = {
        huggingface: new HuggingFaceDto(),
        openai: new OpenAiDto(),
        gemini: new GeminiDto(),
        cohere: new CohereDto()
    };

    async generateText(request: MCPRequest): Promise<MCPResponse> {
        const startTime = Date.now();
        const selectedProviders = request.providers || Object.keys(this.providers);
        const responses: LLMResponse[] = [];

        // 병렬로 모든 제공자에게 요청
        const promises = selectedProviders.map(async (provider) => {
            if (!this.providers[provider]) {
                throw new Error(`Unknown provider: ${provider}`);
            }

            const providerStartTime = Date.now();
            try {
                const text = await this.providers[provider].generateText(request.prompt);
                const latency = Date.now() - providerStartTime;

                return {
                    provider,
                    text,
                    timestamp: Date.now(),
                    model: this.getModelName(provider),
                    latency
                };
            } catch (error : any) {
                return {
                    provider,
                    text: `Error from ${provider}: ${error.message}`,
                    timestamp: Date.now(),
                    model: this.getModelName(provider),
                    latency: Date.now() - providerStartTime
                };
            }
        });

        const results = await Promise.all(promises);
        responses.push(...results);

        // 응답 요약 생성
        const summary = this.generateSummary(responses);

        return {
            prompt: request.prompt,
            responses,
            summary,
            metadata: {
                totalTokens: this.calculateTotalTokens(responses),
                averageLatency: this.calculateAverageLatency(responses),
                timestamp: Date.now()
            }
        };
    }

    private getModelName(provider: string): string {
        const models: Record<string, string> = {
            huggingface: 'Mistral-7B-Instruct-v0.1',
            openai: 'gpt-3.5-turbo',
            gemini: 'gemini-2.0-flash-lite-001',
            cohere: 'command'
        };
        return models[provider] || 'unknown';
    }

    private generateSummary(responses: LLMResponse[]): string {
        const successfulResponses = responses.filter(r => !r.text.includes('Error'));
        if (successfulResponses.length === 0) return 'No successful responses';

        // 간단한 요약 생성 (실제로는 더 복잡한 로직이 필요할 수 있음)
        return `Generated ${successfulResponses.length} responses from different providers.`;
    }

    private calculateTotalTokens(responses: LLMResponse[]): number {
        // 실제 토큰 계산 로직 구현 필요
        return responses.reduce((sum, r) => sum + (r.tokens || 0), 0);
    }

    private calculateAverageLatency(responses: LLMResponse[]): number {
        const latencies = responses.map(r => r.latency || 0);
        return latencies.reduce((sum, latency) => sum + latency, 0) / latencies.length;
    }

    getHealth(): { status: string } {
        return { status: 'ok' };
    }
} 