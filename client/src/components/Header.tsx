import { useAuth } from '@/_core/hooks/useAuth';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getLoginUrl } from '@/const';

export function Header() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="hidden sm:inline">Ashwagandha</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" size="sm">
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {isHydrated && <LanguageSwitcher />}
          <ThemeSwitcher />
          <Button variant="ghost" size="icon">
            <ShoppingCart className="w-5 h-5" />
          </Button>

          {user ? (
            <div className="flex items-center gap-2">
              {user.role === 'admin' && (
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    Admin
                  </Button>
                </Link>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => window.location.href = getLoginUrl()}
            >
              Login
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
