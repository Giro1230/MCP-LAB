abstract class BaseLLMConfig {
    abstract readonly url: string;
    abstract readonly apiKey: string;

    validate() {
        if (!this.url || !this.apiKey) {
            throw new Error(`${this.constructor.name} 설정이 잘못되었습니다.`);
        }
    }

    abstract generateText(prompt: string): Promise<string>;
}

export { BaseLLMConfig };