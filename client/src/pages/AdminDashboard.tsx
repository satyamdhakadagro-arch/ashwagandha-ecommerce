import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, TrendingUp, Users, Package } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';

export default function AdminDashboard() {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return (
      <div className="container py-12 text-center">
        <p className="text-red-600 font-bold">Access Denied. Admin privileges required.</p>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name || 'Admin'}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Orders</p>
                <p className="text-3xl font-bold">1,234</p>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
              <ShoppingCart className="w-12 h-12 text-amber-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Sales</p>
                <p className="text-3xl font-bold">₹5.2L</p>
                <p className="text-xs text-green-600 mt-1">+8% from last month</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Customers</p>
                <p className="text-3xl font-bold">856</p>
                <p className="text-xs text-green-600 mt-1">+24 new this month</p>
              </div>
              <Users className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Products</p>
                <p className="text-3xl font-bold">42</p>
                <p className="text-xs text-green-600 mt-1">+3 new products</p>
              </div>
              <Package className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-2 px-4">Order ID</th>
                  <th className="text-left py-2 px-4">Customer</th>
                  <th className="text-left py-2 px-4">Amount</th>
                  <th className="text-left py-2 px-4">Status</th>
                  <th className="text-left py-2 px-4">Date</th>
                  <th className="text-left py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">ORD-{1000 + i}</td>
                    <td className="py-3 px-4">Customer {i}</td>
                    <td className="py-3 px-4 font-bold">₹{500 * i}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-medium">
                        Delivered
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">2026-05-{20 + i}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Top Products */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            {[
              { name: 'Ashwagandha Powder', sales: 234, revenue: '₹58,500' },
              { name: 'Ashwagandha Capsules', sales: 189, revenue: '₹47,250' },
              { name: 'Ashwagandha Extract', sales: 156, revenue: '₹62,400' },
              { name: 'Ashwagandha Roots', sales: 98, revenue: '₹29,400' },
            ].map((product) => (
              <div key={product.name} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sales} units sold</p>
                </div>
                <p className="font-bold">{product.revenue}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
