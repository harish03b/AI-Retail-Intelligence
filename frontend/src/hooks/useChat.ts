import { useCallback, useState } from "react";

import chatService from "../services/chatService";

import type {
  ChatMessage,
} from "../types/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(
    async (question: string) => {
      const text = question.trim();

      if (!text || loading) {
        return;
      }

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
      };

      setMessages((previous) => [
        ...previous,
        userMessage,
      ]);

      setLoading(true);

      try {
        const response =
          await chatService.askQuestion(text);

        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.answer,
          sources: response.sources,
        };

        setMessages((previous) => [
          ...previous,
          assistantMessage,
        ]);
      } catch (error) {
        console.error(error);

        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Unable to contact the AI service. Please try again.",
        };

        setMessages((previous) => [
          ...previous,
          assistantMessage,
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    loading,
    sendMessage,
    clearMessages,
  };
}