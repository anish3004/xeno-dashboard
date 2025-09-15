// pages/customers.js
import { useEffect, useState } from "react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/customers");
      const data = await res.json();
      setCustomers(data || []);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Customers</h1>
      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Joined</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="p-2 border">
                {c.firstName} {c.lastName}
              </td>
              <td className="p-2 border">{c.email}</td>
              <td className="p-2 border">
                {new Date(c.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
