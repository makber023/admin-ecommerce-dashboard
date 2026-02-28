// admin/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <main>
      <div className="min-h-screen flex flex-col font-mono">
        <AdminHeader />
        <div className="flex flex-1 mx-2 my-6">
          <div className="w-64 shrink-0">
            <AdminSidebar />
          </div>

          <div className="flex-1 pl-6 overflow-y-auto">{children}</div>
        </div>
      </div>
    </main>
  );
}
