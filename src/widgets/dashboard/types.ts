import type { LucideIcon } from "lucide-react";

export type DashboardModule =
  | "dashboard"
  | "crm"
  | "customers"
  | "orders"
  | "production"
  | "inventory"
  | "invoices"
  | "gst"
  | "quotation"
  | "purchase"
  | "reports"
  | "analytics"
  | "charts"
  | "calendar"
  | "kanban"
  | "notifications"
  | "timeline";

export interface NavModule {
  id: DashboardModule;
  label: string;
  icon: LucideIcon;
  group: "core" | "finance" | "insights" | "tools";
  badge?: number;
}

export interface StatMetric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

export interface OrderRow {
  id: string;
  client: string;
  job: string;
  status: string;
  amount: string;
  due: string;
}

export interface CustomerRow {
  id: string;
  name: string;
  company: string;
  orders: number;
  revenue: string;
  status: "active" | "lead" | "inactive";
}

export interface KanbanCard {
  id: string;
  title: string;
  client: string;
  priority: "high" | "medium" | "low";
  assignee: string;
}

export interface ActivityItem {
  id: string;
  time: string;
  title: string;
  description: string;
  type: "order" | "invoice" | "production" | "crm" | "system";
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "alert" | "info" | "success";
}

export interface PipelineStage {
  name: string;
  count: number;
  value: string;
  color: string;
}

export interface InventoryItem {
  sku: string;
  name: string;
  stock: number;
  reorder: number;
  unit: string;
  status: "ok" | "low" | "critical";
}

export interface InvoiceRow {
  id: string;
  client: string;
  amount: string;
  gst: string;
  status: "paid" | "pending" | "overdue";
  date: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: number;
  time: string;
  color: string;
}
