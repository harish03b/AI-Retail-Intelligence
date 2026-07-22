import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import { documentService } from "../services/documentService";
import type { Document } from "../types/document";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase();

    setFilteredDocuments(
      documents.filter((document) =>
        document.filename.toLowerCase().includes(value)
      )
    );
  }, [search, documents]);

  async function loadDocuments() {
    try {
      setLoading(true);

      const data = await documentService.getDocuments();

      setDocuments(data);
      setFilteredDocuments(data);
    } catch (error) {
      console.error("Failed to load documents:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography color="text.secondary">
            Loading documents...
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      {/* ================= Header ================= */}

      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          border: "1px solid #ECEBFF",
          background:
            "linear-gradient(135deg,#ffffff,#f8f7ff)",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
            >
              Documents
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Manage the AI knowledge base documents.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<UploadFileRoundedIcon />}
            disabled
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.2,
              textTransform: "none",
              fontWeight: 700,
              background:
                "linear-gradient(135deg,#6C63FF,#8E7BFF)",
            }}
          >
            Upload Document
          </Button>
        </Stack>

        <TextField
          fullWidth
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mt: 4 }}
        />
      </Paper>

      {/* ================= Empty State ================= */}

      {filteredDocuments.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
            border: "1px solid #ECEBFF",
          }}
        >
          <PictureAsPdfRoundedIcon
            sx={{
              fontSize: 70,
              color: "#E53935",
              mb: 2,
            }}
          />

          <Typography
            variant="h5"
            fontWeight={700}
          >
            No documents found
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Try another search or upload a new document.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredDocuments.map((document) => (
            <Grid
              key={document.filename}
              size={{ xs: 12, md: 6 }}
            >
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: "1px solid #ECEBFF",
                  transition: ".25s",

                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow:
                      "0 10px 25px rgba(0,0,0,.08)",
                  },
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <PictureAsPdfRoundedIcon
                      sx={{
                        fontSize: 42,
                        color: "#E53935",
                      }}
                    />

                    <Box flex={1}>
                      <Typography
                        fontWeight={700}
                        noWrap
                      >
                        {document.filename}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {document.size_readable}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mt: 3 }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={
                        <VisibilityRoundedIcon />
                      }
                      onClick={() =>
                        window.open(
                          `${import.meta.env.VITE_API_BASE_URL}/documents/${encodeURIComponent(
                            document.filename
                          )}`,
                          "_blank"
                        )
                      }
                    >
                      View
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={
                        <DownloadRoundedIcon />
                      }
                      component="a"
                      href={`${import.meta.env.VITE_API_BASE_URL}/documents/${encodeURIComponent(
                        document.filename
                      )}`}
                      download
                    >
                      Download
                    </Button>

                    <Button
                      color="error"
                      variant="outlined"
                      startIcon={
                        <DeleteOutlineRoundedIcon />
                      }
                      disabled
                    >
                      Delete
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}