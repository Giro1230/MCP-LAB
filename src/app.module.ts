import { Module } from '@nestjs/common';
import { McpController } from './controller/mcp.controller';
import { McpService } from './service/mcp.service';

@Module({
  imports: [],
  controllers: [McpController],
  providers: [McpService],
})
export class AppModule {} 