import {
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import dashboardService from "../../services/dashboardService";
import type { TopProduct } from "../../types/dashboard";
export default function TopProductsTable() {
  const { data = [], isLoading } = useQuery<TopProduct[]>({
    queryKey: ["top-products"],
    queryFn: dashboardService.getTopProducts,
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 700 }}
        >
          Top Products
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Total Sales</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.product_name}>
                <TableCell>{item.product_name}</TableCell>

                <TableCell align="right">
                  ₹{item.total_sales.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}