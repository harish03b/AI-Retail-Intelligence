export interface DashboardSummary {
  total_sales: number;
  total_orders: number;
  total_customers: number;
  total_products: number;
}

export interface MonthlySales {
  year: number;
  month: number;
  month_name: string;
  total_sales: number;
}

export interface CategorySales {
  category_name: string;
  total_sales: number;
}

export interface StorePerformance {
  city: string;
  state: string;
  total_sales: number;
}

export interface TopProduct {
  product_name: string;
  total_sales: number;
}

export interface TopCustomer {
  customer_name: string;
  total_sales: number;
}