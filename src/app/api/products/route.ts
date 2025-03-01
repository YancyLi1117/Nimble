import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url); // 👈 获取查询参数
    const category = searchParams.get("category"); // 👈 读取 category 参数
    console.log("🔍 API 请求参数:", category);

    const products = await prisma.products.findMany({
      where: category ? { category: category } : {}, // 👈 只有 category 存在时才筛选
    });

    console.log("✅ 查询到的数据:", products);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("❌ 数据库查询失败:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
