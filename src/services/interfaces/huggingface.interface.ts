export interface HuggingFaceResponse {
    generated_text?: string;
    error?: string;
}

export interface HuggingFaceError {
    error: string;
    warnings?: string[];
}

export type HuggingFaceResult = HuggingFaceResponse | HuggingFaceResponse[]; 