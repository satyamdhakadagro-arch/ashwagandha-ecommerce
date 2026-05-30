import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Heart, Share2, Leaf, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { useState } from 'react';

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product } = trpc.products.bySlug.useQuery({ slug: slug || '' as string });
  const { data: reviews } = trpc.reviews.byProduct.useQuery(
    { productId: product?.id || 0 },
    { enabled: !!product?.id }
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Powder');
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="container py-12">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const variants = ['Powder', 'Capsules', 'Roots', 'Extracts'];
  const images = [product.image, product.image, product.image].filter(Boolean);

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/shop">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span>{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4 flex items-center justify-center">
              {images[selectedImage] ? (
                <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <Leaf className="w-24 h-24 text-muted-foreground" />
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-muted rounded overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-amber-500' : 'border-transparent'
                    }`}
                  >
                    {img && <img src={img} alt="" className="w-full h-full object-cover" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({reviews?.length || 0} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-amber-600">₹{product.price}</span>
                {/* Original price can be added if needed */}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-muted-foreground mb-6">{product.description}</p>
            )}

            {/* Variants */}
            <div className="mb-6">
              <h3 className="font-bold mb-3">Select Variant</h3>
              <div className="grid grid-cols-2 gap-3">
                {variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`py-2 px-4 rounded border-2 transition ${
                      selectedVariant === variant
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950'
                        : 'border-border hover:border-amber-300'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-bold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border border-border rounded hover:bg-muted"
                >
                  −
                </button>
                <span className="px-6 py-2 border border-border rounded">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-border rounded hover:bg-muted"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <Button size="lg" className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="px-6">
                <Heart className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-6">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* WhatsApp Order */}
            <Button size="lg" variant="outline" className="w-full mb-6">
              <span className="text-green-600 font-bold">WhatsApp Order</span>
            </Button>

            {/* Stock Status */}
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg mb-6">
              <p className="text-green-700 dark:text-green-300 font-semibold">
                ✓ In Stock - Free Delivery on orders above ₹500
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <h3 className="font-bold">Key Benefits</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ 100% Natural & Organic</li>
                <li>✓ Lab Tested & Certified</li>
                <li>✓ No Additives or Preservatives</li>
                <li>✓ Ayurvedic Grade Quality</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products & Reviews Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-border mb-6">
              <div className="flex gap-6">
                <button className="py-3 border-b-2 border-amber-500 font-bold">
                  Reviews
                </button>
                <button className="py-3 text-muted-foreground hover:text-foreground">
                  Specifications
                </button>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <Card key={review.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold">{review.customerName}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(review.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Delivery Info */}
            <Card className="p-4 mb-6">
              <h3 className="font-bold mb-4">Delivery Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Delivery Time</p>
                  <p className="font-semibold">2-3 Business Days</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Shipping Cost</p>
                  <p className="font-semibold">Free for orders above ₹500</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Return Policy</p>
                  <p className="font-semibold">30 Days Easy Return</p>
                </div>
              </div>
            </Card>

            {/* Seller Info */}
            <Card className="p-4">
              <h3 className="font-bold mb-4">Seller Information</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Ashwagandha Premium</strong></p>
                <p className="text-muted-foreground">Verified Seller</p>
                <p className="text-muted-foreground">📞 +91 XXXXXXXXXX</p>
                <p className="text-muted-foreground">📧 support@ashwagandha.com</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
