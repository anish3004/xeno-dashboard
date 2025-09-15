import { getSession } from "next-auth/react";
export default function Index() { return null; }
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) return { redirect: { destination: '/auth/signin', permanent: false } };
  return { redirect: { destination: '/dashboard', permanent: false } };
}