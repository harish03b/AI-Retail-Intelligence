import type { ChatMessage } from "../types/chat";

const CHAT_STORAGE_KEY = "ai-retail-chat-history";

export const saveChatHistory = (messages: ChatMessage[]) => {
  localStorage.setItem(
    CHAT_STORAGE_KEY,
    JSON.stringify(messages)
  );
};

export const loadChatHistory = (): ChatMessage[] => {
  const stored = localStorage.getItem(CHAT_STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const clearChatHistory = () => {
  localStorage.removeItem(CHAT_STORAGE_KEY);
};