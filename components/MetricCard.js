export default function MetricCard({ title, value, subtitle, accent }) {
  return (<div className="p-5 rounded-2xl bg-white shadow"><div className="flex items-start justify-between"><div><h3 className="text-sm text-gray-500">{title}</h3><p className="mt-2 text-2xl font-semibold">{value}</p></div>
  <div className={`text-sm font-semibold ${accent || 'text-indigo-600'}`}>{subtitle}</div></div></div>);
}