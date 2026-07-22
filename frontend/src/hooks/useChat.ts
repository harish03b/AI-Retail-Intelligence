import {
  useCallback,
  useEffect,
  useState,
} from "react";

import chatService from "../services/chatService";

import type {
  ChatConversation,
  ChatMessage,
} from "../types/chat";

import {
  loadConversations,
  updateConversation,
  createConversation,
  clearAllConversations,
  deleteConversation,
  generateConversationTitle,
} from "../utils/chatHistory";

export function useChat() {
  const [conversations, setConversations] =
    useState<ChatConversation[]>([]);

  const [
    activeConversationId,
    setActiveConversationId,
  ] = useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const savedConversations =
      loadConversations();

    if (savedConversations.length > 0) {
      setConversations(savedConversations);
      setActiveConversationId(
        savedConversations[0].id
      );
    } else {
      const conversation =
        createConversation();

      updateConversation(conversation);

      setConversations([conversation]);
      setActiveConversationId(
        conversation.id
      );
    }
  }, []);

  const activeConversation =
    conversations.find(
      (conversation) =>
        conversation.id ===
        activeConversationId
    );

  const messages =
    activeConversation?.messages ?? [];

  const saveConversation =
    useCallback(
      (
        updatedConversation: ChatConversation
      ) => {
        updateConversation(
          updatedConversation
        );

        setConversations(
          (previous) =>
            previous.map(
              (conversation) =>
                conversation.id ===
                updatedConversation.id
                  ? updatedConversation
                  : conversation
            )
        );
      },
      []
    );

  const newChat =
    useCallback(() => {
      const conversation =
        createConversation();

      updateConversation(conversation);

      setConversations(
        (previous) => [
          conversation,
          ...previous,
        ]
      );

      setActiveConversationId(
        conversation.id
      );
    }, []);

  const selectConversation =
    useCallback((id: string) => {
      setActiveConversationId(id);
    }, []);

  const clearHistory =
    useCallback(() => {
      clearAllConversations();

      const conversation =
        createConversation();

      updateConversation(conversation);

      setConversations([
        conversation,
      ]);

      setActiveConversationId(
        conversation.id
      );
    }, []);
      const removeConversation =
    useCallback(
      (id: string) => {
        deleteConversation(id);

        const remaining =
          conversations.filter(
            (conversation) =>
              conversation.id !== id
          );

        if (remaining.length === 0) {
          const conversation =
            createConversation();

          updateConversation(conversation);

          setConversations([
            conversation,
          ]);

          setActiveConversationId(
            conversation.id
          );

          return;
        }

        setConversations(remaining);

        if (
          activeConversationId === id
        ) {
          setActiveConversationId(
            remaining[0].id
          );
        }
      },
      [
        conversations,
        activeConversationId,
      ]
    );

  const sendMessage =
    useCallback(
      async (question: string) => {
        if (
          !activeConversation
        ) {
          return;
        }

        const text =
          question.trim();

        if (
          !text ||
          loading
        ) {
          return;
        }

        const userMessage: ChatMessage =
          {
            id: crypto.randomUUID(),
            role: "user",
            content: text,
          };

        const updatedMessages = [
          ...activeConversation.messages,
          userMessage,
        ];

        let updatedConversation = {
          ...activeConversation,
          messages:
            updatedMessages,
          title:
            generateConversationTitle(
              updatedMessages
            ),
          updatedAt:
            new Date().toISOString(),
        };

        saveConversation(
          updatedConversation
        );

        setLoading(true);

        try {
          const response =
            await chatService.askQuestion(
              text
            );

          const assistantMessage: ChatMessage =
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content:
                response.answer,
              sources:
                response.sources,
            };

          updatedConversation = {
            ...updatedConversation,
            messages: [
              ...updatedConversation.messages,
              assistantMessage,
            ],
            updatedAt:
              new Date().toISOString(),
          };

          saveConversation(
            updatedConversation
          );
        } catch (
          error
        ) {
          console.error(
            error
          );

          const assistantMessage: ChatMessage =
            {
              id: crypto.randomUUID(),
              role:
                "assistant",
              content:
                "Unable to contact the AI service. Please try again.",
            };

          updatedConversation = {
            ...updatedConversation,
            messages: [
              ...updatedConversation.messages,
              assistantMessage,
            ],
            updatedAt:
              new Date().toISOString(),
          };

          saveConversation(
            updatedConversation
          );
        } finally {
          setLoading(false);
        }
      },
      [
        activeConversation,
        loading,
        saveConversation,
      ]
    );

  return {
    conversations,
    activeConversationId,
    messages,
    loading,
    sendMessage,
    newChat,
    selectConversation,
    removeConversation,
    clearHistory,
  };
}