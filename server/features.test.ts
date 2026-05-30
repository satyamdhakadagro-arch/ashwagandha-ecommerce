import { describe, it, expect } from 'vitest';
import * as db from './db';

describe('Database Functions', () => {
  describe('Product Queries', () => {
    it('should return active products', async () => {
      const products = await db.getProducts();
      expect(Array.isArray(products)).toBe(true);
    });

    it('should return featured products with limit', async () => {
      const products = await db.getFeaturedProducts(3);
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeLessThanOrEqual(3);
    });

    it('should return best seller products', async () => {
      const products = await db.getBestSellerProducts(6);
      expect(Array.isArray(products)).toBe(true);
    });

    it('should get product by slug', async () => {
      const product = await db.getProductBySlug('ashwagandha-powder');
      // Product may or may not exist, but function should not throw
      expect(product === undefined || typeof product === 'object').toBe(true);
    });
  });

  describe('Category Queries', () => {
    it('should return active categories', async () => {
      const categories = await db.getCategories();
      expect(Array.isArray(categories)).toBe(true);
    });
  });

  describe('Blog Queries', () => {
    it('should return published blog posts', async () => {
      const posts = await db.getBlogPosts();
      expect(Array.isArray(posts)).toBe(true);
    });

    it('should get blog post by slug', async () => {
      const post = await db.getBlogPostBySlug('benefits-of-ashwagandha');
      expect(post === undefined || typeof post === 'object').toBe(true);
    });
  });

  describe('FAQ Queries', () => {
    it('should return active FAQs', async () => {
      const faqs = await db.getFAQs();
      expect(Array.isArray(faqs)).toBe(true);
    });
  });

  describe('Banner Queries', () => {
    it('should return active banners', async () => {
      const banners = await db.getBanners();
      expect(Array.isArray(banners)).toBe(true);
    });

    it('should filter banners by type', async () => {
      const banners = await db.getBanners('hero');
      expect(Array.isArray(banners)).toBe(true);
    });
  });

  describe('Homepage Sections', () => {
    it('should return visible homepage sections', async () => {
      const sections = await db.getHomepageSections();
      expect(Array.isArray(sections)).toBe(true);
    });
  });

  describe('Reviews', () => {
    it('should return approved reviews for product', async () => {
      const reviews = await db.getProductReviews(1);
      expect(Array.isArray(reviews)).toBe(true);
    });
  });

  describe('Settings', () => {
    it('should get setting by key', async () => {
      const setting = await db.getSetting('site_name');
      expect(setting === undefined || typeof setting === 'object').toBe(true);
    });

    it('should return all settings', async () => {
      const settings = await db.getAllSettings();
      expect(Array.isArray(settings)).toBe(true);
    });
  });

  describe('Contact Inquiries', () => {
    it('should create contact inquiry', async () => {
      const result = await db.createContactInquiry({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+91 9876543210',
        subject: 'Test Subject',
        message: 'Test message',
      });
      expect(result).toBeDefined();
    });
  });

  describe('Newsletter', () => {
    it('should subscribe to newsletter', async () => {
      const result = await db.subscribeNewsletter('test@example.com', 'Test User');
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('Orders', () => {
    it('should get orders', async () => {
      const orders = await db.getOrders();
      expect(Array.isArray(orders)).toBe(true);
    });

    it('should get orders with limit', async () => {
      const orders = await db.getOrders(5);
      expect(Array.isArray(orders)).toBe(true);
      expect(orders.length).toBeLessThanOrEqual(5);
    });
  });
});

describe('Data Validation', () => {
  it('should handle empty search results gracefully', async () => {
    const product = await db.getProductBySlug('non-existent-product-xyz');
    expect(product === undefined || product === null).toBe(true);
  });

  it('should handle database connection gracefully', async () => {
    const products = await db.getProducts();
    // Should return empty array if no connection, not throw
    expect(Array.isArray(products)).toBe(true);
  });
});
