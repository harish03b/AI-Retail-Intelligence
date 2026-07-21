export interface ChatRequest {
  question: string;
  session_id: string;
}

export interface ChatResponse {
  answer: string;
  sources: string[];
}

export type MessageRole =
  | "user"
  | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  sources?: string[];
}