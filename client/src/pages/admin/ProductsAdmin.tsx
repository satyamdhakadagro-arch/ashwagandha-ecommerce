import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function ProductsAdmin() {
  const { data: products } = trpc.products.list.useQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    nameHi: '',
    description: '',
    descriptionHi: '',
    shortDescription: '',
    shortDescriptionHi: '',
    price: '',
    categoryId: '',
    stock: '',
    isBestSeller: false,
  });

  const createMutation = trpc.products.create.useMutation({
    onSuccess: () => {
      setFormData({
        name: '',
        nameHi: '',
        description: '',
        descriptionHi: '',
        shortDescription: '',
        shortDescriptionHi: '',
        price: '',
        categoryId: '',
        stock: '',
        isBestSeller: false,
      });
      setShowForm(false);
    },
  });

  const deleteMutation = trpc.products.delete.useMutation();

  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      ...formData,
      price: parseFloat(formData.price),
      categoryId: parseInt(formData.categoryId),
      stock: parseInt(formData.stock),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-600 hover:bg-amber-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name (EN)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Product Name (HI)</label>
                <input
                  type="text"
                  value={formData.nameHi}
                  onChange={(e) => setFormData({ ...formData, nameHi: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="1">Powder</option>
                  <option value="2">Capsules</option>
                  <option value="3">Roots</option>
                  <option value="4">Extracts</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded"
                  required
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Mark as Best Seller</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Short Description (EN)</label>
              <textarea
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded"
                rows={2}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Short Description (HI)</label>
              <textarea
                value={formData.shortDescriptionHi}
                onChange={(e) => setFormData({ ...formData, shortDescriptionHi: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded"
                rows={2}
              ></textarea>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? 'Saving...' : 'Save Product'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
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
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded"
          />
        </div>
      </div>

      {/* Products Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-bold">Product Name</th>
                <th className="text-left px-4 py-3 font-bold">Category</th>
                <th className="text-left px-4 py-3 font-bold">Price</th>
                <th className="text-left px-4 py-3 font-bold">Stock</th>
                <th className="text-left px-4 py-3 font-bold">Status</th>
                <th className="text-left px-4 py-3 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
                      Category
                    </span>
                  </td>
                  <td className="px-4 py-3">₹{product.price}</td>
                  <td className="px-4 py-3">
                    <span className={(product.stock ?? 0) > 0 ? 'text-green-600' : 'text-red-600'}>
                      {product.stock ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {product.isBestSeller && (
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded text-xs">
                        Best Seller
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingId(product.id)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMutation.mutate({ id: product.id })}
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
      </Card>
    </div>
  );
}
