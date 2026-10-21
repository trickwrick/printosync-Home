import { Metadata } from "next";
import { AdminDashboard } from "@/widgets/admin";

export const metadata: Metadata = {
  title: "Admin Dashboard - PrintoSync",
  description: "Manage your PrintoSync operations",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
