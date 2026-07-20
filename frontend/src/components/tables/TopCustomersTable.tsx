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
import type { TopCustomer } from "../../types/dashboard";

export default function TopCustomersTable() {
  const { data = [], isLoading } = useQuery<TopCustomer[]>({
    queryKey: ["top-customers"],
    queryFn: dashboardService.getTopCustomers,
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
          Top Customers
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell align="right">Total Sales</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.customer_name}>
                <TableCell>{item.customer_name}</TableCell>

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