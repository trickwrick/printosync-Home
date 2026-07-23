"use client";

import { cn } from "@/shared/lib/cn";
import type { OrderRow } from "../types";

const statusStyles: Record<string, string> = {
  "In Production": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Proofing: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Delivered: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Queued: "bg-slate-500/15 text-slate-400 border-slate-500/20",
  Paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Overdue: "bg-red-500/15 text-red-400 border-red-500/20",
  active: "bg-emerald-500/15 text-emerald-400",
  lead: "bg-blue-500/15 text-blue-400",
  inactive: "bg-slate-500/15 text-slate-400",
  ok: "bg-emerald-500/15 text-emerald-400",
  low: "bg-amber-500/15 text-amber-400",
  critical: "bg-red-500/15 text-red-400",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2 py-0.5 text-[9px] font-medium capitalize",
        statusStyles[status] ?? "bg-white/10 text-white/50 border-white/10",
      )}
    >
      {status}
    </span>
  );
}

interface DataTableProps {
  columns: { key: string; label: string; className?: string }[];
  rows: Record<string, string>[];
  compact?: boolean;
}

export function DataTable({ columns, rows, compact }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[400px]">
        <thead>
          <tr className="border-b border-white/[0.06]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "pb-2 text-left text-[9px] font-semibold uppercase tracking-wider text-white/30",
                  compact ? "px-2" : "px-3",
                  col.className,
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-white/[0.03] transition-colors hover:bg-white/[0.03]"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "py-2 text-[10px] text-white/65",
                    compact ? "px-2" : "px-3",
                    col.className,
                  )}
                >
                  {col.key === "status" ? (
                    <StatusBadge status={row[col.key]} />
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ordersToRows(orders: OrderRow[]) {
  return orders.map((o) => ({
    id: o.id,
    client: o.client,
    job: o.job,
    status: o.status,
    amount: o.amount,
    due: o.due,
  }));
}
