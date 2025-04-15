# LLM MCP Lab

NestJS 기반의 LLM (Large Language Model) MCP (Multi-Cloud Platform) 구현 프로젝트입니다.

## 기능

- HuggingFace API를 통한 텍스트 생성
- NestJS 프레임워크 기반의 RESTful API
- Swagger UI를 통한 API 문서화

## 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run start:dev
```

## 환경 변수 설정

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
HF_TOKEN=your_huggingface_token
```

## API 엔드포인트

- `POST /mcp/ask`: 텍스트 생성 요청
- `GET /mcp/health`: 서비스 상태 확인

## 기술 스택

- NestJS
- TypeScript
- Swagger
- HuggingFace API 