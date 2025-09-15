import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
export default function TopCustomersChart({ data }) {
  return (<div className="p-6 rounded-2xl bg-white shadow h-72"><h3 className="text-sm text-gray-500 mb-4">Top customers by spend</h3><ResponsiveContainer width="100%" height="85%"><BarChart data={data} layout="vertical"><XAxis type="number" /><YAxis dataKey="name" type="category" width={160} /><Tooltip /><Bar dataKey="total" fill="#06b6d4" /></BarChart></ResponsiveContainer></div>);
}