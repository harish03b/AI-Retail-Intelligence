import React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteIcon from "@mui/icons-material/Delete";

import type { ChatConversation } from "../types/chat";

interface ChatHistoryProps {
  conversations: ChatConversation[];
  activeConversationId: string | null;

  onSelectConversation: (id: string) => void;

  onNewChat: () => void;

  onDeleteConversation: (id: string) => void;

  onClearHistory: () => void;
}

// ⚡ Bolt: Performance optimization
// What: Wrapped ChatHistory in React.memo
// Why: Prevents ChatHistory from unnecessarily re-rendering on every keystroke when the user types in the AIAssistantPage's input field
// Impact: Eliminates redundant render cycles for the entire conversation history list, keeping typing highly responsive
// Measurement: Use React DevTools Profiler to verify ChatHistory does not render when typing in the prompt input
const ChatHistory = React.memo(function ChatHistory({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onClearHistory,
}: ChatHistoryProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        width: 300,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box p={2}>
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          Conversations
        </Typography>

        <Button
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ mt: 2 }}
          onClick={onNewChat}
        >
          New Chat
        </Button>
      </Box>

      <Divider />

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        <List>
          {conversations.length === 0 ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ p: 2 }}
            >
              No conversations yet.
            </Typography>
          ) : (
            conversations.map((chat) => (
              <Box
                key={chat.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ListItemButton
                  selected={activeConversationId === chat.id}
                  onClick={() => onSelectConversation(chat.id)}
                  sx={{ flex: 1 }}
                >
                  <ListItemText
                    primary={chat.title}
                    secondary={new Date(
                      chat.updatedAt
                    ).toLocaleString()}
                  />
                </ListItemButton>

                <IconButton
                  color="error"
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={(event) => {
                    event.stopPropagation();

                    const confirmed = window.confirm(
                      `Delete "${chat.title}"?`
                    );

                    if (confirmed) {
                      onDeleteConversation(chat.id);
                    }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))
          )}
        </List>
      </Box>

      <Divider />

      <Stack p={2}>
        <Button
          color="error"
          variant="outlined"
          startIcon={<DeleteForeverIcon />}
          onClick={() => {
            if (
              window.confirm(
                "Delete all conversations?"
              )
            ) {
              onClearHistory();
            }
          }}
        >
          Clear History
        </Button>
      </Stack>
    </Paper>
  );
});

export default ChatHistory;