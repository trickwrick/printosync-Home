import type {
  ActivityItem,
  CalendarEvent,
  CustomerRow,
  InventoryItem,
  InvoiceRow,
  KanbanCard,
  NotificationItem,
  OrderRow,
  PipelineStage,
  StatMetric,
} from "../types";

export const dashboardStats: StatMetric[] = [
  { label: "Revenue (MTD)", value: "₹28.4L", change: "+12.5%", trend: "up" },
  { label: "Active Jobs", value: "47", change: "+8", trend: "up" },
  { label: "Customers", value: "1,284", change: "+24", trend: "up" },
  { label: "On-Time Delivery", value: "98.2%", change: "+2.1%", trend: "up" },
  { label: "Open Quotes", value: "₹6.2L", change: "18 pending", trend: "neutral" },
  { label: "Press Utilization", value: "87%", change: "+5%", trend: "up" },
];

export const revenueChartData = [42, 58, 45, 72, 55, 88, 65, 92, 78, 95, 82, 98];
export const ordersChartData = [28, 35, 32, 48, 41, 55, 50, 62, 58, 70, 65, 74];
export const productionChartData = [65, 72, 68, 85, 78, 92, 88, 95, 90, 88, 94, 96];

export const recentOrders: OrderRow[] = [
  { id: "ORD-4821", client: "Apex Print Co.", job: "5000 Brochures A4", status: "In Production", amount: "₹1,24,000", due: "Mar 28" },
  { id: "ORD-4819", client: "ColorCraft", job: "Business Cards x2000", status: "Proofing", amount: "₹82,000", due: "Mar 26" },
  { id: "ORD-4815", client: "MetroPress", job: "Packaging Cartons", status: "Delivered", amount: "₹2,48,000", due: "Mar 22" },
  { id: "ORD-4812", client: "SwiftLabel", job: "Label Roll 50mm", status: "Queued", amount: "₹56,400", due: "Mar 30" },
  { id: "ORD-4808", client: "Vertex Graphics", job: "Wide Format Banner", status: "In Production", amount: "₹38,500", due: "Mar 27" },
];

export const customers: CustomerRow[] = [
  { id: "C-1042", name: "Rajesh Kumar", company: "Apex Print Co.", orders: 48, revenue: "₹12.4L", status: "active" },
  { id: "C-1038", name: "Priya Sharma", company: "ColorCraft", orders: 32, revenue: "₹8.2L", status: "active" },
  { id: "C-1021", name: "Marcus Webb", company: "MetroPress", orders: 67, revenue: "₹24.8L", status: "active" },
  { id: "C-1015", name: "Anita Desai", company: "PackPro Ltd.", orders: 12, revenue: "₹3.1L", status: "lead" },
  { id: "C-1009", name: "James Okonkwo", company: "SwiftLabel", orders: 28, revenue: "₹6.5L", status: "active" },
];

export const kanbanColumns: Record<string, KanbanCard[]> = {
  "Prepress": [
    { id: "k1", title: "Catalog Layout", client: "Apex Print", priority: "high", assignee: "SK" },
    { id: "k2", title: "Label Artwork", client: "SwiftLabel", priority: "medium", assignee: "PM" },
  ],
  "Press 1": [
    { id: "k3", title: "5000 Brochures", client: "Apex Print", priority: "high", assignee: "RK" },
    { id: "k4", title: "Annual Report", client: "MetroPress", priority: "medium", assignee: "RK" },
  ],
  "Press 2": [
    { id: "k5", title: "Packaging Run", client: "PackPro", priority: "high", assignee: "AV" },
  ],
  "Finishing": [
    { id: "k6", title: "Die-cut Labels", client: "ColorCraft", priority: "low", assignee: "NS" },
    { id: "k7", title: "Lamination Job", client: "Vertex", priority: "medium", assignee: "NS" },
  ],
  "QC & Ship": [
    { id: "k8", title: "Banner Delivery", client: "Vertex Graphics", priority: "high", assignee: "DL" },
  ],
};

export const activities: ActivityItem[] = [
  { id: "a1", time: "2m ago", title: "New order received", description: "ORD-4821 from Apex Print Co. — ₹1,24,000", type: "order" },
  { id: "a2", time: "18m ago", title: "Proof approved", description: "ColorCraft approved business card proof v3", type: "crm" },
  { id: "a3", time: "1h ago", title: "Press 1 job completed", description: "Annual report run — 12,000 sheets", type: "production" },
  { id: "a4", time: "2h ago", title: "Invoice generated", description: "INV-2847 for MetroPress — ₹2,48,000 + GST", type: "invoice" },
  { id: "a5", time: "3h ago", title: "Low stock alert", description: "Coated paper 130gsm below reorder level", type: "system" },
  { id: "a6", time: "5h ago", title: "Quote sent", description: "Quotation QT-892 to PackPro Ltd.", type: "crm" },
];

export const notifications: NotificationItem[] = [
  { id: "n1", title: "Job delay risk", message: "ORD-4812 may miss deadline — material pending", time: "5m", read: false, type: "alert" },
  { id: "n2", title: "Payment received", message: "₹2,48,000 from MetroPress — INV-2847", time: "1h", read: false, type: "success" },
  { id: "n3", title: "New lead assigned", message: "PackPro Ltd. — packaging inquiry", time: "2h", read: true, type: "info" },
  { id: "n4", title: "GST filing reminder", message: "GSTR-1 due in 5 days", time: "4h", read: true, type: "alert" },
  { id: "n5", title: "Press maintenance", message: "Press 2 scheduled maintenance — Mar 25", time: "6h", read: true, type: "info" },
];

export const pipelineStages: PipelineStage[] = [
  { name: "Leads", count: 24, value: "₹8.4L", color: "bg-slate-500" },
  { name: "Quoted", count: 18, value: "₹6.2L", color: "bg-blue-500" },
  { name: "Negotiation", count: 8, value: "₹4.1L", color: "bg-violet-500" },
  { name: "Won", count: 12, value: "₹12.8L", color: "bg-emerald-500" },
  { name: "Lost", count: 5, value: "₹1.2L", color: "bg-red-500" },
];

export const inventory: InventoryItem[] = [
  { sku: "PAP-130-C", name: "Coated Paper 130gsm", stock: 420, reorder: 500, unit: "sheets", status: "low" },
  { sku: "INK-CMYK", name: "CMYK Ink Set", stock: 28, reorder: 15, unit: "sets", status: "ok" },
  { sku: "PLT-A2", name: "A2 Plates", stock: 8, reorder: 20, unit: "pcs", status: "critical" },
  { sku: "LAM-MAT", name: "Matte Lamination Roll", stock: 12, reorder: 8, unit: "rolls", status: "ok" },
  { sku: "BOX-CORR", name: "Corrugated Board", stock: 180, reorder: 100, unit: "sheets", status: "ok" },
];

export const invoices: InvoiceRow[] = [
  { id: "INV-2847", client: "MetroPress", amount: "₹2,48,000", gst: "₹44,640", status: "paid", date: "Mar 22" },
  { id: "INV-2846", client: "Apex Print Co.", amount: "₹1,24,000", gst: "₹22,320", status: "pending", date: "Mar 21" },
  { id: "INV-2845", client: "ColorCraft", amount: "₹82,000", gst: "₹14,760", status: "overdue", date: "Mar 15" },
  { id: "INV-2844", client: "SwiftLabel", amount: "₹56,400", gst: "₹10,152", status: "paid", date: "Mar 20" },
];

export const calendarEvents: CalendarEvent[] = [
  { id: "e1", title: "Press 1 — Brochure Run", date: 23, time: "09:00", color: "bg-indigo-500" },
  { id: "e2", title: "Client Meeting — PackPro", date: 23, time: "14:00", color: "bg-emerald-500" },
  { id: "e3", title: "Proof Review — ColorCraft", date: 24, time: "11:00", color: "bg-blue-500" },
  { id: "e4", title: "Press 2 Maintenance", date: 25, time: "08:00", color: "bg-amber-500" },
  { id: "e5", title: "Delivery — Vertex Graphics", date: 26, time: "16:00", color: "bg-violet-500" },
];

export const quotations = [
  { id: "QT-892", client: "PackPro Ltd.", amount: "₹3,45,000", status: "Sent", valid: "Apr 5" },
  { id: "QT-891", client: "Nova Prints", amount: "₹1,18,000", status: "Draft", valid: "Apr 3" },
  { id: "QT-890", client: "Elite Packaging", amount: "₹5,62,000", status: "Accepted", valid: "Mar 30" },
];

export const purchaseOrders = [
  { id: "PO-441", vendor: "PaperMart India", amount: "₹84,000", items: "Coated Paper 130gsm", status: "Ordered" },
  { id: "PO-440", vendor: "InkTech Supplies", amount: "₹32,500", items: "CMYK Ink Set x5", status: "Received" },
  { id: "PO-439", vendor: "PlateWorks", amount: "₹18,200", items: "A2 Plates x20", status: "Pending" },
];

export const gstSummary = {
  outputGst: "₹2,84,600",
  inputGst: "₹1,42,300",
  netPayable: "₹1,42,300",
  filingStatus: "GSTR-1 Pending",
  dueDate: "Apr 11",
};

export const reportCards = [
  { title: "Profitability Report", desc: "Margin analysis by job type", updated: "Today" },
  { title: "Press Utilization", desc: "Uptime and efficiency metrics", updated: "Today" },
  { title: "Customer Ledger", desc: "Outstanding receivables", updated: "Yesterday" },
  { title: "Inventory Valuation", desc: "Stock value and movement", updated: "Yesterday" },
  { title: "GST Summary", desc: "Tax liability breakdown", updated: "Mar 20" },
  { title: "Sales Pipeline", desc: "CRM conversion funnel", updated: "Today" },
];
