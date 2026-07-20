import api from "../api/axios";

import type {
  DashboardSummary,
  MonthlySales,
  CategorySales,
  StorePerformance,
  TopProduct,
  TopCustomer,
} from "../types/dashboard";

const dashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    const { data } = await api.get("/dashboard/summary");
    return data;
  },

  async getMonthlySales(): Promise<MonthlySales[]> {
    const { data } = await api.get("/dashboard/monthly-sales");
    return data;
  },

  async getCategorySales(): Promise<CategorySales[]> {
    const { data } = await api.get("/dashboard/category-sales");
    return data;
  },

  async getStorePerformance(): Promise<StorePerformance[]> {
    const { data } = await api.get("/dashboard/store-performance");
    return data;
  },

  async getTopProducts(): Promise<TopProduct[]> {
    const { data } = await api.get("/dashboard/top-products");
    return data;
  },

  async getTopCustomers(): Promise<TopCustomer[]> {
    const { data } = await api.get("/dashboard/top-customers");
    return data;
  },
};

export default dashboardService;