export interface IMcpService {
    generateText(prompt: string): Promise<string>;
    getHealth(): { status: string };
} 