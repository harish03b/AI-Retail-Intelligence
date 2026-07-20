import {
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useQuery } from "@tanstack/react-query";
import dashboardService from "../../services/dashboardService";

export default function StorePerformanceChart() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["store-performance"],
    queryFn: dashboardService.getStorePerformance,
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 700,
          }}
        >
          Store Performance
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

           <XAxis dataKey="city" />

            <YAxis />

            <Tooltip />

            <Bar
    dataKey="total_sales"
    fill="#1976d2"
/>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}