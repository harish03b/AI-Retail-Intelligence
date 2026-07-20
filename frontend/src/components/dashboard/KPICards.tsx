import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";

import { useQuery } from "@tanstack/react-query";
import dashboardService from "../../services/dashboardService";

const iconStyle = {
  fontSize: 42,
};

export default function KPICards() {
  const { data, isLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: dashboardService.getSummary,
  });

  if (isLoading) return <CircularProgress />;

  const cards = [
    {
      title: "Revenue",
      value: `₹${Number(data?.total_sales ?? 0).toLocaleString()}`,
      icon: <MonetizationOnIcon color="success" sx={iconStyle} />,
    },
    {
      title: "Orders",
      value: Number(data?.total_orders ?? 0).toLocaleString(),
      icon: <ShoppingCartIcon color="primary" sx={iconStyle} />,
    },
    {
      title: "Customers",
      value: Number(data?.total_customers ?? 0).toLocaleString(),
      icon: <PeopleIcon color="warning" sx={iconStyle} />,
    },
    {
      title: "Products",
      value: Number(data?.total_products ?? 0).toLocaleString(),
      icon: <InventoryIcon color="secondary" sx={iconStyle} />,
    },
  ];

  return (
    <Grid
      container
      spacing={3}
      sx={{ mb: 4 }}
    >
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{ xs: 12, sm: 6, md: 3 }}
        >
          <Card elevation={2}>
            <CardContent>
              {card.icon}

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                {card.title}
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                }}
              >
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}