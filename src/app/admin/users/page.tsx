import prisma from "@/lib/prisma";
import UsersClient from "@/components/admin/UsersTable";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen p-6 md:p-10 space-y-5">
      <div className="flex items-end justify-between border-b border-border pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Admin Panel
          </p>
          <h1 className="text-3xl  tracking-tight">Users</h1>
        </div>
        <p className="text-sm text-muted-foreground hidden md:block">
          {new Date().toLocaleDateString("en-PK", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <UsersClient initialUsers={users} />
    </div>
  );
}
