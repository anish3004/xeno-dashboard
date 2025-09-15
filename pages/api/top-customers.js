import prisma from "../../lib/prisma";
export default async function handler(req, res) {
  try {
    const rows = await prisma.$queryRaw`
      SELECT c.id, c."firstName", c."lastName", c.email, SUM(o."totalPrice") as total_spend
      FROM "Customer" c
      JOIN "Order" o ON o."customerId" = c.id
      GROUP BY c.id
      ORDER BY total_spend DESC
      LIMIT 5`;
    const top = rows.map(r => ({ id: r.id, name: `${r.firstName} ${r.lastName}`.trim() || r.email, email: r.email, total: Number(r.total_spend || 0) }));
    res.json({ top });
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
}