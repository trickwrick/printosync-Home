export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-brand/30 selection:text-brand">
      {children}
    </div>
  );
}
