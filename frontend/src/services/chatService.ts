import api from "../api/axios";
import type {
  ChatRequest,
  ChatResponse,
} from "../types/chat";
import { getSessionId } from "../utils/session";

class ChatService {
  async askQuestion(
    question: string
  ): Promise<ChatResponse> {
    const payload: ChatRequest = {
      question,
      session_id: getSessionId(),
    };

    const response = await api.post<ChatResponse>(
      "/chat",
      payload
    );

    return response.data;
  }
}

export default new ChatService();