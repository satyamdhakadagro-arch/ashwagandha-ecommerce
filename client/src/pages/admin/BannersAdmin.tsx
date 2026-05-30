import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit2, Trash2, Search, Loader2 } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function BannersAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    titleHi: '',
    image: '',
    type: 'promotional' as const,
    link: '',
    description: '',
    descriptionHi: '',
  });

  // Fetch banners
  const { data: banners = [], isLoading, refetch } = trpc.adminBanners.list.useQuery();

  // Create banner mutation
  const createMutation = trpc.adminBanners.create.useMutation({
    onSuccess: () => {
      toast.success('Banner created successfully');
      refetch();
      setFormData({
        title: '',
        titleHi: '',
        image: '',
        type: 'promotional',
        link: '',
        description: '',
        descriptionHi: '',
      });
      setShowForm(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create banner');
    },
  });

  // Delete banner mutation
  const deleteMutation = trpc.adminBanners.delete.useMutation({
    onSuccess: () => {
      toast.success('Banner deleted successfully');
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete banner');
    },
  });

  const filteredBanners = banners.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      deleteMutation.mutate({ id });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hero':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300';
      case 'promotional':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300';
      case 'featured':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Banner Management</h1>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Banner
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Create New Banner</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title (EN)</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Title (HI)</label>
                  <input
                    type="text"
                    value={formData.titleHi}
                    onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Banner Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-border rounded"
                  >
                    <option value="hero">Hero</option>
                    <option value="promotional">Promotional</option>
                    <option value="featured">Featured</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Link URL</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Description (EN)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded"
                    rows={2}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description (HI)</label>
                  <textarea
                    value={formData.descriptionHi}
                    onChange={(e) => setFormData({ ...formData, descriptionHi: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded"
                    rows={2}
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending} className="bg-green-600 hover:bg-green-700">
                  {createMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Banner'
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Search */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search banners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded"
            />
          </div>
        </div>

        {/* Banners Table */}
        <Card className="overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 font-bold">Title</th>
                    <th className="text-left px-4 py-3 font-bold">Type</th>
                    <th className="text-left px-4 py-3 font-bold">Link</th>
                    <th className="text-left px-4 py-3 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBanners.map((banner) => (
                    <tr key={banner.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-4 py-3 font-medium">{banner.title}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(banner.type || 'promotional')}`}>
                          {banner.type ? banner.type.charAt(0).toUpperCase() + banner.type.slice(1) : 'Promotional'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{(banner.link as string | null) || '-'}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(banner.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
