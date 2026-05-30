import { useRoute } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { Link } from 'wouter';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const { language } = useLanguage() || { language: 'en' };
  const slug = params?.slug || '';

  const { data: post, isLoading } = trpc.blog.bySlug.useQuery({ slug });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-96 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-amber-600 hover:bg-amber-700">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = language === 'hi' ? post.titleHi || post.title : post.title;
  const content = language === 'hi' ? post.contentHi || post.content : post.content;
  const author = post.author || 'Ashwagandha Team';

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Blog Post */}
        <article className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.createdAt || '').toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{author}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={post.image}
                alt={title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Content */}
          <Card className="p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="whitespace-pre-wrap text-lg leading-relaxed">{content}</p>
            </div>
          </Card>

          {/* Share Buttons */}
          <div className="flex gap-4 pt-6 border-t border-border">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share on Facebook
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share on Twitter
            </Button>
          </div>

          {/* Related Posts */}
          <div className="pt-12 border-t border-border">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Placeholder for related posts */}
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition">
                  <div className="h-40 bg-muted"></div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">Related Post {i}</h3>
                    <p className="text-sm text-muted-foreground">Coming soon...</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
