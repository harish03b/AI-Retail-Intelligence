import { memo } from "react";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";

import type { ChatMessage } from "../types/chat";

interface ChatMessageItemProps {
  message: ChatMessage;
  markdownPlugins: any[];
  markdownComponents: any;
}

// ⚡ Bolt: Performance optimization
// What: Extracted individual chat messages into a separate memoized component.
// Why: The main `AIAssistantPage` component re-renders on every keystroke when typing in the input field. Rendering lists of complex `ReactMarkdown` components without memoization causes expensive O(N) re-renders for every typed character, creating severe input lag.
// Impact: Eliminates unnecessary re-renders of the entire message history while the user types, significantly improving typing responsiveness.
// Measurement: Verify using React DevTools profiler by checking that `ChatMessageItem` components do not re-render when typing in the input field.
export const ChatMessageItem = memo(function ChatMessageItem({
  message,
  markdownPlugins,
  markdownComponents,
}: ChatMessageItemProps) {
  return (
    <Box
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
            remarkPlugins={markdownPlugins}
            components={markdownComponents}
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
                            `${import.meta.env.VITE_API_BASE_URL}/files/${encodeURIComponent(
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
  );
});
