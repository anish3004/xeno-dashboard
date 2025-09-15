import prisma from "../../lib/prisma";
export default async function handler(req, res) {
  try {
    const { start, end } = req.query;
    let where = {};
    if (start || end) {
      where.createdAt = {};
      if (start) where.createdAt.gte = new Date(start);
      if (end) where.createdAt.lte = new Date(end);
    }
    const orders = await prisma.order.findMany({ where, select: { createdAt: true, totalPrice: true }, orderBy: { createdAt: 'asc' } });
    const map = {};
    for (const o of orders) {
      const d = o.createdAt.toISOString().slice(0,10);
      map[d] = (map[d] || 0) + Number(o.totalPrice || 0);
    }
    const series = Object.keys(map).sort().map(date => ({ date, revenue: map[date] }));
    res.json({ series });
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
}