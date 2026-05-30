import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit2, Trash2, Search, Eye, EyeOff } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';

export default function BlogAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    titleHi: '',
    excerpt: '',
    excerptHi: '',
    content: '',
    contentHi: '',
    author: '',
  });

  // Mock data
  const blogPosts = [
    {
      id: 1,
      title: 'Benefits of Ashwagandha',
      titleHi: 'अश्वगंधा के लाभ',
      author: 'Admin',
      status: 'published',
      date: '2026-05-20',
      views: 234,
    },
    {
      id: 2,
      title: 'How to Use Ashwagandha',
      titleHi: 'अश्वगंधा का उपयोग कैसे करें',
      author: 'Admin',
      status: 'published',
      date: '2026-05-15',
      views: 156,
    },
    {
      id: 3,
      title: 'Ashwagandha and Stress Relief',
      titleHi: 'अश्वगंधा और तनाव से राहत',
      author: 'Admin',
      status: 'draft',
      date: '2026-05-25',
      views: 0,
    },
  ];

  const filteredPosts = blogPosts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({
      title: '',
      titleHi: '',
      excerpt: '',
      excerptHi: '',
      content: '',
      contentHi: '',
      author: '',
    });
    setShowForm(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Blog Post
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Create New Blog Post</h2>
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
                  <label className="block text-sm font-medium mb-2">Excerpt (EN)</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded"
                    rows={2}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt (HI)</label>
                  <textarea
                    value={formData.excerptHi}
                    onChange={(e) => setFormData({ ...formData, excerptHi: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded"
                    rows={2}
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Content (EN)</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded"
                    rows={6}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Content (HI)</label>
                  <textarea
                    value={formData.contentHi}
                    onChange={(e) => setFormData({ ...formData, contentHi: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded"
                    rows={6}
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Publish Post
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
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded"
            />
          </div>
        </div>

        {/* Blog Posts Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Title</th>
                  <th className="text-left px-4 py-3 font-bold">Author</th>
                  <th className="text-left px-4 py-3 font-bold">Status</th>
                  <th className="text-left px-4 py-3 font-bold">Views</th>
                  <th className="text-left px-4 py-3 font-bold">Date</th>
                  <th className="text-left px-4 py-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{post.title}</td>
                    <td className="px-4 py-3">{post.author}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        post.status === 'published'
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                      }`}>
                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">{post.views}</td>
                    <td className="px-4 py-3 text-muted-foreground">{post.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          {post.status === 'published' ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </Button>
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
