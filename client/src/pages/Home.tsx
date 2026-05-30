import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Leaf, Heart, Shield, Truck, Award } from 'lucide-react';
import { Link } from 'wouter';

export default function Home() {
  const { data: featuredProducts } = trpc.products.featured.useQuery();
  const { data: bestSellers } = trpc.products.bestSellers.useQuery();
  const { data: faqs } = trpc.faqs.list.useQuery();
  const { data: blogPosts } = trpc.blog.list.useQuery();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950 dark:to-orange-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-amber-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-orange-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Premium Ashwagandha for Wellness
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover the ancient power of Ashwagandha - naturally sourced, scientifically proven, and crafted for your health
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                Shop Now
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-center">Featured Products</h2>
          <p className="text-center text-muted-foreground mb-12">
            Discover our handpicked selection of premium Ashwagandha products
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts?.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <Leaf className="w-16 h-16 text-muted-foreground" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
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
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-center">Best Sellers</h2>
          <p className="text-center text-muted-foreground mb-12">
            Most loved by our customers
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers?.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="relative aspect-square bg-muted flex items-center justify-center">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <Leaf className="w-16 h-16 text-muted-foreground" />
                    )}
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Best Seller
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-amber-600">₹{product.price}</span>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Benefits of Ashwagandha</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Stress Relief', desc: 'Helps reduce anxiety and promotes mental clarity' },
              { icon: Shield, title: 'Immune Support', desc: 'Strengthens your immune system naturally' },
              { icon: Award, title: 'Energy Boost', desc: 'Increases vitality and overall wellness' },
              { icon: Leaf, title: '100% Natural', desc: 'Pure Ayurvedic ingredients, no additives' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Quick and reliable shipping nationwide' },
              { icon: Star, title: 'Quality Assured', desc: 'Lab tested and certified products' },
            ].map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Premium Quality</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>Sourced from certified Ayurvedic suppliers</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>Rigorous quality testing and certification</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>No artificial additives or preservatives</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Customer Focused</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>24/7 customer support</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>Easy returns and refunds</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>Expert consultation available</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      {blogPosts && blogPosts.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container">
            <h2 className="text-4xl font-bold mb-4 text-center">Latest Blog Posts</h2>
            <p className="text-center text-muted-foreground mb-12">
              Learn more about Ashwagandha and wellness
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.slice(0, 3).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                    {post.image && (
                      <div className="aspect-video bg-muted overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Preview */}
      {faqs && faqs.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container">
            <h2 className="text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
            
            <div className="max-w-2xl mx-auto space-y-4">
              {faqs.slice(0, 4).map((faq) => (
                <Card key={faq.id} className="p-4">
                  <h3 className="font-bold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/faq">
                <Button variant="outline">View All FAQs</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg mb-8 opacity-90">
            Get exclusive offers and wellness tips delivered to your inbox
          </p>
          
          <form className="max-w-md mx-auto flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
              required
            />
            <Button className="bg-white text-amber-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
