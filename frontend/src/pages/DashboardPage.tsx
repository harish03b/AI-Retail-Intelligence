import { Grid } from "@mui/material";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import KPICards from "../components/dashboard/KPICards";
import MonthlySalesChart from "../components/dashboard/MonthlySalesChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import StorePerformanceChart from "../components/dashboard/StorePerformanceChart";
import TopProductsTable from "../components/tables/TopProductsTable";
import TopCustomersTable from "../components/tables/TopCustomersTable";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />

      <KPICards />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <MonthlySalesChart />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CategoryChart />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <StorePerformanceChart />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TopProductsTable />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TopCustomersTable />
        </Grid>
      </Grid>
    </>
  );
}