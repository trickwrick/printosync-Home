"use client";

import { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  Trash2,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  Clock,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

export interface InquiryItem {
  id: string;
  type: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  pressType?: string;
  city?: string;
  state?: string;
  message: string;
  date: string;
  status: "new" | "in-progress" | "completed" | "archived";
}

export function InquiriesManager() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries);
        if (data.inquiries.length > 0 && !selectedInquiry) {
          setSelectedInquiry(data.inquiries[0]);
        }
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateStatus = async (id: string, status: InquiryItem["status"]) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries);
        if (selectedInquiry?.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status });
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries);
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(data.inquiries[0] || null);
        }
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.company.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      (inq.phone && inq.phone.includes(search));

    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Customer Inquiries & Leads
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage incoming demo requests, quote inquiries, and customer contact submissions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchInquiries}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted"
          >
            <RefreshCw className="size-3.5" />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-card p-3 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, company, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-background py-2 pl-9.5 pr-4 text-xs font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["all", "new", "in-progress", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                statusFilter === tab
                  ? "bg-brand text-brand-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {tab === "all" ? `All (${inquiries.length})` : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center bg-card/40">
          <Inbox className="mx-auto size-12 text-muted-foreground/40" />
          <h3 className="mt-4 font-semibold text-foreground text-sm">No Inquiries Found</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {search ? "No inquiries matching your search." : "New leads from contact and demo forms will appear here."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* List of Inquiries (Left Column) */}
          <div className="lg:col-span-5 space-y-2.5 max-h-170 overflow-y-auto pr-1">
            {filtered.map((item) => {
              const isSelected = selectedInquiry?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedInquiry(item)}
                  className={`group cursor-pointer rounded-xl border p-4 transition-all ${
                    isSelected
                      ? "border-brand bg-brand-muted/20 shadow-xs ring-1 ring-brand/30"
                      : "border-border bg-card hover:border-brand/30 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                        {item.type}
                      </span>
                      <h4 className="font-semibold text-foreground text-sm leading-tight mt-0.5">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">
                        {item.company}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold capitalize shrink-0 ${
                        item.status === "new"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                          : item.status === "in-progress"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                    {item.message}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/50 pt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                    {item.city && (
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3 text-brand" />
                        {item.city}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Inquiry Detail View (Right Column) */}
          <div className="lg:col-span-7">
            {selectedInquiry ? (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs sticky top-24">
                <div className="flex items-start justify-between border-b border-border pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-brand/10 px-2.5 py-1 text-xs font-bold text-brand border border-brand/20">
                        {selectedInquiry.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ID: {selectedInquiry.id}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold text-foreground">
                      {selectedInquiry.name}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">
                      {selectedInquiry.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(selectedInquiry.id)}
                      className="rounded-xl border border-border p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                      title="Delete"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Status Toggle Bar */}
                <div className="mt-5 flex items-center justify-between rounded-xl bg-muted/60 p-2.5 text-xs">
                  <span className="font-semibold text-foreground">Lead Status:</span>
                  <div className="flex gap-1.5">
                    {(["new", "in-progress", "completed"] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold capitalize transition ${
                          selectedInquiry.status === st
                            ? "bg-brand text-brand-foreground shadow-xs"
                            : "bg-background text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Information Cards */}
                <div className="mt-5 grid gap-3 sm:grid-cols-2 text-xs">
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="flex items-center gap-2.5 rounded-xl border border-border bg-background p-3 font-medium text-foreground hover:border-brand/40 transition group"
                  >
                    <Mail className="size-4 text-brand shrink-0" />
                    <span className="truncate">{selectedInquiry.email}</span>
                    <ExternalLink className="size-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100" />
                  </a>

                  {selectedInquiry.phone ? (
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="flex items-center gap-2.5 rounded-xl border border-border bg-background p-3 font-medium text-foreground hover:border-brand/40 transition group"
                    >
                      <Phone className="size-4 text-brand shrink-0" />
                      <span>{selectedInquiry.phone}</span>
                      <ExternalLink className="size-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-2.5 rounded-xl border border-border bg-background p-3 text-muted-foreground">
                      <Phone className="size-4 shrink-0" />
                      <span>Not provided</span>
                    </div>
                  )}

                  {selectedInquiry.pressType && (
                    <div className="flex items-center gap-2.5 rounded-xl border border-border bg-background p-3 text-foreground font-medium sm:col-span-2">
                      <Building className="size-4 text-brand shrink-0" />
                      <span>Press Type: {selectedInquiry.pressType}</span>
                    </div>
                  )}

                  {selectedInquiry.city && (
                    <div className="flex items-center gap-2.5 rounded-xl border border-border bg-background p-3 text-foreground font-medium sm:col-span-2">
                      <MapPin className="size-4 text-brand shrink-0" />
                      <span>Location: {selectedInquiry.city}, {selectedInquiry.state || "India"}</span>
                    </div>
                  )}
                </div>

                {/* Inquiry Message */}
                <div className="mt-5 rounded-xl border border-border bg-background p-4">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Inquiry Details / Message
                  </span>
                  <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </p>
                </div>

                {/* Submission Timestamp */}
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/60">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-brand" />
                    Received: {new Date(selectedInquiry.date).toLocaleString()}
                  </span>
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Regarding your PrintoSync Enquiry&body=Hi ${selectedInquiry.name},\n\nThank you for reaching out to PrintoSync regarding ${selectedInquiry.company}.`}
                    className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
                  >
                    Reply via Email &rarr;
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card/40 p-12 text-center">
                <p className="text-sm text-muted-foreground">Select an inquiry to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
