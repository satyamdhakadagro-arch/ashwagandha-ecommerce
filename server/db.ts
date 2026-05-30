import { eq, desc, and, like, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
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
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Product queries
export async function getProducts(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(products).where(eq(products.isActive, true)).orderBy(desc(products.displayOrder));
  return limit ? await query.limit(limit) : await query;
}

export async function getFeaturedProducts(limit: number = 6) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(products)
    .where(and(eq(products.isActive, true), eq(products.isFeatured, true)))
    .limit(limit);
}

export async function getBestSellerProducts(limit: number = 6) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(products)
    .where(and(eq(products.isActive, true), eq(products.isBestSeller, true)))
    .limit(limit);
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createProduct(data: any) {
  const db = await getDb();
  if (!db) return null;
  const slug = data.name.toLowerCase().replace(/\s+/g, '-');
  const result = await db.insert(products).values({
    ...data,
    slug,
    isActive: true,
    displayOrder: 0,
  });
  return result;
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.update(products).set({ isActive: false }).where(eq(products.id, id));
  return result;
}

export async function getCategories() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(categories).where(eq(categories.isActive, true)).orderBy(desc(categories.displayOrder));
}

// Blog queries
export async function getBlogPosts(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  const query = db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.isPublished, true))
    .orderBy(desc(blogPosts.publishedAt));
  return limit ? await query.limit(limit) : await query;
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// FAQ queries
export async function getFAQs() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(faqs).where(eq(faqs.isActive, true)).orderBy(desc(faqs.displayOrder));
}

// Banner queries
export async function getBanners(type?: string) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(banners.isActive, true)];
  if (type) {
    conditions.push(eq(banners.type, type as any));
  }
  return await db.select().from(banners).where(and(...conditions)).orderBy(desc(banners.displayOrder));
}

// Homepage sections
export async function getHomepageSections() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(homepageSections).where(eq(homepageSections.isVisible, true)).orderBy(desc(homepageSections.displayOrder));
}

// Reviews
export async function getProductReviews(productId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(reviews).where(and(eq(reviews.productId, productId), eq(reviews.isApproved, true)));
}

// Settings
export async function getSetting(key: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllSettings() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(settings);
}

// Contact inquiries
export async function createContactInquiry(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(contactInquiries).values(data);
  return result;
}

// Newsletter
export async function subscribeNewsletter(email: string, name?: string) {
  const db = await getDb();
  if (!db) return null;
  try {
    const result = await db.insert(newsletterSubscriptions).values({ email, name });
    return result;
  } catch (error) {
    // Email might already exist
    return null;
  }
}

// Orders
export async function getOrders(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(orders).orderBy(desc(orders.createdAt));
  return limit ? await query.limit(limit) : await query;
}

export async function createOrder(data: {
  orderNumber: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  shippingAddress?: string;
  items: any;
  subtotal: string;
  total: string;
  tax?: string;
  shipping?: string;
}) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(orders).values(data);
  return result;
}

// Customers
export async function getOrCreateCustomer(email: string, data: any) {
  const db = await getDb();
  if (!db) return null;
  
  try {
    const existing = await db.select().from(customers).where(eq(customers.email, email)).limit(1);
    if (existing.length > 0) {
      return existing[0];
    }
    
    const result = await db.insert(customers).values({ email, ...data });
    return result;
  } catch (error) {
    console.error("Error managing customer:", error);
    return null;
  }
}

// ============ ADMIN CRUD OPERATIONS ============

// Category Management
export async function createCategory(data: {
  name: string;
  nameHi?: string;
  description?: string;
  descriptionHi?: string;
}) {
  const db = await getDb();
  if (!db) return null;
  const slug = data.name.toLowerCase().replace(/\s+/g, '-');
  const result = await db.insert(categories).values({
    name: data.name,
    nameHi: data.nameHi || '',
    slug,
    description: data.description,
    descriptionHi: data.descriptionHi,
    displayOrder: 0,
  });
  return result;
}

export async function updateCategory(id: number, data: any) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.update(categories).set(data).where(eq(categories.id, id));
  return result;
}

export async function deleteCategory(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.update(categories).set({ isActive: false }).where(eq(categories.id, id));
  return result;
}

// Product Management - Update
export async function updateProduct(id: number, data: any) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.update(products).set(data).where(eq(products.id, id));
  return result;
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Blog Post Management
export async function createBlogPost(data: {
  title: string;
  titleHi?: string;
  excerpt?: string;
  excerptHi?: string;
  content: string;
  contentHi?: string;
  author?: string;
  isPublished?: boolean;
}) {
  const db = await getDb();
  if (!db) return null;
  const slug = data.title.toLowerCase().replace(/\s+/g, '-');
  const result = await db.insert(blogPosts).values({
    slug,
    title: data.title,
    titleHi: data.titleHi || '',
    excerpt: data.excerpt || '',
    excerptHi: data.excerptHi || '',
    content: data.content,
    contentHi: data.contentHi || '',
    author: data.author || 'Admin',
    isPublished: data.isPublished ?? false,
    publishedAt: data.isPublished ? new Date() : null,
  });
  return result;
}

export async function updateBlogPost(id: number, data: any) {
  const db = await getDb();
  if (!db) return null;
  if (data.isPublished && !data.publishedAt) {
    data.publishedAt = new Date();
  }
  const result = await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
  return result;
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
  return result;
}

export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
}

// FAQ Management
export async function createFAQ(data: {
  question: string;
  questionHi?: string;
  answer: string;
  answerHi?: string;
}) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(faqs).values({
    question: data.question,
    questionHi: data.questionHi || '',
    answer: data.answer,
    answerHi: data.answerHi || '',
    displayOrder: 0,
  });
  return result;
}

export async function updateFAQ(id: number, data: any) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.update(faqs).set(data).where(eq(faqs.id, id));
  return result;
}

export async function deleteFAQ(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.update(faqs).set({ isActive: false }).where(eq(faqs.id, id));
  return result;
}

export async function getAllFAQs() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(faqs).orderBy(desc(faqs.displayOrder));
}

// Review Management
export async function getAllReviews(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(reviews).orderBy(desc(reviews.createdAt));
  return limit ? await query.limit(limit) : await query;
}

export async function updateReview(id: number, data: any) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.update(reviews).set(data).where(eq(reviews.id, id));
  return result;
}

export async function deleteReview(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.delete(reviews).where(eq(reviews.id, id));
  return result;
}

// Order Management
export async function updateOrderStatus(id: number, status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled') {
  const db = await getDb();
  if (!db) return null;
  const result = await db.update(orders).set({ status }).where(eq(orders.id, id));
  return result;
}

export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Customer Management
export async function getAllCustomers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(customers).orderBy(desc(customers.createdAt));
}

export async function getCustomerById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(customers).where(eq(customers.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Settings Management
export async function updateSetting(key: string, value: string) {
  const db = await getDb();
  if (!db) return null;
  
  try {
    const existing = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
    if (existing.length > 0) {
      return await db.update(settings).set({ value }).where(eq(settings.key, key));
    } else {
      return await db.insert(settings).values({ key, value });
    }
  } catch (error) {
    console.error("Error updating setting:", error);
    return null;
  }
}

export async function updateSettings(data: Record<string, string>) {
  const db = await getDb();
  if (!db) return null;
  
  try {
    const results = [];
    for (const [key, value] of Object.entries(data)) {
      const existing = await db.select().from(settings).where(eq(settings.key, key)).limit(1);
      if (existing.length > 0) {
        results.push(await db.update(settings).set({ value }).where(eq(settings.key, key)));
      } else {
        results.push(await db.insert(settings).values({ key, value }));
      }
    }
    return results;
  } catch (error) {
    console.error("Error updating settings:", error);
    return null;
  }
}

// Contact Inquiries
export async function getAllContactInquiries() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
}

export async function getContactInquiryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(contactInquiries).where(eq(contactInquiries.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Banner Management
export async function createBanner(data: {
  title: string;
  titleHi: string;
  image: string;
  type: 'hero' | 'promotional' | 'featured';
  link?: string;
  description?: string;
  descriptionHi?: string;
}) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(banners).values({
    title: data.title,
    titleHi: data.titleHi,
    image: data.image,
    type: data.type,
    link: data.link,
    description: data.description,
    descriptionHi: data.descriptionHi,
    displayOrder: 0,
  });
  return result;
}

export async function updateBanner(id: number, data: any) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.update(banners).set(data).where(eq(banners.id, id));
  return result;
}

export async function deleteBanner(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.update(banners).set({ isActive: false }).where(eq(banners.id, id));
  return result;
}

export async function getAllBanners() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(banners).orderBy(desc(banners.displayOrder));
}

// Homepage Sections Management
export async function updateHomepageSection(id: number, data: any) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.update(homepageSections).set(data).where(eq(homepageSections.id, id));
  return result;
}

export async function getAllHomepageSections() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(homepageSections).orderBy(desc(homepageSections.displayOrder));
}

// Media Library
export async function createMediaFile(data: {
  filename: string;
  url: string;
  mimeType?: string;
  size?: number;
}) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(mediaLibrary).values(data);
  return result;
}

export async function getAllMediaFiles() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(mediaLibrary).orderBy(desc(mediaLibrary.createdAt));
}

export async function deleteMediaFile(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.delete(mediaLibrary).where(eq(mediaLibrary.id, id));
  return result;
}


