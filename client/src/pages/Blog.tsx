import { Card } from '@/components/ui/card';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Calendar, User } from 'lucide-react';

export default function Blog() {
  const { data: blogPosts } = trpc.blog.list.useQuery();

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Wellness Blog</h1>
          <p className="text-lg text-muted-foreground">
            Discover insights about Ashwagandha and Ayurvedic wellness
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container py-16">
        {blogPosts && blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                  {post.image && (
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt || new Date()).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author || 'Admin'}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No blog posts available</p>
        )}
      </div>
    </div>
  );
}
