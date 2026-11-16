"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Table as TableIcon,
  Undo2,
  Redo2,
  Upload,
  Maximize2,
  Minimize2,
  Trash2,
  FileCode,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Type or paste your article content here...",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [pdfLinkText, setPdfLinkText] = useState("Download PDF");
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [rawHtml, setRawHtml] = useState(value);

  // Sync incoming value to editor content if changed externally
  useEffect(() => {
    if (editorRef.current && !showSource) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
    setRawHtml(value || "");
  }, [value, showSource]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
      setRawHtml(html);
    }
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setRawHtml(newHtml);
    onChange(newHtml);
    if (editorRef.current) {
      editorRef.current.innerHTML = newHtml;
    }
  };

  // Execute standard rich text formatting command
  const exec = (command: string, val: string | undefined = undefined) => {
    if (showSource) return;
    editorRef.current?.focus();
    document.execCommand(command, false, val);
    handleInput();
  };

  // Upload PDF and insert formatted link in content
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      alert("File size exceeds 4MB limit.");
      return;
    }

    try {
      setUploadingPdf(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "documents");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        const linkHtml = `<p class="my-4"><a href="${data.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 transition" download>📄 ${pdfLinkText || file.name}</a></p><p><br></p>`;
        exec("insertHTML", linkHtml);
      } else {
        alert(data.error || "Failed to upload PDF");
      }
    } catch (err) {
      console.error("PDF upload error:", err);
      alert("PDF upload failed");
    } finally {
      setUploadingPdf(false);
      if (pdfInputRef.current) pdfInputRef.current.value = "";
    }
  };

  // Upload and insert inline image
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImg(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "blogs");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        const imgHtml = `<p class="my-4"><img src="${data.url}" alt="${file.name}" class="rounded-xl border border-gray-200 max-w-full h-auto my-2 shadow-xs" /></p><p><br></p>`;
        exec("insertHTML", imgHtml);
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Image upload failed");
    } finally {
      setUploadingImg(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  // Custom Link insertion prompt
  const handleInsertLink = () => {
    const url = prompt("Enter hyperlink URL (https://...):", "https://");
    if (url && url !== "https://") {
      exec("createLink", url);
    }
  };

  // Custom Table insertion
  const handleInsertTable = () => {
    const rows = prompt("Number of rows:", "3");
    const cols = prompt("Number of columns:", "3");
    const r = parseInt(rows || "3", 10);
    const c = parseInt(cols || "3", 10);

    if (isNaN(r) || isNaN(c) || r <= 0 || c <= 0) return;

    let tableHtml = `<div class="overflow-x-auto my-4"><table class="w-full border-collapse border border-gray-300 text-sm">`;
    for (let i = 0; i < r; i++) {
      tableHtml += `<tr class="${i === 0 ? "bg-gray-100 font-bold" : ""}">`;
      for (let j = 0; j < c; j++) {
        tableHtml += `<td class="border border-gray-300 p-2.5">${i === 0 ? `Header ${j + 1}` : `Data`}</td>`;
      }
      tableHtml += `</tr>`;
    }
    tableHtml += `</table></div><p><br></p>`;
    exec("insertHTML", tableHtml);
  };

  return (
    <div
      className={`rounded-2xl border border-border bg-card shadow-sm transition-all overflow-hidden ${
        isFullscreen ? "fixed inset-4 z-50 flex flex-col bg-card shadow-2xl" : "relative"
      }`}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. PDF UPLOAD BAR (Exact match to reference screenshot)       */}
      {/* ------------------------------------------------------------- */}
      <div className="border-b border-border bg-[#f8fafc] dark:bg-muted/30 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* PDF link text input */}
          <div className="flex-1 max-w-sm">
            <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              PDF link text
            </label>
            <input
              type="text"
              value={pdfLinkText}
              onChange={(e) => setPdfLinkText(e.target.value)}
              placeholder="Download PDF"
              className="w-full rounded-xl border border-gray-300 dark:border-border bg-white dark:bg-background px-3.5 py-2 text-xs font-medium text-foreground outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600"
            />
          </div>

          {/* Upload Button & Info */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={pdfInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handlePdfUpload}
            />
            <button
              type="button"
              onClick={() => pdfInputRef.current?.click()}
              disabled={uploadingPdf}
              className="flex items-center gap-2 rounded-xl bg-[#c9302c] hover:bg-[#ac2925] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition active:scale-[0.99] disabled:opacity-50"
            >
              <Upload className="size-4" />
              <span>{uploadingPdf ? "Uploading..." : "Upload PDF"}</span>
            </button>
            <span className="text-xs text-muted-foreground">
              PDF up to 4MB — inserts a download link in content
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. CKEDITOR STYLE MULTI-ROW TOOLBAR                          */}
      {/* ------------------------------------------------------------- */}
      <div className="border-b border-border bg-[#f1f5f9] dark:bg-muted/40 p-2.5 select-none space-y-2">
        {/* ROW 1: Source, Undo, Redo, Formatting, Alignment, Links */}
        <div className="flex flex-wrap items-center gap-1">
          {/* Source toggle */}
          <button
            type="button"
            onClick={() => setShowSource(!showSource)}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold border transition ${
              showSource
                ? "bg-brand text-brand-foreground border-brand"
                : "border-gray-300 dark:border-border bg-white dark:bg-card text-foreground hover:bg-muted"
            }`}
            title="Toggle HTML Source"
          >
            <FileCode className="size-3.5" />
            <span>Source</span>
          </button>

          <span className="h-4 w-px bg-gray-300 dark:bg-border mx-1" />

          {/* Undo / Redo */}
          <button
            type="button"
            onClick={() => exec("undo")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground transition"
            title="Undo"
          >
            <Undo2 className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("redo")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground transition"
            title="Redo"
          >
            <Redo2 className="size-3.5" />
          </button>

          <span className="h-4 w-px bg-gray-300 dark:bg-border mx-1" />

          {/* Bold, Italic, Underline, Strikethrough */}
          <button
            type="button"
            onClick={() => exec("bold")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground font-bold transition"
            title="Bold (Ctrl+B)"
          >
            <Bold className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("italic")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground italic transition"
            title="Italic (Ctrl+I)"
          >
            <Italic className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("underline")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground underline transition"
            title="Underline (Ctrl+U)"
          >
            <Underline className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("strikeThrough")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground line-through transition"
            title="Strikethrough"
          >
            <Strikethrough className="size-3.5" />
          </button>

          <span className="h-4 w-px bg-gray-300 dark:bg-border mx-1" />

          {/* Subscript & Superscript */}
          <button
            type="button"
            onClick={() => exec("subscript")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground transition"
            title="Subscript"
          >
            <Subscript className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("superscript")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground transition"
            title="Superscript"
          >
            <Superscript className="size-3.5" />
          </button>

          <span className="h-4 w-px bg-gray-300 dark:bg-border mx-1" />

          {/* Bullet & Number Lists */}
          <button
            type="button"
            onClick={() => exec("insertUnorderedList")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground transition"
            title="Bullet List"
          >
            <List className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("insertOrderedList")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground transition"
            title="Numbered List"
          >
            <ListOrdered className="size-3.5" />
          </button>

          <span className="h-4 w-px bg-gray-300 dark:bg-border mx-1" />

          {/* Alignments */}
          <button
            type="button"
            onClick={() => exec("justifyLeft")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground transition"
            title="Align Left"
          >
            <AlignLeft className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyCenter")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground transition"
            title="Align Center"
          >
            <AlignCenter className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyRight")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground transition"
            title="Align Right"
          >
            <AlignRight className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyFull")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground transition"
            title="Justify"
          >
            <AlignJustify className="size-3.5" />
          </button>

          <span className="h-4 w-px bg-gray-300 dark:bg-border mx-1" />

          {/* Quote & Clean Format */}
          <button
            type="button"
            onClick={() => exec("formatBlock", "<blockquote>")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground transition"
            title="Blockquote"
          >
            <Quote className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("removeFormat")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground transition"
            title="Clear Formatting"
          >
            <Trash2 className="size-3.5" />
          </button>

          {/* Link / Unlink */}
          <button
            type="button"
            onClick={handleInsertLink}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground transition"
            title="Insert Link"
          >
            <LinkIcon className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("unlink")}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground transition"
            title="Remove Link"
          >
            <Unlink className="size-3.5" />
          </button>
        </div>

        {/* ROW 2: Styles, Headings, Font, Size, Media Insert, Table, Fullscreen */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-200 dark:border-border/60">
          {/* Format (H1, H2, H3, P) Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="text-[11px] font-semibold">Format:</span>
            <select
              onChange={(e) => exec("formatBlock", e.target.value)}
              defaultValue="<p>"
              className="rounded border border-gray-300 dark:border-border bg-white dark:bg-card px-2 py-1 text-xs text-foreground outline-none focus:border-brand"
            >
              <option value="<p>">Normal (Paragraph)</option>
              <option value="<h2>">Heading 2</option>
              <option value="<h3>">Heading 3</option>
              <option value="<h4>">Heading 4</option>
              <option value="<pre>">Formatted Code</option>
            </select>
          </div>

          {/* Font Size Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="text-[11px] font-semibold">Size:</span>
            <select
              onChange={(e) => exec("fontSize", e.target.value)}
              defaultValue="3"
              className="rounded border border-gray-300 dark:border-border bg-white dark:bg-card px-2 py-1 text-xs text-foreground outline-none focus:border-brand"
            >
              <option value="1">Small</option>
              <option value="3">Normal</option>
              <option value="4">Medium</option>
              <option value="5">Large</option>
              <option value="6">X-Large</option>
            </select>
          </div>

          <span className="h-4 w-px bg-gray-300 dark:bg-border mx-1" />

          {/* Insert Image from Computer */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            disabled={uploadingImg}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-white dark:hover:bg-card hover:text-foreground transition"
            title="Upload and Insert Image"
          >
            <ImageIcon className="size-3.5 text-brand" />
            <span>{uploadingImg ? "Uploading..." : "Image"}</span>
          </button>

          {/* Insert Table */}
          <button
            type="button"
            onClick={handleInsertTable}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-white dark:hover:bg-card hover:text-foreground transition"
            title="Insert Table"
          >
            <TableIcon className="size-3.5 text-brand" />
            <span>Table</span>
          </button>

          <span className="h-4 w-px bg-gray-300 dark:bg-border mx-1" />

          {/* Fullscreen toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="ml-auto p-1.5 rounded-md hover:bg-white dark:hover:bg-card text-muted-foreground hover:text-foreground transition"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. EDITABLE CONTENT AREA                                     */}
      {/* ------------------------------------------------------------- */}
      {showSource ? (
        <textarea
          value={rawHtml}
          onChange={handleSourceChange}
          placeholder="Paste or write raw HTML code here..."
          className="w-full min-h-[350px] p-5 font-mono text-xs text-foreground bg-slate-950 text-slate-100 outline-none resize-y leading-relaxed"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          placeholder={placeholder}
          className={`w-full min-h-[360px] p-6 text-sm text-foreground bg-white dark:bg-card outline-none leading-relaxed overflow-y-auto focus:ring-0 ${
            isFullscreen ? "flex-1" : ""
          }`}
          style={{ minHeight: isFullscreen ? "auto" : "360px" }}
        />
      )}
    </div>
  );
}
