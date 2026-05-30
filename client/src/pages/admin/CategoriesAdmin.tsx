import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';

export default function CategoriesAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nameHi: '',
    description: '',
    descriptionHi: '',
  });

  // Mock data
  const categories = [
    { id: 1, name: 'Powder', nameHi: 'पाउडर', description: 'Ashwagandha Powder', isActive: true },
    { id: 2, name: 'Capsules', nameHi: 'कैप्सूल', description: 'Ashwagandha Capsules', isActive: true },
    { id: 3, name: 'Roots', nameHi: 'जड़ें', description: 'Ashwagandha Roots', isActive: true },
    { id: 4, name: 'Extracts', nameHi: 'अर्क', description: 'Ashwagandha Extracts', isActive: true },
  ];

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle category creation
    setFormData({ name: '', nameHi: '', description: '', descriptionHi: '' });
    setShowForm(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Category Management</h1>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category Name (EN)</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category Name (HI)</label>
                  <input
                    type="text"
                    value={formData.nameHi}
                    onChange={(e) => setFormData({ ...formData, nameHi: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded"
                  />
                </div>
              </div>

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

              <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Save Category
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
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded"
            />
          </div>
        </div>

        {/* Categories Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Category Name</th>
                  <th className="text-left px-4 py-3 font-bold">Description</th>
                  <th className="text-left px-4 py-3 font-bold">Status</th>
                  <th className="text-left px-4 py-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{category.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{category.description}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
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
