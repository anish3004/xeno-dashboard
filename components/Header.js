import { signOut, useSession } from "next-auth/react";
export default function Header() {
  const { data: session } = useSession();
  return (<header className="flex items-center justify-between px-6 py-4 border-b bg-white"><div><h1 className="text-lg font-semibold">Overview</h1><p className="text-sm text-gray-500">Real-time store metrics</p></div>
  <div className="flex items-center gap-4">{session?.user?.email && <span className="text-sm text-gray-700">{session.user.email}</span>}<button onClick={() => signOut()} className="text-sm text-red-600">Sign out</button></div></header>);
}