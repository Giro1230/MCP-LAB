import { Controller, Get, Post, Body } from '@nestjs/common';
import { McpService } from '../services/mcp.service';
import { MCPRequest, MCPResponse } from '../models/req-res/mcp.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('MCP 구현')
@Controller('mcp')
export class McpController {
    constructor(private readonly mcpService: McpService) {}

    @Post('ask')
    async getAsk(@Body() data: MCPRequest): Promise<MCPResponse> {
        const result : MCPResponse = await this.mcpService.generateText(data);

        return result;
    }


    @Get('health')
    getHealth() {
        return { status: 'ok' };
    }
}
