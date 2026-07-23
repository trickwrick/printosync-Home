"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { DashboardModule } from "../types";
import {
  activities,
  calendarEvents,
  customers,
  dashboardStats,
  gstSummary,
  inventory,
  invoices,
  kanbanColumns,
  notifications,
  ordersChartData,
  pipelineStages,
  productionChartData,
  purchaseOrders,
  quotations,
  recentOrders,
  reportCards,
  revenueChartData,
} from "../data/mock-data";
import { ActivityTimeline } from "../components/activity-timeline";
import { AnimatedBarChart, AnimatedLineChart, DonutChart } from "../components/charts";
import { CalendarWidget } from "../components/calendar-widget";
import { DataTable, ordersToRows } from "../components/data-table";
import { GlassCard } from "../components/glass-card";
import { KanbanPanel } from "../components/kanban-board";
import { NotificationList } from "../components/notification-list";
import { StatCard } from "../components/stat-card";

interface ModuleViewsProps {
  module: DashboardModule;
  compact?: boolean;
}

export function ModuleViews({ module, compact }: ModuleViewsProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={module}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="h-full"
      >
        {module === "dashboard" && <OverviewView compact={compact} />}
        {module === "crm" && <CrmView compact={compact} />}
        {module === "customers" && <CustomersView compact={compact} />}
        {module === "orders" && <OrdersView compact={compact} />}
        {module === "production" && <ProductionView compact={compact} />}
        {module === "inventory" && <InventoryView compact={compact} />}
        {module === "invoices" && <InvoicesView compact={compact} />}
        {module === "gst" && <GstView compact={compact} />}
        {module === "quotation" && <QuotationView compact={compact} />}
        {module === "purchase" && <PurchaseView compact={compact} />}
        {module === "reports" && <ReportsView compact={compact} />}
        {module === "analytics" && <AnalyticsView compact={compact} />}
        {module === "charts" && <ChartsView compact={compact} />}
        {module === "calendar" && <CalendarView compact={compact} />}
        {module === "kanban" && <KanbanView compact={compact} />}
        {module === "notifications" && <NotificationsView compact={compact} />}
        {module === "timeline" && <TimelineView compact={compact} />}
      </motion.div>
    </AnimatePresence>
  );
}

function OverviewView({ compact }: { compact?: boolean }) {
  return (
    <div className="space-y-3">
      <div className={`grid gap-2 ${compact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"}`}>
        {dashboardStats.slice(0, compact ? 4 : 6).map((s, i) => (
          <StatCard key={s.label} stat={s} index={i} compact={compact} />
        ))}
      </div>
      <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"}`}>
        <GlassCard className={compact ? "" : "lg:col-span-2"} padding={compact ? "sm" : "md"}>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold text-white/70">Revenue Overview</p>
            <span className="text-[9px] text-white/30">Last 12 months</span>
          </div>
          <AnimatedBarChart data={revenueChartData} height={compact ? 80 : 120} />
        </GlassCard>
        {!compact && (
          <GlassCard padding="md">
            <p className="mb-3 text-[11px] font-semibold text-white/70">Job Distribution</p>
            <div className="flex items-center justify-center gap-4">
              <DonutChart
                segments={[
                  { value: 42, color: "#6366f1", label: "Offset" },
                  { value: 28, color: "#8b5cf6", label: "Digital" },
                  { value: 18, color: "#10b981", label: "Packaging" },
                  { value: 12, color: "#f59e0b", label: "Other" },
                ]}
              />
              <div className="space-y-1.5">
                {["Offset 42%", "Digital 28%", "Packaging 18%", "Other 12%"].map((l) => (
                  <p key={l} className="text-[9px] text-white/40">{l}</p>
                ))}
              </div>
            </div>
          </GlassCard>
        )}
      </div>
      <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}>
        <GlassCard padding={compact ? "sm" : "md"}>
          <p className="mb-2 text-[11px] font-semibold text-white/70">Recent Orders</p>
          <DataTable
            compact={compact}
            columns={[
              { key: "id", label: "Order" },
              { key: "client", label: "Client" },
              { key: "status", label: "Status" },
              { key: "amount", label: "Amount", className: "text-right" },
            ]}
            rows={ordersToRows(recentOrders.slice(0, compact ? 3 : 4))}
          />
        </GlassCard>
        {!compact ? (
          <ActivityTimeline items={activities} />
        ) : (
          <KanbanPanel columns={Object.fromEntries(Object.entries(kanbanColumns).slice(0, 3))} compact />
        )}
      </div>
    </div>
  );
}

function CrmView({ compact }: { compact?: boolean }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {pipelineStages.map((stage, i) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard hover padding="sm" className="text-center">
              <div className={`mx-auto mb-2 h-1 w-8 rounded-full ${stage.color}`} />
              <p className="text-lg font-bold text-white">{stage.count}</p>
              <p className="text-[10px] text-white/40">{stage.name}</p>
              <p className="mt-1 text-[9px] font-medium text-indigo-400">{stage.value}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
      <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-2"}`}>
        <GlassCard padding="md">
          <p className="mb-3 text-[11px] font-semibold text-white/70">Conversion Funnel</p>
          <AnimatedBarChart data={pipelineStages.map((s) => s.count)} color="from-violet-600 to-violet-400" height={compact ? 80 : 100} />
        </GlassCard>
        <GlassCard padding="md">
          <p className="mb-2 text-[11px] font-semibold text-white/70">Hot Leads</p>
          <div className="space-y-2">
            {customers.filter((c) => c.status === "lead").concat(customers.slice(0, 2)).map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-lg border border-white/[0.04] p-2 hover:bg-white/[0.03]">
                <div>
                  <p className="text-[11px] font-medium text-white/80">{c.name}</p>
                  <p className="text-[9px] text-white/35">{c.company}</p>
                </div>
                <span className="text-[10px] font-medium text-emerald-400">{c.revenue}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function CustomersView({ compact }: { compact?: boolean }) {
  return (
    <GlassCard padding={compact ? "sm" : "md"}>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-semibold text-white/70">Customer Directory</p>
        <span className="text-[9px] text-white/30">{customers.length} total</span>
      </div>
      <DataTable
        compact={compact}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Contact" },
          { key: "company", label: "Company" },
          { key: "orders", label: "Orders" },
          { key: "revenue", label: "Revenue" },
          { key: "status", label: "Status" },
        ]}
        rows={customers.map((c) => ({
          id: c.id,
          name: c.name,
          company: c.company,
          orders: String(c.orders),
          revenue: c.revenue,
          status: c.status,
        }))}
      />
    </GlassCard>
  );
}

function OrdersView({ compact }: { compact?: boolean }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {["All 47", "Production 18", "Proofing 8", "Delivered 21"].map((f, i) => (
          <button
            key={f}
            type="button"
            className={`rounded-lg border px-2 py-1.5 text-[10px] font-medium transition-colors ${
              i === 0 ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-300" : "border-white/[0.06] text-white/40 hover:bg-white/[0.03]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <GlassCard padding={compact ? "sm" : "md"}>
        <DataTable
          compact={compact}
          columns={[
            { key: "id", label: "Order" },
            { key: "client", label: "Client" },
            { key: "job", label: "Job" },
            { key: "status", label: "Status" },
            { key: "amount", label: "Amount" },
            { key: "due", label: "Due" },
          ]}
          rows={ordersToRows(recentOrders)}
        />
      </GlassCard>
    </div>
  );
}

function ProductionView({ compact }: { compact?: boolean }) {
  return <KanbanPanel columns={kanbanColumns} compact={compact} />;
}

function InventoryView({ compact }: { compact?: boolean }) {
  return (
    <GlassCard padding={compact ? "sm" : "md"}>
      <DataTable
        compact={compact}
        columns={[
          { key: "sku", label: "SKU" },
          { key: "name", label: "Material" },
          { key: "stock", label: "Stock" },
          { key: "reorder", label: "Reorder" },
          { key: "unit", label: "Unit" },
          { key: "status", label: "Status" },
        ]}
        rows={inventory.map((i) => ({
          sku: i.sku,
          name: i.name,
          stock: String(i.stock),
          reorder: String(i.reorder),
          unit: i.unit,
          status: i.status,
        }))}
      />
    </GlassCard>
  );
}

function InvoicesView({ compact }: { compact?: boolean }) {
  return (
    <GlassCard padding={compact ? "sm" : "md"}>
      <DataTable
        compact={compact}
        columns={[
          { key: "id", label: "Invoice" },
          { key: "client", label: "Client" },
          { key: "amount", label: "Amount" },
          { key: "gst", label: "GST" },
          { key: "status", label: "Status" },
          { key: "date", label: "Date" },
        ]}
        rows={invoices.map((i) => ({ ...i, status: i.status.charAt(0).toUpperCase() + i.status.slice(1) }))}
      />
    </GlassCard>
  );
}

function GstView({ compact }: { compact?: boolean }) {
  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-2"}`}>
      <GlassCard padding="md" className="space-y-4">
        <p className="text-[11px] font-semibold text-white/70">GST Summary — March 2026</p>
        {[
          { label: "Output GST", value: gstSummary.outputGst },
          { label: "Input GST Credit", value: gstSummary.inputGst },
          { label: "Net Payable", value: gstSummary.netPayable, highlight: true },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between border-b border-white/[0.04] pb-2">
            <span className="text-[10px] text-white/40">{row.label}</span>
            <span className={`text-sm font-semibold ${row.highlight ? "text-indigo-400" : "text-white"}`}>{row.value}</span>
          </div>
        ))}
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3">
          <p className="text-[10px] font-medium text-amber-400">{gstSummary.filingStatus}</p>
          <p className="text-[9px] text-white/35">Due: {gstSummary.dueDate}</p>
        </div>
      </GlassCard>
      <GlassCard padding="md">
        <p className="mb-3 text-[11px] font-semibold text-white/70">Tax Breakdown</p>
        <AnimatedBarChart data={[18, 12, 8, 22, 15, 28]} color="from-emerald-600 to-emerald-400" height={compact ? 80 : 120} />
      </GlassCard>
    </div>
  );
}

function QuotationView({ compact }: { compact?: boolean }) {
  return (
    <GlassCard padding={compact ? "sm" : "md"}>
      <DataTable
        compact={compact}
        columns={[
          { key: "id", label: "Quote" },
          { key: "client", label: "Client" },
          { key: "amount", label: "Amount" },
          { key: "status", label: "Status" },
          { key: "valid", label: "Valid Until" },
        ]}
        rows={quotations}
      />
    </GlassCard>
  );
}

function PurchaseView({ compact }: { compact?: boolean }) {
  return (
    <GlassCard padding={compact ? "sm" : "md"}>
      <DataTable
        compact={compact}
        columns={[
          { key: "id", label: "PO" },
          { key: "vendor", label: "Vendor" },
          { key: "items", label: "Items" },
          { key: "amount", label: "Amount" },
          { key: "status", label: "Status" },
        ]}
        rows={purchaseOrders}
      />
    </GlassCard>
  );
}

function ReportsView({ compact }: { compact?: boolean }) {
  return (
    <div className={`grid gap-2 ${compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 lg:grid-cols-3"}`}>
      {reportCards.map((r, i) => (
        <motion.button
          key={r.title}
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -2 }}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition-colors hover:border-indigo-500/20 hover:bg-indigo-500/[0.04]"
        >
          <p className="text-[11px] font-semibold text-white/80">{r.title}</p>
          <p className="mt-1 text-[9px] text-white/35">{r.desc}</p>
          <p className="mt-3 text-[8px] text-white/25">Updated {r.updated}</p>
        </motion.button>
      ))}
    </div>
  );
}

function AnalyticsView({ compact }: { compact?: boolean }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {dashboardStats.slice(0, 4).map((s, i) => (
          <StatCard key={s.label} stat={s} index={i} compact />
        ))}
      </div>
      <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-2"}`}>
        <GlassCard padding="md">
          <p className="mb-2 text-[11px] font-semibold text-white/70">Order Volume</p>
          <AnimatedLineChart data={ordersChartData} height={compact ? 70 : 100} />
        </GlassCard>
        <GlassCard padding="md">
          <p className="mb-2 text-[11px] font-semibold text-white/70">Press Utilization</p>
          <AnimatedLineChart data={productionChartData} color="#10b981" height={compact ? 70 : 100} />
        </GlassCard>
      </div>
    </div>
  );
}

function ChartsView({ compact }: { compact?: boolean }) {
  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-2"}`}>
      {[
        { title: "Revenue", data: revenueChartData, color: "from-indigo-600 to-indigo-400" },
        { title: "Orders", data: ordersChartData, color: "from-violet-600 to-violet-400" },
        { title: "Production", data: productionChartData, color: "from-emerald-600 to-emerald-400" },
        { title: "Margins", data: [72, 68, 75, 70, 78, 82, 76, 85, 80, 88, 84, 90], color: "from-amber-600 to-amber-400" },
      ].slice(0, compact ? 2 : 4).map((chart) => (
        <GlassCard key={chart.title} padding="md">
          <p className="mb-3 text-[11px] font-semibold text-white/70">{chart.title}</p>
          <AnimatedBarChart data={chart.data} color={chart.color} height={compact ? 80 : 110} />
        </GlassCard>
      ))}
    </div>
  );
}

function CalendarView({ compact }: { compact?: boolean }) {
  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}>
      <CalendarWidget events={calendarEvents} compact={compact} />
      {!compact && <ActivityTimeline items={activities.slice(0, 5)} />}
    </div>
  );
}

function KanbanView({ compact }: { compact?: boolean }) {
  return <KanbanPanel columns={kanbanColumns} compact={compact} />;
}

function NotificationsView({ compact }: { compact?: boolean }) {
  return <NotificationList items={notifications} compact={compact} />;
}

function TimelineView({ compact }: { compact?: boolean }) {
  return <ActivityTimeline items={activities} compact={compact} />;
}
