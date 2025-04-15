interface MCPRequest {
    prompt: string;
    model: string[];
}

interface MCPResponse {
    prompt: string;
    result: Record<string, string>;
}

export { MCPRequest, MCPResponse };
