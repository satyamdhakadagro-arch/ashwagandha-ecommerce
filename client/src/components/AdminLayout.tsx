import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, Home, Package, Layers, ShoppingCart, Users, MessageSquare, BookOpen, HelpCircle, Image, Settings, Mail } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const [location] = useLocation();

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/categories', label: 'Categories', icon: Layers },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/customers', label: 'Customers', icon: Users },
    { href: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
    { href: '/admin/blog', label: 'Blog Posts', icon: BookOpen },
    { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
    { href: '/admin/banners', label: 'Banners', icon: Image },
    { href: '/admin/homepage', label: 'Homepage Sections', icon: Home },
    { href: '/admin/inquiries', label: 'Contact Inquiries', icon: Mail },
    { href: '/admin/media', label: 'Media Library', icon: Image },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (href: string) => location === href || location.startsWith(href + '/');

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-amber-900 text-white transition-all duration-300 overflow-y-auto`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">Admin</h1>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-amber-800"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <nav className="mt-8 space-y-2 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <a
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    active
                      ? 'bg-amber-700 text-white'
                      : 'text-amber-100 hover:bg-amber-800'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm">{item.label}</span>}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-2">
          <Button
            onClick={() => logout()}
            variant="ghost"
            className="w-full justify-start gap-3 text-amber-100 hover:bg-amber-800"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
