import type {
  ChatConversation,
  ChatMessage,
} from "../types/chat";

const STORAGE_KEY = "ai-retail-chat-history";

export function loadConversations(): ChatConversation[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveConversations(
  conversations: ChatConversation[]
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(conversations)
  );
}

export function createConversation(): ChatConversation {
  return {
    id: crypto.randomUUID(),
    title: "New Chat",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: [],
  };
}

export function updateConversation(
  conversation: ChatConversation
) {
  const conversations = loadConversations();

  const index = conversations.findIndex(
    (item) => item.id === conversation.id
  );

  if (index >= 0) {
    conversations[index] = conversation;
  } else {
    conversations.unshift(conversation);
  }

  saveConversations(conversations);
}

export function deleteConversation(
  id: string
) {
  const conversations = loadConversations().filter(
    (item) => item.id !== id
  );

  saveConversations(conversations);
}

export function clearAllConversations() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getConversation(
  id: string
): ChatConversation | undefined {
  return loadConversations().find(
    (item) => item.id === id
  );
}

export function generateConversationTitle(
  messages: ChatMessage[]
): string {
  const firstUserMessage = messages.find(
    (item) => item.role === "user"
  );

  if (!firstUserMessage) {
    return "New Chat";
  }

  const title = firstUserMessage.content.trim();

  if (title.length <= 40) {
    return title;
  }

  return `${title.substring(0, 40)}...`;
}