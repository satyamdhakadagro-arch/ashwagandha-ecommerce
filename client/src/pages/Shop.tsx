import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Leaf, Filter } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

export default function Shop() {
  const { data: products } = trpc.products.list.useQuery();
  const { data: categories } = trpc.categories.list.useQuery();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products?.filter((product) => {
    const categoryMatch = !selectedCategory || product.categoryId === selectedCategory;
    const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
    const priceMatch = price >= priceRange[0] && price <= priceRange[1];
    return categoryMatch && priceMatch;
  }) || [];

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Shop All Products</h1>
          <p className="text-muted-foreground">Explore our premium Ashwagandha collection</p>
        </div>
      </section>

      {/* Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className={`md:col-span-1 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="sticky top-20 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Categories
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded ${
                      selectedCategory === null
                        ? 'bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100'
                        : 'hover:bg-muted'
                    }`}
                  >
                    All Products
                  </button>
                  {categories?.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded ${
                        selectedCategory === cat.id
                          ? 'bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-bold text-lg mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Min: ₹{priceRange[0]}</label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Max: ₹{priceRange[1]}</label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Product Types */}
              <div>
                <h3 className="font-bold text-lg mb-4">Product Type</h3>
                <div className="space-y-2">
                  {['Powder', 'Capsules', 'Roots', 'Extracts'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-6">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/product/${product.slug}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <div className="relative aspect-square bg-muted flex items-center justify-center">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <Leaf className="w-16 h-16 text-muted-foreground" />
                        )}
                        {product.isBestSeller && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            Best Seller
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-xs text-muted-foreground ml-2">(42 reviews)</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {product.shortDescription}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-amber-600">₹{product.price}</span>
                          <Button size="sm">Add to Cart</Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg">No products found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
