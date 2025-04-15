import { Controller, Get, Post, Body } from '@nestjs/common';
import { McpService } from '../service/mcp.service';
import { MCPRequest, MCPResponse } from '../models/mcp.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('MCP 구현')
@Controller('mcp')
export class McpController {
    constructor(private readonly mcpService: McpService) {}

    @Post('ask')
    async handleAsk(@Body() data: MCPRequest): Promise<MCPResponse> {
        const result : Record<string, string> = await this.mcpService.generateText(data);

        return {
            prompt: data.prompt,
            result
        };
    }


    @Get('health')
    getHealth() {
        return { status: 'ok' };
    }
}
