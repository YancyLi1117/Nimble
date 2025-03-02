import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma"; // Ensure Prisma is properly imported

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params; // ✅ Unwrap params properly

    const product = await prisma.products.findUnique({
      where: { id: Number(id) }, // ✅ Use the unwrapped `id`
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
