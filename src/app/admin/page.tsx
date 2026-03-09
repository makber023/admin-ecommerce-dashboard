import {
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { ReactNode } from "react";
import prisma from "@/lib/prisma";
import CurrentDate from "@/components/admin/CurrentDate";

export default async function AdminDashboardPage() {
  const productCount = await prisma.product.count();
  const userCount = await prisma.user.count();

  const latestProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, name: true, stock: true },
  });

  const recentOrders = [
    {
      id: "#1021",
      customer: "Ayesha K.",
      amount: "4,500",
      status: "Delivered",
    },
    { id: "#1020", customer: "Bilal R.", amount: "6,800", status: "Pending" },
    { id: "#1019", customer: "Sara M.", amount: "1,200", status: "Delivered" },
    {
      id: "#1018",
      customer: "Usman T.",
      amount: "5,500",
      status: "Processing",
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 space-y-10">
      <div className="flex items-end justify-between border-b border-border pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Admin Panel
          </p>
          <h1 className="text-3xl  tracking-tight">Dashboard</h1>
        </div>
        <p className="text-sm text-muted-foreground hidden md:block">
          <CurrentDate />
        </p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Sales"
          value="Rs 125,000"
          delta="+12.5%"
          icon={<DollarSign size={16} />}
          accent="text-emerald-500"
        />
        <StatCard
          title="Orders"
          value="320"
          delta="+8.2%"
          icon={<ShoppingBag size={16} />}
          accent="text-sky-500"
        />
        <StatCard
          title="Products"
          value={productCount}
          delta="in catalogue"
          icon={<Package size={16} />}
          accent="text-violet-500"
        />
        <StatCard
          title="Users"
          value={userCount}
          delta="registered"
          icon={<Users size={16} />}
          accent="text-amber-500"
        />
      </div>

      {/* Lower Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Recent Orders — spans 3 cols */}
        <div className="xl:col-span-3 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-md bg-muted text-muted-foreground">
                <ShoppingBag size={15} />
              </span>
              <h2 className="text-sm font-semibold tracking-tight">
                Recent Orders
              </h2>
            </div>
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              View all <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between px-6 py-3.5 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground w-14">
                    {order.id}
                  </span>
                  <span className="text-sm">{order.customer}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-medium">Rs {order.amount}</span>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Products — spans 2 cols */}
        <div className="xl:col-span-2 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-md bg-muted text-muted-foreground">
                <Package size={15} />
              </span>
              <h2 className="text-sm font-semibold tracking-tight">
                New Products
              </h2>
            </div>
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              View all <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="divide-y divide-border">
            {latestProducts.length === 0 ? (
              <p className="px-6 py-8 text-sm text-muted-foreground text-center">
                No products found.
              </p>
            ) : (
              latestProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between px-6 py-3.5 hover:bg-muted/40 transition-colors"
                >
                  <span className="text-sm truncate max-w-[140px]">
                    {product.name}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      product.stock > 0
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

type StatCardProps = {
  title: string;
  value: string | number;
  delta: string;
  icon: ReactNode;
  accent: string;
};

function StatCard({ title, value, delta, icon, accent }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col justify-between gap-4 hover:border-border/80 hover:shadow-sm transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <span className={`p-1.5 rounded-md bg-muted ${accent}`}>{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        <p className={`text-xs mt-0.5 flex items-center gap-0.5 ${accent}`}>
          <TrendingUp size={11} />
          {delta}
        </p>
      </div>
    </div>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Delivered: "bg-emerald-500/10 text-emerald-600",
    Pending: "bg-amber-500/10 text-amber-600",
    Processing: "bg-sky-500/10 text-sky-600",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
        styles[status] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  );
}
