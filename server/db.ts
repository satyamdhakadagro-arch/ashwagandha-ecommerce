import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq } from "drizzle-orm";
import {
  InsertUser,
  users,
  products,
  categories,
  orders,
  customers,
  reviews,
  blogPosts,
  faqs,
  banners,
  homepageSections,
  contactInquiries,
  settings,
  newsletterSubscriptions,
  mediaLibrary,
} from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;
let _pool: Pool | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
      _db = drizzle(_pool);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
      _pool = null;
    }
  }
  return _db;
}

/**
 * Upsert user from Clerk authentication
 * Creates or updates user based on Clerk ID
 */
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.clerkId) {
    throw new Error("User clerkId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      clerkId: user.clerkId,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
    };

    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, user.clerkId))
      .limit(1);

    if (existingUser.length > 0) {
      // Update existing user
      await db
        .update(users)
        .set({
          ...values,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkId, user.clerkId));
    } else {
      // Insert new user
      await db.insert(users).values(values);
    }
  } catch (error) {
    console.error("[Database] Error upserting user:", error);
    throw error;
  }
}

/**
 * Get user by Clerk ID
 */
export async function getUserByClerkId(clerkId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return null;
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId))
      .limit(1);

    return user[0] || null;
  } catch (error) {
    console.error("[Database] Error getting user by Clerk ID:", error);
    return null;
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return null;
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user[0] || null;
  } catch (error) {
    console.error("[Database] Error getting user by email:", error);
    return null;
  }
}

// ============ PRODUCTS ============

export async function getProducts(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(products)
      .where(eq(products.isActive, true))
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error("[Database] Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching product:", error);
    return null;
  }
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching product by slug:", error);
    return null;
  }
}

export async function getFeaturedProducts(limit = 6) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(products)
      .where(eq(products.isFeatured, true))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Error fetching featured products:", error);
    return [];
  }
}

export async function getBestSellerProducts(limit = 6) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(products)
      .where(eq(products.isBestSeller, true))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Error fetching best seller products:", error);
    return [];
  }
}

export async function getProductsByCategory(categoryId: number, limit = 100) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(products)
      .where(eq(products.categoryId, categoryId))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Error fetching products by category:", error);
    return [];
  }
}

export async function createProduct(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(products).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("[Database] Error creating product:", error);
    throw error;
  }
}

export async function updateProduct(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();

    return result[0];
  } catch (error) {
    console.error("[Database] Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.delete(products).where(eq(products.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Error deleting product:", error);
    throw error;
  }
}

// ============ CATEGORIES ============

export async function getCategories(limit = 100) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(categories)
      .where(eq(categories.isActive, true))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Error fetching categories:", error);
    return [];
  }
}

export async function getCategoryById(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching category:", error);
    return null;
  }
}

export async function getCategoryBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching category by slug:", error);
    return null;
  }
}

export async function createCategory(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(categories).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("[Database] Error creating category:", error);
    throw error;
  }
}

export async function updateCategory(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db
      .update(categories)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning();

    return result[0];
  } catch (error) {
    console.error("[Database] Error updating category:", error);
    throw error;
  }
}

export async function deleteCategory(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.delete(categories).where(eq(categories.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Error deleting category:", error);
    throw error;
  }
}

// ============ ORDERS ============

export async function getOrders(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(orders)
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error("[Database] Error fetching orders:", error);
    return [];
  }
}

export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching order:", error);
    return null;
  }
}

export async function createOrder(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(orders).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("[Database] Error creating order:", error);
    throw error;
  }
}

export async function updateOrder(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db
      .update(orders)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();

    return result[0];
  } catch (error) {
    console.error("[Database] Error updating order:", error);
    throw error;
  }
}

// ============ CUSTOMERS ============

export async function getCustomers(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(customers)
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error("[Database] Error fetching customers:", error);
    return [];
  }
}

export async function getCustomerById(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(customers)
      .where(eq(customers.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching customer:", error);
    return null;
  }
}

export async function createCustomer(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(customers).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("[Database] Error creating customer:", error);
    throw error;
  }
}

export async function updateCustomer(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db
      .update(customers)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(customers.id, id))
      .returning();

    return result[0];
  } catch (error) {
    console.error("[Database] Error updating customer:", error);
    throw error;
  }
}

// ============ REVIEWS ============

export async function getReviews(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(reviews)
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error("[Database] Error fetching reviews:", error);
    return [];
  }
}

export async function getReviewsByProductId(productId: number, limit = 100) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.productId, productId))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Error fetching reviews by product:", error);
    return [];
  }
}

export async function getApprovedReviews(productId: number, limit = 100) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.status, "approved"))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Error fetching approved reviews:", error);
    return [];
  }
}

export async function createReview(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(reviews).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("[Database] Error creating review:", error);
    throw error;
  }
}

export async function updateReview(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db
      .update(reviews)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(reviews.id, id))
      .returning();

    return result[0];
  } catch (error) {
    console.error("[Database] Error updating review:", error);
    throw error;
  }
}

export async function deleteReview(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.delete(reviews).where(eq(reviews.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Error deleting review:", error);
    throw error;
  }
}

// ============ BLOG POSTS ============

export async function getBlogPosts(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.isPublished, true))
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error("[Database] Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching blog post:", error);
    return null;
  }
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching blog post by slug:", error);
    return null;
  }
}

export async function createBlogPost(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(blogPosts).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("[Database] Error creating blog post:", error);
    throw error;
  }
}

export async function updateBlogPost(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db
      .update(blogPosts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();

    return result[0];
  } catch (error) {
    console.error("[Database] Error updating blog post:", error);
    throw error;
  }
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Error deleting blog post:", error);
    throw error;
  }
}

// ============ FAQs ============

export async function getFAQs(limit = 100) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(faqs)
      .where(eq(faqs.isActive, true))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Error fetching FAQs:", error);
    return [];
  }
}

export async function getFAQById(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(faqs)
      .where(eq(faqs.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching FAQ:", error);
    return null;
  }
}

export async function createFAQ(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(faqs).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("[Database] Error creating FAQ:", error);
    throw error;
  }
}

export async function updateFAQ(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db
      .update(faqs)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(faqs.id, id))
      .returning();

    return result[0];
  } catch (error) {
    console.error("[Database] Error updating FAQ:", error);
    throw error;
  }
}

export async function deleteFAQ(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.delete(faqs).where(eq(faqs.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Error deleting FAQ:", error);
    throw error;
  }
}

// ============ BANNERS ============

export async function getBanners(limit = 100) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(banners)
      .where(eq(banners.isActive, true))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Error fetching banners:", error);
    return [];
  }
}

export async function getBannerById(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(banners)
      .where(eq(banners.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching banner:", error);
    return null;
  }
}

export async function createBanner(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(banners).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("[Database] Error creating banner:", error);
    throw error;
  }
}

export async function updateBanner(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db
      .update(banners)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(banners.id, id))
      .returning();

    return result[0];
  } catch (error) {
    console.error("[Database] Error updating banner:", error);
    throw error;
  }
}

export async function deleteBanner(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.delete(banners).where(eq(banners.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Error deleting banner:", error);
    throw error;
  }
}

// ============ HOMEPAGE SECTIONS ============

export async function getHomepageSections() {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(homepageSections)
      .where(eq(homepageSections.isVisible, true));
  } catch (error) {
    console.error("[Database] Error fetching homepage sections:", error);
    return [];
  }
}

export async function getHomepageSectionById(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(homepageSections)
      .where(eq(homepageSections.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching homepage section:", error);
    return null;
  }
}

export async function createHomepageSection(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db
      .insert(homepageSections)
      .values(data)
      .returning();
    return result[0];
  } catch (error) {
    console.error("[Database] Error creating homepage section:", error);
    throw error;
  }
}

export async function updateHomepageSection(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db
      .update(homepageSections)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(homepageSections.id, id))
      .returning();

    return result[0];
  } catch (error) {
    console.error("[Database] Error updating homepage section:", error);
    throw error;
  }
}

// ============ SETTINGS ============

export async function getSetting(key: string) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(settings)
      .where(eq(settings.key, key))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching setting:", error);
    return null;
  }
}

export async function getAllSettings() {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select().from(settings);
  } catch (error) {
    console.error("[Database] Error fetching settings:", error);
    return [];
  }
}

export async function setSetting(key: string, value: string, type = "string") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const existing = await getSetting(key);

    if (existing) {
      const result = await db
        .update(settings)
        .set({ value, type, updatedAt: new Date() })
        .where(eq(settings.key, key))
        .returning();

      return result[0];
    } else {
      const result = await db
        .insert(settings)
        .values({ key, value, type })
        .returning();

      return result[0];
    }
  } catch (error) {
    console.error("[Database] Error setting value:", error);
    throw error;
  }
}

// ============ CONTACT INQUIRIES ============

export async function getContactInquiries(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(contactInquiries)
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error("[Database] Error fetching contact inquiries:", error);
    return [];
  }
}

export async function getContactInquiryById(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(contactInquiries)
      .where(eq(contactInquiries.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching contact inquiry:", error);
    return null;
  }
}

export async function createContactInquiry(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db
      .insert(contactInquiries)
      .values(data)
      .returning();
    return result[0];
  } catch (error) {
    console.error("[Database] Error creating contact inquiry:", error);
    throw error;
  }
}

export async function updateContactInquiry(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db
      .update(contactInquiries)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(contactInquiries.id, id))
      .returning();

    return result[0];
  } catch (error) {
    console.error("[Database] Error updating contact inquiry:", error);
    throw error;
  }
}

export async function deleteContactInquiry(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.delete(contactInquiries).where(eq(contactInquiries.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Error deleting contact inquiry:", error);
    throw error;
  }
}

// ============ NEWSLETTER SUBSCRIPTIONS ============

export async function getNewsletterSubscriptions(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.isActive, true))
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error("[Database] Error fetching newsletter subscriptions:", error);
    return [];
  }
}

export async function subscribeNewsletter(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const existing = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, email))
      .limit(1);

    if (existing.length > 0) {
      // Reactivate if previously unsubscribed
      const result = await db
        .update(newsletterSubscriptions)
        .set({ isActive: true, unsubscribedAt: null })
        .where(eq(newsletterSubscriptions.email, email))
        .returning();

      return result[0];
    } else {
      const result = await db
        .insert(newsletterSubscriptions)
        .values({ email, isActive: true })
        .returning();

      return result[0];
    }
  } catch (error) {
    console.error("[Database] Error subscribing to newsletter:", error);
    throw error;
  }
}

export async function unsubscribeNewsletter(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db
      .update(newsletterSubscriptions)
      .set({ isActive: false, unsubscribedAt: new Date() })
      .where(eq(newsletterSubscriptions.email, email))
      .returning();

    return result[0];
  } catch (error) {
    console.error("[Database] Error unsubscribing from newsletter:", error);
    throw error;
  }
}

// ============ MEDIA LIBRARY ============

export async function getMediaFiles(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(mediaLibrary)
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error("[Database] Error fetching media files:", error);
    return [];
  }
}

export async function getMediaFileById(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db
      .select()
      .from(mediaLibrary)
      .where(eq(mediaLibrary.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching media file:", error);
    return null;
  }
}

export async function createMediaFile(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const result = await db.insert(mediaLibrary).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("[Database] Error creating media file:", error);
    throw error;
  }
}

export async function deleteMediaFile(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.delete(mediaLibrary).where(eq(mediaLibrary.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Error deleting media file:", error);
    throw error;
  }
}
