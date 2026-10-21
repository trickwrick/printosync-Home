"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Building2,
  Plus,
  Trash2,
  Edit2,
  Upload,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  X,
  ExternalLink,
} from "lucide-react";

export interface ClientLogoItem {
  _id?: string;
  name: string;
  logoUrl?: string;
  order: number;
  isActive: boolean;
}

export function ClientsManager() {
  const [clients, setClients] = useState<ClientLogoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  // Edit / Add modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientLogoItem | null>(null);
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      if (data.success && Array.isArray(data.clients)) {
        setClients(data.clients);
      }
    } catch (err) {
      console.error("Failed to load clients:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingClient(null);
    setName("");
    setLogoUrl("");
    setIsActive(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (client: ClientLogoItem) => {
    setEditingClient(client);
    setName(client.name);
    setLogoUrl(client.logoUrl || "");
    setIsActive(client.isActive !== false);
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setLogoUrl(data.url);
      } else {
        alert(data.error || "Image upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !logoUrl.trim()) {
      alert("Please upload a photo/logo or enter a print shop name");
      return;
    }

    try {
      setStatus("saving");
      const payload: Partial<ClientLogoItem> = {
        name: name.trim(),
        logoUrl: logoUrl.trim(),
        isActive,
      };

      if (editingClient?._id) {
        payload._id = editingClient._id;
        payload.order = editingClient.order;
      }

      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client: payload }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("saved");
        setMessage(editingClient ? "Client updated successfully!" : "Client added successfully!");
        setModalOpen(false);
        fetchClients();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        throw new Error(data.error || "Save failed");
      }
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Error saving client");
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to remove this client?")) return;

    try {
      const res = await fetch(`/api/admin/clients?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setClients((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete client");
    }
  };

  const handleToggleActive = async (client: ClientLogoItem) => {
    try {
      const updated = { ...client, isActive: !client.isActive };
      setClients((prev) =>
        prev.map((c) => (c._id === client._id ? updated : c))
      );

      await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client: updated }),
      });
    } catch (err) {
      console.error("Toggle error:", err);
      fetchClients();
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= clients.length) return;

    const newClients = [...clients];
    const temp = newClients[index];
    newClients[index] = newClients[targetIndex];
    newClients[targetIndex] = temp;

    // reassign order indices
    const reordered = newClients.map((item, idx) => ({
      ...item,
      order: idx,
    }));

    setClients(reordered);

    try {
      await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reorder", clients: reordered }),
      });
    } catch (err) {
      console.error("Reorder error:", err);
      fetchClients();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="size-5 text-brand" />
            <h2 className="text-lg font-bold text-foreground">
              &quot;Trusted by leading print shops&quot; Logos
            </h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Manage client logos, shop names, and brand photos appearing in the hero banner ticker.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-brand-foreground shadow-sm hover:opacity-90 transition"
          >
            <Plus className="size-4" />
            Add New Client
          </button>
        </div>
      </div>

      {/* Status banner */}
      {status === "saved" && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-medium text-emerald-400">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-xs font-medium text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Clients List */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="border-b border-border bg-muted/40 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span>Clients &amp; Logos ({clients.length})</span>
          <span className="text-[11px] normal-case font-normal text-muted-foreground">
            Live preview matches website ticker
          </span>
        </div>

        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="size-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          </div>
        ) : clients.length === 0 ? (
          <div className="p-12 text-center">
            <Building2 className="mx-auto mb-3 size-10 text-muted-foreground/40" />
            <p className="text-sm font-semibold text-foreground">No clients added yet</p>
            <p className="mt-1 text-xs text-muted-foreground">Click &quot;Add New Client&quot; above to add your first print shop logo.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {clients.map((client, idx) => (
              <div
                key={client._id || idx}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 transition hover:bg-muted/30 ${
                  client.isActive === false ? "opacity-60 bg-muted/20" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-1 text-muted-foreground">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, "up")}
                      className="p-1 hover:text-foreground disabled:opacity-20 transition"
                      title="Move up"
                    >
                      <MoveUp className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === clients.length - 1}
                      onClick={() => handleMove(idx, "down")}
                      className="p-1 hover:text-foreground disabled:opacity-20 transition"
                      title="Move down"
                    >
                      <MoveDown className="size-3.5" />
                    </button>
                  </div>

                  {/* Client Photo / Logo */}
                  <div className="size-12 shrink-0 rounded-xl border border-border bg-surface flex items-center justify-center overflow-hidden p-1 shadow-sm">
                    {client.logoUrl ? (
                      <Image
                        src={client.logoUrl}
                        alt={client.name}
                        width={44}
                        height={44}
                        className="max-h-full max-w-full object-contain"
                        unoptimized
                      />
                    ) : (
                      <Building2 className="size-5 text-muted-foreground/60" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">
                        {client.name || <span className="italic text-muted-foreground">Logo only</span>}
                      </p>
                      {client.isActive === false && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground truncate max-w-md">
                      {client.logoUrl ? (
                        <span className="font-mono text-[11px] text-brand/80">{client.logoUrl}</span>
                      ) : (
                        <span className="italic">No photo uploaded (Text badge only)</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:self-center self-end">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(client)}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    title={client.isActive === false ? "Show in ticker" : "Hide from ticker"}
                  >
                    {client.isActive === false ? <EyeOff className="size-4" /> : <Eye className="size-4 text-brand" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(client)}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition"
                    title="Edit name or photo"
                  >
                    <Edit2 className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(client._id)}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                    title="Delete"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-base font-bold text-foreground">
                {editingClient ? "Edit Client / Press" : "Add Client / Press"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Print Shop / Client Name <span className="font-normal text-muted-foreground">(Optional if logo is uploaded)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Print Co. or leave empty for logo only"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-medium text-foreground outline-none transition focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Photo / Logo
                </label>

                <div className="flex items-center gap-3">
                  {/* Preview box */}
                  <div className="size-16 shrink-0 rounded-xl border border-border bg-surface flex items-center justify-center overflow-hidden p-1 shadow-inner">
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt="Logo Preview"
                        width={60}
                        height={60}
                        className="max-h-full max-w-full object-contain"
                        unoptimized
                      />
                    ) : (
                      <Building2 className="size-6 text-muted-foreground/40" />
                    )}
                  </div>

                  <div className="space-y-2 flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="client-file-upload"
                    />
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="client-file-upload"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-muted/60 px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition"
                      >
                        <Upload className="size-3.5 text-brand" />
                        {uploading ? "Uploading..." : "Upload Photo / Logo"}
                      </label>

                      {logoUrl && (
                        <button
                          type="button"
                          onClick={() => setLogoUrl("")}
                          className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/20 transition"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <p className="text-[11px] text-muted-foreground">
                      PNG, SVG, JPG, WebP supported (direct from PC)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="client-active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded border-border text-brand focus:ring-brand"
                />
                <label htmlFor="client-active" className="text-xs font-medium text-foreground cursor-pointer">
                  Display actively on website ticker
                </label>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-brand-foreground shadow-sm hover:opacity-90 disabled:opacity-50 transition"
                >
                  {editingClient ? "Save Changes" : "Add Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
