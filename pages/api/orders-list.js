// pages/api/orders-list.js
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    const orders = await prisma.order.findMany({
      include: { customer: true },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders list:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}
