import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, desc, and, gte, lte } from "drizzle-orm";
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
let _client: ReturnType<typeof postgres> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _client = postgres(process.env.DATABASE_URL);
      _db = drizzle(_client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
      _client = null;
    }
  }
  return _db;
}

// ============ USER FUNCTIONS (Clerk Integration) ============

export async function createOrUpdateUser(user: InsertUser): Promise<void> {
  if (!user.clerkId) {
    throw new Error("User clerkId is required");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create/update user: database not available");
    return;
  }

  try {
    const existingUser = await db.select().from(users).where(eq(users.clerkId, user.clerkId)).limit(1);

    if (existingUser.length > 0) {
      // Update existing user
      await db.update(users).set({
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      }).where(eq(users.clerkId, user.clerkId));
    } else {
      // Create new user
      await db.insert(users).values({
        clerkId: user.clerkId,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      });
    }
  } catch (error) {
    console.error("[Database] Failed to create/update user:", error);
    throw error;
  }
}

export async function getUserByClerkId(clerkId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.clerkId, clerkId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ PRODUCT FUNCTIONS ============

export async function getActiveProducts() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(products).where(eq(products.isActive, true));
}

export async function getFeaturedProducts() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(products).where(and(eq(products.isActive, true), eq(products.isFeatured, true)));
}

export async function getBestSellerProducts() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(products).where(and(eq(products.isActive, true), eq(products.isBestSeller, true)));
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getProductsByCategory(categoryId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(products).where(and(eq(products.categoryId, categoryId), eq(products.isActive, true)));
}

export async function createProduct(product: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(products).values({
    ...product,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();

  return result[0];
}

export async function updateProduct(id: number, product: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.update(products).set({
    ...product,
    updatedAt: new Date(),
  }).where(eq(products.id, id)).returning();

  return result[0];
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(products).where(eq(products.id, id));
}

// ============ CATEGORY FUNCTIONS ============

export async function getCategories() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(categories).where(eq(categories.isActive, true));
}

export async function getCategoryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCategory(category: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(categories).values({
    ...category,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();

  return result[0];
}

export async function updateCategory(id: number, category: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.update(categories).set({
    ...category,
    updatedAt: new Date(),
  }).where(eq(categories.id, id)).returning();

  return result[0];
}

export async function deleteCategory(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(categories).where(eq(categories.id, id));
}

// ============ BLOG FUNCTIONS ============

export async function getBlogPosts() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(blogPosts).where(eq(blogPosts.status, "published")).orderBy(desc(blogPosts.createdAt));
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogPost(post: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(blogPosts).values({
    ...post,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();

  return result[0];
}

export async function updateBlogPost(id: number, post: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.update(blogPosts).set({
    ...post,
    updatedAt: new Date(),
  }).where(eq(blogPosts.id, id)).returning();

  return result[0];
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

// ============ FAQ FUNCTIONS ============

export async function getFAQs() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(faqs).where(eq(faqs.isActive, true));
}

export async function createFAQ(faq: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(faqs).values({
    ...faq,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();

  return result[0];
}

export async function updateFAQ(id: number, faq: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.update(faqs).set({
    ...faq,
    updatedAt: new Date(),
  }).where(eq(faqs.id, id)).returning();

  return result[0];
}

export async function deleteFAQ(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(faqs).where(eq(faqs.id, id));
}

// ============ BANNER FUNCTIONS ============

export async function getBanners() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(banners).where(eq(banners.isActive, true)).orderBy(banners.displayOrder);
}

export async function createBanner(banner: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(banners).values({
    ...banner,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();

  return result[0];
}

export async function updateBanner(id: number, banner: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.update(banners).set({
    ...banner,
    updatedAt: new Date(),
  }).where(eq(banners.id, id)).returning();

  return result[0];
}

export async function deleteBanner(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(banners).where(eq(banners.id, id));
}

// ============ HOMEPAGE SECTIONS FUNCTIONS ============

export async function getHomepageSections() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(homepageSections).where(eq(homepageSections.isVisible, true)).orderBy(homepageSections.displayOrder);
}

export async function updateHomepageSection(id: number, section: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.update(homepageSections).set({
    ...section,
    updatedAt: new Date(),
  }).where(eq(homepageSections.id, id)).returning();

  return result[0];
}

// ============ REVIEW FUNCTIONS ============

export async function getProductReviews(productId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(reviews).where(and(eq(reviews.productId, productId), eq(reviews.status, "approved")));
}

export async function getAllReviews() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(reviews);
}

export async function updateReviewStatus(id: number, status: "pending" | "approved" | "rejected") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.update(reviews).set({
    status,
    updatedAt: new Date(),
  }).where(eq(reviews.id, id)).returning();

  return result[0];
}

export async function deleteReview(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(reviews).where(eq(reviews.id, id));
}

// ============ ORDER FUNCTIONS ============

export async function getOrders() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateOrderStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.update(orders).set({
    status: status as any,
    updatedAt: new Date(),
  }).where(eq(orders.id, id)).returning();

  return result[0];
}

// ============ CUSTOMER FUNCTIONS ============

export async function getCustomers() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(customers);
}

export async function getCustomerById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(customers).where(eq(customers.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ SETTINGS FUNCTIONS ============

export async function getSetting(key: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllSettings() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(settings);
}

export async function updateSetting(key: string, value: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getSetting(key);
  if (existing) {
    await db.update(settings).set({
      value,
      updatedAt: new Date(),
    }).where(eq(settings.key, key));
  } else {
    await db.insert(settings).values({
      key,
      value,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

// ============ CONTACT INQUIRY FUNCTIONS ============

export async function getContactInquiries() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
}

export async function createContactInquiry(inquiry: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(contactInquiries).values({
    ...inquiry,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();

  return result[0];
}

export async function deleteContactInquiry(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(contactInquiries).where(eq(contactInquiries.id, id));
}

// ============ NEWSLETTER FUNCTIONS ============

export async function subscribeNewsletter(email: string, name?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(newsletterSubscriptions).values({
    email,
    name,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();

  return result[0];
}

// ============ MEDIA LIBRARY FUNCTIONS ============

export async function getMediaFiles() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(mediaLibrary).orderBy(desc(mediaLibrary.createdAt));
}

export async function createMediaFile(file: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(mediaLibrary).values({
    ...file,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();

  return result[0];
}

export async function deleteMediaFile(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(mediaLibrary).where(eq(mediaLibrary.id, id));
}
