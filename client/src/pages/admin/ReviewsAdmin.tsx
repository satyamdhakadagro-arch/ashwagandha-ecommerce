import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Check, X, Trash2, Star } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';

export default function ReviewsAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const reviews = [
    {
      id: 1,
      productName: 'Ashwagandha Powder',
      customerName: 'Raj Kumar',
      rating: 5,
      comment: 'Excellent product! Very effective.',
      status: 'approved',
      date: '2026-05-25',
    },
    {
      id: 2,
      productName: 'Ashwagandha Capsules',
      customerName: 'Priya Singh',
      rating: 4,
      comment: 'Good quality, fast delivery.',
      status: 'pending',
      date: '2026-05-28',
    },
    {
      id: 3,
      productName: 'Ashwagandha Extract',
      customerName: 'Amit Patel',
      rating: 3,
      comment: 'Average product, could be better.',
      status: 'approved',
      date: '2026-05-26',
    },
    {
      id: 4,
      productName: 'Ashwagandha Roots',
      customerName: 'Neha Sharma',
      rating: 2,
      comment: 'Not as described.',
      status: 'rejected',
      date: '2026-05-27',
    },
  ];

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch = r.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         r.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Review Management</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Total Reviews</p>
            <p className="text-2xl font-bold">{reviews.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Approved</p>
            <p className="text-2xl font-bold">{reviews.filter(r => r.status === 'approved').length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold">{reviews.filter(r => r.status === 'pending').length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Avg. Rating</p>
            <p className="text-2xl font-bold">{(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}</p>
          </Card>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by product or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-border rounded"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Reviews Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Product</th>
                  <th className="text-left px-4 py-3 font-bold">Customer</th>
                  <th className="text-left px-4 py-3 font-bold">Rating</th>
                  <th className="text-left px-4 py-3 font-bold">Comment</th>
                  <th className="text-left px-4 py-3 font-bold">Status</th>
                  <th className="text-left px-4 py-3 font-bold">Date</th>
                  <th className="text-left px-4 py-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review) => (
                  <tr key={review.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{review.productName}</td>
                    <td className="px-4 py-3">{review.customerName}</td>
                    <td className="px-4 py-3">{renderStars(review.rating)}</td>
                    <td className="px-4 py-3 text-muted-foreground line-clamp-2">{review.comment}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(review.status)}`}>
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{review.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {review.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-100">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-100">
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
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
