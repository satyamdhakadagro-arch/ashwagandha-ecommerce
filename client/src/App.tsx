import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetails from "@/pages/ProductDetails";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AdminDashboard from "@/pages/AdminDashboard";
import FAQ from "@/pages/FAQ";
import Blog from "@/pages/Blog";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import ShippingPolicy from "@/pages/ShippingPolicy";
import RefundPolicy from "@/pages/RefundPolicy";
import ProductsAdmin from "@/pages/admin/ProductsAdmin";
import CategoriesAdmin from "@/pages/admin/CategoriesAdmin";
import OrdersAdmin from "@/pages/admin/OrdersAdmin";
import CustomersAdmin from "@/pages/admin/CustomersAdmin";
import ReviewsAdmin from "@/pages/admin/ReviewsAdmin";
import BlogAdmin from "@/pages/admin/BlogAdmin";
import FAQsAdmin from "@/pages/admin/FAQsAdmin";
import SettingsAdmin from '@/pages/admin/SettingsAdmin';
import BannersAdmin from '@/pages/admin/BannersAdmin';
import HomepageAdmin from '@/pages/admin/HomepageAdmin';
import InquiriesAdmin from '@/pages/admin/InquiriesAdmin';
import BlogPost from '@/pages/BlogPost';
import MediaLibraryAdmin from '@/pages/admin/MediaLibraryAdmin';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/product/:slug" component={ProductDetails} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />
      <Route path="/blog" component={Blog} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/shipping" component={ShippingPolicy} />
      <Route path="/refund" component={RefundPolicy} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/products" component={ProductsAdmin} />
      <Route path="/admin/categories" component={CategoriesAdmin} />
      <Route path="/admin/orders" component={OrdersAdmin} />
      <Route path="/admin/customers" component={CustomersAdmin} />
      <Route path="/admin/reviews" component={ReviewsAdmin} />
      <Route path="/admin/blog" component={BlogAdmin} />
      <Route path="/admin/faqs" component={FAQsAdmin} />
      <Route path="/admin/settings" component={SettingsAdmin} />
      <Route path="/admin/banners" component={BannersAdmin} />
      <Route path="/admin/homepage" component={HomepageAdmin} />
      <Route path="/admin/inquiries" component={InquiriesAdmin} />
      <Route path="/admin/media" component={MediaLibraryAdmin} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Layout>
              <Router />
            </Layout>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
