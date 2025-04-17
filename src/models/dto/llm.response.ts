export interface LLMResponse {
    provider: string;      // LLM 제공자 이름
    text: string;         // 생성된 텍스트
    timestamp: number;    // 응답 시간
    model: string;        // 사용된 모델 이름
    tokens?: number;      // 사용된 토큰 수 (선택적)
    latency?: number;     // 응답 지연시간 (선택적)
}