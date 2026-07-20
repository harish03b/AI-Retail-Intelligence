import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useQuery } from "@tanstack/react-query";
import dashboardService from "../../services/dashboardService";
import type { CategorySales } from "../../types/dashboard";

const COLORS = [
  "#1976d2",
  "#43a047",
  "#ef6c00",
  "#8e24aa",
  "#e53935",
];

export default function CategoryChart() {
  const { data = [], isLoading } = useQuery<CategorySales[]>({
    queryKey: ["category-sales"],
    queryFn: dashboardService.getCategorySales,
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
          Category Sales
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <PieChart>
            <Pie
    data={data}
    dataKey="total_sales"
    nameKey="category_name"
              outerRadius={120}
              label
            >
              {data.map((item, index) => (
                <Cell
                  key={item.category_name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}