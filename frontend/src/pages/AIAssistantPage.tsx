import { useEffect, useRef, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import DescriptionIcon from "@mui/icons-material/Description";

import { useChat } from "../hooks/useChat";

const SUGGESTED_QUESTIONS = [
  "What is the return policy?",
  "Explain shipping policy",
  "How long does delivery take?",
  "What payment methods are accepted?",
  "Do you offer international shipping?",
  "How can I track my order?",
];

export default function AIAssistantPage() {
  const [question, setQuestion] = useState("");

  const {
    messages,
    loading,
    sendMessage,
  } = useChat();

  const bottomRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function handleSend(
    customQuestion?: string
  ) {
    const text = (
      customQuestion ?? question
    ).trim();

    if (!text || loading) {
      return;
    }

    if (!customQuestion) {
      setQuestion("");
    }

    await sendMessage(text);
  }

  return ( 
    <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 110px)",
  }}
>
  <Typography
    variant="h4"
    sx={{ fontWeight: 700 }}
  >
    AI Retail Assistant
  </Typography>

  <Typography
    color="text.secondary"
    sx={{ mb: 3 }}
  >
    Ask questions about company policies,
    retail documents, inventory,
    products and business knowledge.
  </Typography>

  <Divider sx={{ mb: 3 }} />

  <Paper
    elevation={2}
    sx={{
      flex: 1,
      overflowY: "auto",
      borderRadius: 3,
      p: 3,
      bgcolor: "#fafafa",
    }}
  >
    {messages.length === 0 && (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          spacing={2}
          sx={{ alignItems: "center", maxWidth: 600 }}
        >
          <Avatar
            sx={{
              width: 72,
              height: 72,
              bgcolor: "primary.main",
            }}
          >
            <SmartToyIcon fontSize="large" />
          </Avatar>

          <Typography
            variant="h5"
            sx={{ fontWeight: 700 }}
          >
            Welcome to Enterprise Retail AI
          </Typography>

          <Typography
            color="text.secondary"
            align="center"
          >
            Ask anything about company policies,
            inventory, sales, shipping,
            payment methods, business documents,
            products and retail analytics.
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            {SUGGESTED_QUESTIONS.map(
              (item) => (
                <Chip
                  key={item}
                  label={item}
                  clickable
                  disabled={loading}
                  color="primary"
                  variant="outlined"
                  onClick={() =>
                    handleSend(item)
                  }
                  sx={{
                    cursor: "pointer",
                    transition: ".2s",
                    "&:hover": {
                      transform:
                        "translateY(-2px)",
                    },
                  }}
                />
              )
            )}
          </Stack>
        </Stack>
      </Box>
    )}

    <Stack spacing={3}>
      { messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            display: "flex",
            justifyContent:
              message.role === "user"
                ? "flex-end"
                : "flex-start",
          }}
        >
          <Card
            elevation={2}
            sx={{
              maxWidth: "75%",
              borderRadius: 3,
              p: 2,
              bgcolor:
                message.role === "user"
                  ? "primary.main"
                  : "#ffffff",
              color:
                message.role === "user"
                  ? "#fff"
                  : "inherit",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", mb: 1 }}
            >
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  bgcolor:
                    message.role ===
                    "assistant"
                      ? "primary.main"
                      : "#fff",
                  color:
                    message.role ===
                    "assistant"
                      ? "#fff"
                      : "primary.main",
                }}
              >
                {message.role ===
                "assistant" ? (
                  <SmartToyIcon
                    fontSize="small"
                  />
                ) : (
                  <PersonIcon
                    fontSize="small"
                  />
                )}
              </Avatar>

              <Typography
                sx={{ fontWeight: 700 }}
              >
                {message.role ===
                "assistant"
                  ? "AI Assistant"
                  : "You"}
              </Typography>
            </Stack>

            <Typography
              sx={{
                whiteSpace:
                  "pre-wrap",
                lineHeight: 1.8,
              }}
            >
              {message.content}
            </Typography>

            {message.role ===
              "assistant" &&
              message.sources &&
              message.sources.length >
                0 && (
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ flexWrap: "wrap", mt: 2 }}
                >
                  {message.sources.map(
                    (source) => (
                      <Chip
                        key={source}
                        icon={
                          <DescriptionIcon />
                        }
                        label={source}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    )
                  )}
                </Stack>
              )}
          </Card>
        </Box>
      ))}    
    
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Card
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 3,
              maxWidth: "70%",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center" }}
            >
              <CircularProgress size={22} />

              <Typography>
                AI Assistant is thinking...
              </Typography>
            </Stack>
          </Card>
        </Box>
      )}

      <div ref={bottomRef} />
    </Stack>
  </Paper>

  <Paper
    elevation={3}
    sx={{
      mt: 2,
      p: 2,
      borderRadius: 3,
    }}
  >
    <Stack
      direction="row"
      spacing={2}
      sx={{ alignItems: "flex-end" }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder="Ask anything about your retail documents..."
        value={question}
        disabled={loading}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            !e.shiftKey
          ) {
            e.preventDefault();
            handleSend();
          }
        }}
      />

      <Button
        variant="contained"
        endIcon={<SendIcon />}
        disabled={
          loading || !question.trim()
        }
        onClick={() => handleSend()}
        sx={{
          minWidth: 140,
          height: 56,
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Send
      </Button>
    </Stack>
  </Paper>
</Box>
);
}