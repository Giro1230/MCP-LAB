import { Module } from '@nestjs/common';
import { McpController } from './controller/mcp.controller';
import { McpService } from './services/mcp.service';

@Module({
  imports: [],
  controllers: [McpController],
  providers: [McpService],
})

export class AppModule {} 