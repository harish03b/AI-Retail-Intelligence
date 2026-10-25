import React, { memo } from "react";
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
import remarkGfm from "remark-gfm";
import DescriptionIcon from "@mui/icons-material/Description";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { ChatMessage } from "../types/chat";

const markdownPlugins = [remarkGfm];
const markdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <Typography
      sx={{
        mb: 1.5,
        lineHeight: 1.9,
      }}
    >
      {children}
    </Typography>
  ),

  h1: ({ children }: { children?: React.ReactNode }) => (
    <Typography
      variant="h4"
      fontWeight={700}
      sx={{ mb: 2 }}
    >
      {children}
    </Typography>
  ),

  h2: ({ children }: { children?: React.ReactNode }) => (
    <Typography
      variant="h5"
      fontWeight={700}
      sx={{ mb: 2 }}
    >
      {children}
    </Typography>
  ),

  h3: ({ children }: { children?: React.ReactNode }) => (
    <Typography
      variant="h6"
      fontWeight={700}
      sx={{ mb: 1.5 }}
    >
      {children}
    </Typography>
  ),

  ul: ({ children }: { children?: React.ReactNode }) => (
    <Box
      component="ul"
      sx={{ pl: 3, mb: 2 }}
    >
      {children}
    </Box>
  ),

  ol: ({ children }: { children?: React.ReactNode }) => (
    <Box
      component="ol"
      sx={{ pl: 3, mb: 2 }}
    >
      {children}
    </Box>
  ),

  li: ({ children }: { children?: React.ReactNode }) => (
    <Typography
      component="li"
      sx={{ mb: 0.5 }}
    >
      {children}
    </Typography>
  ),

  strong: ({ children }: { children?: React.ReactNode }) => (
    <Box
      component="strong"
      sx={{
        fontWeight: 700,
      }}
    >
      {children}
    </Box>
  ),

  code: ({ children }: { children?: React.ReactNode }) => (
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
};

interface ChatMessageItemProps {
  message: ChatMessage;
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent:
          message.role === "user" ? "flex-end" : "flex-start",
      }}
    >
      <Stack
        direction={message.role === "user" ? "row-reverse" : "row"}
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
            bgcolor: message.role === "assistant" ? "#6C63FF" : "#1976D2",
            boxShadow: "0 8px 18px rgba(0,0,0,.15)",
          }}
        >
          {message.role === "assistant" ? (
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
            bgcolor: message.role === "assistant" ? "#ffffff" : "#6C63FF",
            color: message.role === "assistant" ? "text.primary" : "#fff",
            border:
              message.role === "assistant" ? "1px solid #ECEBFF" : "none",
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
            {message.role === "assistant" ? "Enterprise AI" : "You"}
          </Typography>

          <ReactMarkdown
            remarkPlugins={markdownPlugins}
            components={markdownComponents}
          >
            {message.content}
          </ReactMarkdown>

          {message.role === "assistant" &&
            message.sources &&
            message.sources.length > 0 && (
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
                  {message.sources.map((source) => (
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
                  ))}
                </Stack>
              </>
            )}
        </Card>
      </Stack>
    </Box>
  );
};

export default memo(ChatMessageItem);
