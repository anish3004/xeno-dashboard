import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
export default function OrdersChart({ data }) {
  return (<div className="p-6 rounded-2xl bg-white shadow h-80"><h3 className="text-sm text-gray-500 mb-4">Revenue by date</h3><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Line type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer></div>);
}