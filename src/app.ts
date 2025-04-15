import express from "express";
import dotenv from "dotenv";
import { askMCP } from "./controllers/mcp.controller";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/mcp/ask", askMCP);

export default app;
