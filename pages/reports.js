// pages/reports.js
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ReportsPage() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    async function loadMetrics() {
      const res = await fetch("/api/metrics");
      const data = await res.json();
      setMetrics(data);
    }
    loadMetrics();
  }, []);

  if (!metrics) return <div className="p-6">Loading reports...</div>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Business Reports</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Total Customers</h2>
          <p className="text-2xl font-bold text-indigo-600">
            {metrics.totalCustomers}
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold text-indigo-600">
            {metrics.totalOrders}
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl font-bold text-green-600">
            ₹{metrics?.totalRevenue ? metrics.totalRevenue.toFixed(2) : "0.00"}
          </p>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Revenue (Last 30 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics.revenueByDate}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4f46e5"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Customers */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Top 5 Customers</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Total Spend</th>
            </tr>
          </thead>
          <tbody>
            {metrics.topCustomers.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.email}</td>
                <td className="p-2 border">₹{c.spend.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
