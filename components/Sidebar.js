import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Anish-Retail Dashboard</h1>
      <nav className="flex flex-col gap-4">
        <Link href="/" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>

        {/*  Existing Customers page */}
        <Link href="/customers" className="hover:bg-gray-700 p-2 rounded">
          All Customers
        </Link>

        {/*  New Top Customers page */}
        <Link href="/top-customers" className="hover:bg-gray-700 p-2 rounded">
          Top Customers
        </Link>

        <Link href="/orders" className="hover:bg-gray-700 p-2 rounded">
          Orders
        </Link>

        <Link href="/reports" className="hover:bg-gray-700 p-2 rounded">
          Reports
        </Link>

        <Link href="/auth/signin" className="hover:bg-gray-700 p-2 rounded">
          Sign In
        </Link>
      </nav>
    </div>
  );
}
