import { useEffect, useState } from "react"; import Layout from "../../components/Layout"; import MetricCard from "../../components/MetricCard"; import OrdersChart from "../../components/OrdersChart"; import TopCustomersChart from "../../components/TopCustomersChart"; import { useSession, getSession } from "next-auth/react";
export default function Dashboard() {
  const { data: session } = useSession();
  const [metrics, setMetrics] = useState({ totalCustomers: 0, totalOrders: 0, totalRevenue: 0 });
  const [series, setSeries] = useState([]); const [top, setTop] = useState([]);
  useEffect(() => { fetch('/api/metrics').then(r => r.json()).then(setMetrics);
    fetch('/api/orders').then(r => r.json()).then(d => setSeries(d.series || []));
    fetch('/api/top-customers').then(r => r.json()).then(d => setTop(d.top || []));
  }, []);
  return (<Layout><div className="space-y-6"><div className="grid grid-cols-3 gap-6">
    <MetricCard title="Customers" value={metrics.totalCustomers} subtitle="Total" />
    <MetricCard title="Orders" value={metrics.totalOrders} subtitle="Total" />
    <MetricCard title="Revenue" value={`₹${Number(metrics.totalRevenue).toFixed(2)}`} subtitle="Since start" />
  </div><div className="grid grid-cols-2 gap-6"><OrdersChart data={series} /><TopCustomersChart data={top} /></div></div></Layout>);
}
export async function getServerSideProps(ctx) { const session = await getSession(ctx); if (!session) return { redirect: { destination: '/auth/signin', permanent: false } }; return { props: {} }; }