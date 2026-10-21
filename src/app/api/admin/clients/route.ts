import { NextResponse } from "next/server";
import { connectToDatabase } from "@/shared/lib/db";
import { ClientLogoModel } from "@/shared/lib/models/client-logo";
import { clientLogos as defaultClientLogos } from "@/shared/config/navigation";

// Fallback initial list
const DEFAULT_CLIENTS = defaultClientLogos.map((name, index) => ({
  name,
  logoUrl: "",
  order: index,
  isActive: true,
}));

export async function GET() {
  try {
    await connectToDatabase();
    let clients = await ClientLogoModel.find({}).sort({ order: 1, createdAt: 1 }).lean();

    // If database is empty, seed defaults
    if (!clients || clients.length === 0) {
      const seeded = await ClientLogoModel.insertMany(DEFAULT_CLIENTS);
      clients = seeded.map((item) => item.toObject());
    }

    return NextResponse.json({ success: true, clients });
  } catch (error) {
    console.error("Error fetching client logos:", error);
    return NextResponse.json({ success: true, clients: DEFAULT_CLIENTS });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, client, clients } = body;

    await connectToDatabase();

    // Batch update / reorder
    if (action === "reorder" && Array.isArray(clients)) {
      for (const item of clients) {
        if (item._id) {
          await ClientLogoModel.findByIdAndUpdate(item._id, {
            order: item.order,
            isActive: item.isActive,
          });
        }
      }
      const updatedList = await ClientLogoModel.find({}).sort({ order: 1, createdAt: 1 }).lean();
      return NextResponse.json({ success: true, clients: updatedList });
    }

    // Single create / update
    if (client) {
      const clientName = (client.name || "").trim();
      const clientLogoUrl = (client.logoUrl || "").trim();

      if (!clientName && !clientLogoUrl) {
        return NextResponse.json(
          { success: false, error: "Please provide either a client name or upload a logo" },
          { status: 400 }
        );
      }

      if (client._id) {
        const updated = await ClientLogoModel.findByIdAndUpdate(
          client._id,
          {
            name: clientName,
            logoUrl: clientLogoUrl,
            order: typeof client.order === "number" ? client.order : 0,
            isActive: client.isActive !== undefined ? client.isActive : true,
          },
          { new: true }
        );
        return NextResponse.json({ success: true, client: updated });
      } else {
        const count = await ClientLogoModel.countDocuments();
        const created = await ClientLogoModel.create({
          name: clientName,
          logoUrl: clientLogoUrl,
          order: typeof client.order === "number" ? client.order : count,
          isActive: true,
        });
        return NextResponse.json({ success: true, client: created });
      }
    }

    return NextResponse.json(
      { success: false, error: "Invalid action or payload" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error saving client logo:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save client logo" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing client ID" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    await ClientLogoModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting client logo:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete client logo" },
      { status: 500 }
    );
  }
}
