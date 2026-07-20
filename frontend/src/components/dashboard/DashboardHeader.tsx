import { Box, Typography, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

export default function DashboardHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Retail Dashboard
        </Typography>

        <Typography color="text.secondary">
          Enterprise Retail Decision Intelligence Platform
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<DownloadIcon />}
      >
        Export
      </Button>
    </Box>
  );
}