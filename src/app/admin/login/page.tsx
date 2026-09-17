import { Metadata } from "next";
import { AdminLoginScreen } from "@/widgets/admin";

export const metadata: Metadata = {
  title: "Admin Login - PrintoSync",
  description: "Login to the PrintoSync Admin Panel",
};

export default function AdminLoginPage() {
  return <AdminLoginScreen />;
}
