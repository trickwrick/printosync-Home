"use client";

import {
  Activity,
  BarChart3,
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  IndianRupee,
  LayoutDashboard,
  LayoutGrid,
  LineChart,
  Package,
  Receipt,
  Search,
  ShoppingCart,
  Truck,
  UserCircle,
  Users,
  Workflow,
} from "lucide-react";
import type { NavModule } from "../types";

export const navModules: NavModule[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "core" },
  { id: "crm", label: "CRM", icon: Users, group: "core", badge: 3 },
  { id: "customers", label: "Customers", icon: UserCircle, group: "core" },
  { id: "orders", label: "Orders", icon: Package, group: "core", badge: 5 },
  { id: "production", label: "Production", icon: Workflow, group: "core" },
  { id: "inventory", label: "Inventory", icon: Truck, group: "core" },
  { id: "invoices", label: "Invoices", icon: Receipt, group: "finance" },
  { id: "gst", label: "GST Billing", icon: IndianRupee, group: "finance" },
  { id: "quotation", label: "Quotation", icon: FileText, group: "finance" },
  { id: "purchase", label: "Purchase", icon: ShoppingCart, group: "finance" },
  { id: "reports", label: "Reports", icon: BarChart3, group: "insights" },
  { id: "analytics", label: "Analytics", icon: LineChart, group: "insights" },
  { id: "charts", label: "Charts", icon: BarChart3, group: "insights" },
  { id: "calendar", label: "Calendar", icon: Calendar, group: "tools" },
  { id: "kanban", label: "Kanban", icon: LayoutGrid, group: "tools" },
  { id: "notifications", label: "Notifications", icon: Bell, group: "tools", badge: 2 },
  { id: "timeline", label: "Activity", icon: Activity, group: "tools" },
];

export const navGroups = [
  { key: "core", label: "Operations" },
  { key: "finance", label: "Finance" },
  { key: "insights", label: "Insights" },
  { key: "tools", label: "Tools" },
] as const;

export { Search, ChevronLeft, ChevronRight };
