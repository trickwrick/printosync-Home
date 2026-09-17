import { Metadata } from "next";
import { AdminDashboard } from "@/widgets/admin";

export const metadata: Metadata = {
  title: "Admin Dashboard - PrintoSync",
  description: "Manage your PrintoSync operations",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
