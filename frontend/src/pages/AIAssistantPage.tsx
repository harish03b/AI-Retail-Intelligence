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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AddIcon from "@mui/icons-material/Add";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DescriptionIcon from "@mui/icons-material/Description";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import ChatHistory from "../components/ChatHistory";
import { useChat } from "../hooks/useChat";

const SUGGESTED_QUESTIONS = [
  "What is the return policy?",
  "Show me top selling products",
  "Explain the shipping policy",
  "Which products have low inventory?",
  "Summarize the refund policy",
  "Show monthly sales trend",
];

export default function AIAssistantPage() {
  const [question, setQuestion] = useState("");

 const {
  conversations,
  activeConversationId,
  messages,
  loading,
  sendMessage,
  newChat,
  selectConversation,
  removeConversation,
  clearHistory,
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
    height: "calc(100vh - 70px)",
    bgcolor: "#eef3ff",
    background:
      "linear-gradient(135deg,#eef4ff 0%,#f8f9ff 45%,#fff7fb 100%)",
    overflow: "hidden",
  }}
>
  {/* ================= Sidebar ================= */}

  <Paper
    elevation={0}
    sx={{
      width: 300,
      borderRadius: 0,
      borderRight: "1px solid",
      borderColor: "divider",
      bgcolor: "rgba(255,255,255,.75)",
      backdropFilter: "blur(20px)",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Box sx={{ p: 2 }}>
      <Button
        fullWidth
        variant="contained"
        startIcon={<AddIcon />}
        onClick={newChat}
        sx={{
          borderRadius: 3,
          py: 1.4,
          textTransform: "none",
          fontWeight: 700,
          background:
            "linear-gradient(135deg,#6C63FF,#8E7BFF)",
          boxShadow:
            "0 8px 20px rgba(108,99,255,.35)",
        }}
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
     <ChatHistory
  conversations={conversations}
  activeConversationId={activeConversationId}
  onSelectConversation={selectConversation}
  onNewChat={newChat}
  onDeleteConversation={removeConversation}
  onClearHistory={clearHistory}
/>
    </Box>
  </Paper>

  {/* ================= Main Content ================= */}

  <Box
    sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      p: 4,
      overflow: "hidden",
    }}
  >
    {/* Header */}

    <Paper
      elevation={0}
      sx={{
        borderRadius: 5,
        p: 4,
        mb: 3,
        background:
          "linear-gradient(135deg,#ffffff,#f8f7ff)",
        border: "1px solid #ecebff",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background:
                "linear-gradient(90deg,#4F46E5,#7C3AED,#EC4899)",
              WebkitBackgroundClip:
                "text",
              WebkitTextFillColor:
                "transparent",
            }}
          >
            Hey Harish 👋
          </Typography>

          <Typography
            variant="h4"
            sx={{
              mt: 1,
              fontWeight: 700,
            }}
          >
            What can I help with today?
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 2,
              maxWidth: 650,
            }}
          >
            Ask questions about sales,
            inventory, documents,
            products, suppliers,
            analytics and company
            knowledge.
          </Typography>
        </Box>

        <Avatar
          sx={{
            width: 90,
            height: 90,
            bgcolor: "#6C63FF",
            boxShadow:
              "0 12px 30px rgba(108,99,255,.35)",
          }}
        >
          <SmartToyRoundedIcon
            sx={{
              fontSize: 50,
            }}
          />
        </Avatar>
      </Stack>
    </Paper>

    {/* Chat Area */}

    <Paper
      elevation={0}
      sx={{
        flex: 1,
        borderRadius: 5,
        bgcolor: "rgba(255,255,255,.82)",
        backdropFilter: "blur(16px)",
        border: "1px solid #ecebff",
        p: 3,
        overflowY: "auto",
      }}
    >{messages.length === 0 && (
  <Box
    sx={{
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Stack
      spacing={4}
      alignItems="center"
      sx={{
        width: "100%",
        maxWidth: 950,
      }}
    >
      <Avatar
        sx={{
          width: 90,
          height: 90,
          background:
            "linear-gradient(135deg,#6C63FF,#A855F7)",
          boxShadow:
            "0 15px 40px rgba(108,99,255,.35)",
        }}
      >
        <AutoAwesomeIcon
          sx={{
            fontSize: 45,
          }}
        />
      </Avatar>

      <Box textAlign="center">
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
          }}
        >
          Enterprise Retail AI
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: "text.secondary",
            maxWidth: 700,
          }}
        >
          Ask anything about sales,
          inventory, suppliers,
          products, customer trends,
          business documents or
          retail analytics.
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {SUGGESTED_QUESTIONS.map(
          (item) => (
            <Card
              key={item}
              onClick={() =>
                handleSend(item)
              }
              sx={{
                width: 250,
                p: 2.5,
                cursor: "pointer",
                borderRadius: 4,
                transition: ".25s",
                border:
                  "1px solid #ECEBFF",
                "&:hover": {
                  transform:
                    "translateY(-6px)",
                  boxShadow:
                    "0 12px 30px rgba(108,99,255,.18)",
                  borderColor:
                    "#6C63FF",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor:
                    "#6C63FF",
                  mb: 2,
                }}
              >
                <AutoAwesomeIcon />
              </Avatar>

              <Typography
                fontWeight={700}
              >
                {item}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Click to ask this
                question instantly.
              </Typography>
            </Card>
          )
        )}
      </Stack>
    </Stack>
  </Box>
)}
<Stack spacing={3}>
  {messages.map((message) => (
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
      <Stack
        direction={
          message.role === "user"
            ? "row-reverse"
            : "row"
        }
        spacing={2}
        alignItems="flex-start"
        sx={{
          maxWidth: "82%",
        }}
      >
        <Avatar
          sx={{
            width: 42,
            height: 42,
            bgcolor:
              message.role === "assistant"
                ? "#6C63FF"
                : "#1976D2",
            boxShadow:
              "0 8px 18px rgba(0,0,0,.15)",
          }}
        >
          {message.role ===
          "assistant" ? (
            <SmartToyRoundedIcon />
          ) : (
            <PersonRoundedIcon />
          )}
        </Avatar>

        <Card
          elevation={0}
          sx={{
            borderRadius: 5,
            p: 2.5,
            bgcolor:
              message.role === "assistant"
                ? "#ffffff"
                : "#6C63FF",
            color:
              message.role === "assistant"
                ? "text.primary"
                : "#fff",
            border:
              message.role === "assistant"
                ? "1px solid #ECEBFF"
                : "none",
            boxShadow:
              message.role === "assistant"
                ? "0 8px 20px rgba(0,0,0,.06)"
                : "0 12px 24px rgba(108,99,255,.25)",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            {message.role ===
            "assistant"
              ? "Enterprise AI"
              : "You"}
          </Typography>

          <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    p: ({ children }) => (
      <Typography
        sx={{
          mb: 1.5,
          lineHeight: 1.9,
        }}
      >
        {children}
      </Typography>
    ),

    h1: ({ children }) => (
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        {children}
      </Typography>
    ),

    h2: ({ children }) => (
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        {children}
      </Typography>
    ),

    h3: ({ children }) => (
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{ mb: 1.5 }}
      >
        {children}
      </Typography>
    ),

    ul: ({ children }) => (
      <Box
        component="ul"
        sx={{ pl: 3, mb: 2 }}
      >
        {children}
      </Box>
    ),

    ol: ({ children }) => (
      <Box
        component="ol"
        sx={{ pl: 3, mb: 2 }}
      >
        {children}
      </Box>
    ),

    li: ({ children }) => (
      <Typography
        component="li"
        sx={{ mb: 0.5 }}
      >
        {children}
      </Typography>
    ),

    strong: ({ children }) => (
      <Box
        component="strong"
        sx={{
          fontWeight: 700,
        }}
      >
        {children}
      </Box>
    ),

    code: ({ children }) => (
      <Box
        component="code"
        sx={{
          bgcolor: "#f4f4f4",
          px: 0.5,
          py: 0.25,
          borderRadius: 1,
          fontFamily: "monospace",
        }}
      >
        {children}
      </Box>
    ),
  }}
>
  {message.content}
</ReactMarkdown>

          {message.role ===
            "assistant" &&
            message.sources &&
            message.sources.length >
              0 && (
              <>
                <Divider
                  sx={{
                    my: 2,
                  }}
                />

                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Sources
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{
                    flexWrap: "wrap",
                  }}
                >
                  {message.sources.map(
                    (source) => (
                      <Chip
  key={source}
  icon={<DescriptionIcon />}
  label={source}
  color="primary"
  variant="outlined"
  clickable
  onClick={() =>
    window.open(
      `${import.meta.env.VITE_API_BASE_URL}/documents/${encodeURIComponent(
        source
      )}`,
      "_blank"
    )
  }
  sx={{
    borderRadius: 3,
    cursor: "pointer",
    transition: "0.2s",

    "&:hover": {
      backgroundColor: "#6C63FF",
      color: "#fff",
      transform: "translateY(-2px)",
    },
  }}
/>
                    )
                  )}
                </Stack>
              </>
            )}
        </Card>
      </Stack>
    </Box>
  ))}

  {loading && (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
      >
        <Avatar
          sx={{
            bgcolor: "#6C63FF",
          }}
        >
          <SmartToyRoundedIcon />
        </Avatar>

        <Card
          elevation={0}
          sx={{
            borderRadius: 5,
            px: 3,
            py: 2,
            border:
              "1px solid #ECEBFF",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <CircularProgress
              size={20}
            />

            <Typography
              fontWeight={600}
            >
              AI is thinking...
            </Typography>
          </Stack>
        </Card>
      </Stack>
    </Box>
  )}

  <div ref={bottomRef} />
</Stack>

</Paper>
<Paper
  elevation={0}
  sx={{
    mt: 3,
    p: 2,
    borderRadius: 5,
    border: "1px solid #ECEBFF",
    bgcolor: "rgba(255,255,255,.85)",
    backdropFilter: "blur(16px)",
  }}
>
  <Stack
    direction="row"
    spacing={2}
    alignItems="flex-end"
  >
    <TextField
      fullWidth
      multiline
      maxRows={5}
      variant="outlined"
      placeholder="Ask anything about sales, inventory, customers, policies..."
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
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 4,
          bgcolor: "#fafbff",
        },
      }}
    />

    <Button
      variant="contained"
      disabled={
        loading || !question.trim()
      }
      onClick={() => handleSend()}
      sx={{
        minWidth: 64,
        width: 64,
        height: 64,
        borderRadius: "50%",
        background:
          "linear-gradient(135deg,#6C63FF,#8E7BFF)",
        boxShadow:
          "0 10px 24px rgba(108,99,255,.35)",
        "&:hover": {
          background:
            "linear-gradient(135deg,#5A52F0,#7B68EE)",
          transform: "scale(1.05)",
        },
      }}
    >
      <SendRoundedIcon />
    </Button>
  </Stack>
</Paper>

</Box>
</Box>
);
}