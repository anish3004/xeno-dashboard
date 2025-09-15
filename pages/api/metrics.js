// pages/api/metrics.js
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    // total customers
    const totalCustomers = await prisma.customer.count();

    // total orders
    const totalOrders = await prisma.order.count();

    // total revenue
    const totalRevenueResult = await prisma.order.aggregate({
      _sum: { totalPrice: true },
    });
    const totalRevenue = totalRevenueResult._sum.totalPrice || 0;

    // revenue by date (last 30 days)
    const revenueByDate = await prisma.$queryRaw`
      SELECT DATE("createdAt") as date, SUM("totalPrice") as revenue
      FROM "Order"
      WHERE "createdAt" >= NOW() - INTERVAL '30 days'
      GROUP BY DATE("createdAt")
      ORDER BY DATE("createdAt");
    `;

    // top 5 customers by spend
    const topCustomers = await prisma.$queryRaw`
      SELECT c.id, c."firstName", c."lastName", c.email, SUM(o."totalPrice") as spend
      FROM "Order" o
      JOIN "Customer" c ON o."customerId" = c.id
      GROUP BY c.id, c."firstName", c."lastName", c.email
      ORDER BY spend DESC
      LIMIT 5;
    `;

    res.status(200).json({
      totalCustomers,
      totalOrders,
      totalRevenue,
      revenueByDate: revenueByDate.map((r) => ({
        date: r.date,
        revenue: Number(r.revenue),
      })),
      topCustomers: topCustomers.map((c) => ({
        id: c.id,
        name: `${c.firstName} ${c.lastName}`.trim() || c.email,
        email: c.email,
        spend: Number(c.spend),
      })),
    });
  } catch (err) {
    console.error("Error fetching metrics:", err);
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
}
