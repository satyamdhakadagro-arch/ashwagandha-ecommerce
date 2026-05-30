import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Mail, Phone, Download } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';

export default function CustomersAdmin() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const customers = [
    {
      id: 1,
      name: 'Raj Kumar',
      email: 'raj@example.com',
      phone: '+91 9876543210',
      orders: 5,
      totalSpent: 12500,
      joinDate: '2026-01-15',
      status: 'active',
    },
    {
      id: 2,
      name: 'Priya Singh',
      email: 'priya@example.com',
      phone: '+91 9876543211',
      orders: 2,
      totalSpent: 4500,
      joinDate: '2026-02-20',
      status: 'active',
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '+91 9876543212',
      orders: 8,
      totalSpent: 28000,
      joinDate: '2025-12-10',
      status: 'active',
    },
    {
      id: 4,
      name: 'Neha Sharma',
      email: 'neha@example.com',
      phone: '+91 9876543213',
      orders: 1,
      totalSpent: 1500,
      joinDate: '2026-05-01',
      status: 'inactive',
    },
  ];

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Customer Management</h1>
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Download className="w-4 h-4 mr-2" />
            Export Customers
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Total Customers</p>
            <p className="text-2xl font-bold">{customers.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Active Customers</p>
            <p className="text-2xl font-bold">{customers.filter(c => c.status === 'active').length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">₹{customers.reduce((sum, c) => sum + c.totalSpent, 0)}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Avg. Order Value</p>
            <p className="text-2xl font-bold">₹{Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.orders, 0))}</p>
          </Card>
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded"
            />
          </div>
        </div>

        {/* Customers Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Name</th>
                  <th className="text-left px-4 py-3 font-bold">Email</th>
                  <th className="text-left px-4 py-3 font-bold">Phone</th>
                  <th className="text-left px-4 py-3 font-bold">Orders</th>
                  <th className="text-left px-4 py-3 font-bold">Total Spent</th>
                  <th className="text-left px-4 py-3 font-bold">Join Date</th>
                  <th className="text-left px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{customer.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {customer.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {customer.phone}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold">{customer.orders}</td>
                    <td className="px-4 py-3 font-bold">₹{customer.totalSpent}</td>
                    <td className="px-4 py-3 text-muted-foreground">{customer.joinDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        customer.status === 'active'
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300'
                      }`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
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
