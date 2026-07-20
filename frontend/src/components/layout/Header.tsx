import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Badge,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={1}
      sx={{
        width: "calc(100% - 260px)",
        ml: "260px",
        bgcolor: "#fff",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
          }}
        >
          Enterprise Retail Decision Intelligence Platform
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton>
            <Badge
              badgeContent={3}
              color="error"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton>
            <SettingsIcon />
          </IconButton>

          <Avatar
            sx={{
              bgcolor: "primary.main",
            }}
          >
            H
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}