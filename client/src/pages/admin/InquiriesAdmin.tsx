import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Eye, Trash2, Mail, Phone } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';

export default function InquiriesAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  // Mock data
  const inquiries = [
    {
      id: 1,
      name: 'Raj Kumar',
      email: 'raj@example.com',
      phone: '+91 9876543210',
      subject: 'Product Inquiry',
      message: 'I would like to know more about your Ashwagandha powder. Is it organic?',
      status: 'new',
      date: '2026-05-30',
    },
    {
      id: 2,
      name: 'Priya Singh',
      email: 'priya@example.com',
      phone: '+91 9876543211',
      subject: 'Bulk Order',
      message: 'We are interested in bulk ordering for our wellness center.',
      status: 'replied',
      date: '2026-05-29',
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '+91 9876543212',
      subject: 'Shipping Question',
      message: 'What are the shipping charges to Mumbai?',
      status: 'new',
      date: '2026-05-28',
    },
    {
      id: 4,
      name: 'Neha Sharma',
      email: 'neha@example.com',
      phone: '+91 9876543213',
      subject: 'Return Request',
      message: 'I received a damaged product. Can I return it?',
      status: 'in-progress',
      date: '2026-05-27',
    },
  ];

  const filteredInquiries = inquiries.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'in-progress':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'replied':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Contact Inquiries</h1>
          <div className="text-sm text-muted-foreground">
            Total: {inquiries.length} | New: {inquiries.filter(i => i.status === 'new').length}
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inquiries List */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted border-b border-border">
                    <tr>
                      <th className="text-left px-4 py-3 font-bold">Name</th>
                      <th className="text-left px-4 py-3 font-bold">Subject</th>
                      <th className="text-left px-4 py-3 font-bold">Status</th>
                      <th className="text-left px-4 py-3 font-bold">Date</th>
                      <th className="text-left px-4 py-3 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.map((inquiry) => (
                      <tr
                        key={inquiry.id}
                        className="border-b border-border hover:bg-muted/50 cursor-pointer"
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        <td className="px-4 py-3 font-medium">{inquiry.name}</td>
                        <td className="px-4 py-3 text-muted-foreground line-clamp-1">{inquiry.subject}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                            {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{inquiry.date}</td>
                        <td className="px-4 py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInquiry(inquiry);
                            }}
                          >
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

          {/* Inquiry Details */}
          <div>
            {selectedInquiry ? (
              <Card className="p-6 sticky top-6">
                <h2 className="text-lg font-bold mb-4">Inquiry Details</h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedInquiry.name}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a
                        href={`mailto:${selectedInquiry.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedInquiry.email}
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a
                        href={`tel:${selectedInquiry.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedInquiry.phone}
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Subject</p>
                    <p className="font-medium">{selectedInquiry.subject}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${getStatusColor(selectedInquiry.status)}`}>
                      {selectedInquiry.status.charAt(0).toUpperCase() + selectedInquiry.status.slice(1)}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Message</p>
                    <p className="text-sm mt-1 p-3 bg-muted rounded">{selectedInquiry.message}</p>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Reply via Email
                    </Button>
                    <Button variant="outline" className="w-full">
                      Mark as Resolved
                    </Button>
                    <Button variant="ghost" className="w-full text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-6 text-center text-muted-foreground">
                <p>Select an inquiry to view details</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
