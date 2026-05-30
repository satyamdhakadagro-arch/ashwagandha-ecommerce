import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Eye, Printer } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';

export default function OrdersAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const orders = [
    {
      id: 1,
      orderNumber: 'ORD-001',
      customerName: 'Raj Kumar',
      email: 'raj@example.com',
      total: 2500,
      status: 'completed',
      date: '2026-05-28',
      items: 2,
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customerName: 'Priya Singh',
      email: 'priya@example.com',
      total: 1500,
      status: 'pending',
      date: '2026-05-29',
      items: 1,
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      customerName: 'Amit Patel',
      email: 'amit@example.com',
      total: 3200,
      status: 'shipped',
      date: '2026-05-30',
      items: 3,
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber.includes(searchTerm) || order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'shipped':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Order Management</h1>
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Printer className="w-4 h-4 mr-2" />
            Export Orders
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by order number or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold">{orders.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold">{orders.filter(o => o.status === 'pending').length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Shipped</p>
            <p className="text-2xl font-bold">{orders.filter(o => o.status === 'shipped').length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">₹{orders.reduce((sum, o) => sum + o.total, 0)}</p>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Order Number</th>
                  <th className="text-left px-4 py-3 font-bold">Customer</th>
                  <th className="text-left px-4 py-3 font-bold">Items</th>
                  <th className="text-left px-4 py-3 font-bold">Total</th>
                  <th className="text-left px-4 py-3 font-bold">Status</th>
                  <th className="text-left px-4 py-3 font-bold">Date</th>
                  <th className="text-left px-4 py-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{order.orderNumber}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">{order.items}</td>
                    <td className="px-4 py-3 font-bold">₹{order.total}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
