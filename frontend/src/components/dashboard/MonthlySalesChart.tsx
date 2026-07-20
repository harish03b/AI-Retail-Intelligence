import {
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
 YAxis,
  Tooltip,
} from "recharts";

import { useQuery } from "@tanstack/react-query";
import dashboardService from "../../services/dashboardService";

export default function MonthlySalesChart() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["monthly-sales"],
    queryFn: dashboardService.getMonthlySales,
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 700 }}
        >
          Monthly Sales
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month_name" />

            <YAxis />

            <Tooltip />

           <Line
    dataKey="total_sales"
    stroke="#1976d2"
    strokeWidth={3}
/>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}