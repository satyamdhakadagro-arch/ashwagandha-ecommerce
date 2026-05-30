import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  json,
  decimal,
  integer,
  date,
} from "drizzle-orm/pg-core";

/**
 * PostgreSQL Schema for Neon Database
 * Clerk Authentication Integration
 * All tables support bilingual content (English + Hindi)
 */

/**
 * Users table - Clerk will manage authentication
 * We store Clerk user IDs and additional profile data
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerkId", { length: 255 }).notNull().unique(), // Clerk user ID
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: text("name"),
  avatar: varchar("avatar", { length: 500 }),
  role: pgEnum("role", ["user", "admin"])("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Categories table for product organization
 */
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameHi: varchar("nameHi", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  descriptionHi: text("descriptionHi"),
  image: varchar("image", { length: 500 }),
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: varchar("metaDescription", { length: 500 }),
  isActive: boolean("isActive").default(true),
  displayOrder: integer("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Products table with bilingual support
 */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  categoryId: integer("categoryId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  nameHi: varchar("nameHi", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  descriptionHi: text("descriptionHi"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  discountPrice: decimal("discountPrice", { precision: 10, scale: 2 }),
  image: varchar("image", { length: 500 }),
  gallery: json("gallery").$type<string[]>().default([]),
  variant: pgEnum("variant", ["Powder", "Roots", "Capsules", "Extracts"])("variant"),
  stock: integer("stock").default(0),
  isFeatured: boolean("isFeatured").default(false),
  isBestSeller: boolean("isBestSeller").default(false),
  isActive: boolean("isActive").default(true),
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: varchar("metaDescription", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Reviews table for product reviews
 */
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("productId").notNull(),
  userId: integer("userId").notNull(),
  rating: integer("rating").notNull(), // 1-5
  title: varchar("title", { length: 255 }),
  comment: text("comment"),
  status: pgEnum("reviewStatus", ["pending", "approved", "rejected"])("status").default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Orders table for order management
 */
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  orderNumber: varchar("orderNumber", { length: 50 }).notNull().unique(),
  items: json("items").$type<any[]>().notNull(),
  totalAmount: decimal("totalAmount", { precision: 10, scale: 2 }).notNull(),
  status: pgEnum("orderStatus", ["pending", "confirmed", "shipped", "delivered", "cancelled"])("status").default("pending"),
  paymentStatus: pgEnum("paymentStatus", ["pending", "completed", "failed"])("paymentStatus").default("pending"),
  shippingAddress: text("shippingAddress"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Customers table
 */
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  zipCode: varchar("zipCode", { length: 20 }),
  country: varchar("country", { length: 100 }),
  totalOrders: integer("totalOrders").default(0),
  totalSpent: decimal("totalSpent", { precision: 12, scale: 2 }).default("0"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = typeof customers.$inferInsert;

/**
 * Blog Posts table with bilingual support
 */
export const blogPosts = pgTable("blogPosts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleHi: varchar("titleHi", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  contentHi: text("contentHi").notNull(),
  excerpt: varchar("excerpt", { length: 500 }),
  excerptHi: varchar("excerptHi", { length: 500 }),
  image: varchar("image", { length: 500 }),
  author: varchar("author", { length: 255 }),
  status: pgEnum("blogStatus", ["draft", "published"])("status").default("draft"),
  views: integer("views").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * FAQs table with bilingual support
 */
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 500 }).notNull(),
  questionHi: varchar("questionHi", { length: 500 }).notNull(),
  answer: text("answer").notNull(),
  answerHi: text("answerHi").notNull(),
  category: varchar("category", { length: 100 }),
  displayOrder: integer("displayOrder").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type FAQ = typeof faqs.$inferSelect;
export type InsertFAQ = typeof faqs.$inferInsert;

/**
 * Banners table for promotional content
 */
export const banners = pgTable("banners", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  image: varchar("image", { length: 500 }).notNull(),
  link: varchar("link", { length: 500 }),
  type: pgEnum("bannerType", ["hero", "promotional", "seasonal", "featured"])("type").default("promotional"),
  displayOrder: integer("displayOrder").default(0),
  isActive: boolean("isActive").default(true),
  startDate: date("startDate"),
  endDate: date("endDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Banner = typeof banners.$inferSelect;
export type InsertBanner = typeof banners.$inferInsert;

/**
 * Homepage Sections table
 */
export const homepageSections = pgTable("homepageSections", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  content: json("content"),
  displayOrder: integer("displayOrder").default(0),
  isVisible: boolean("isVisible").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type HomepageSection = typeof homepageSections.$inferSelect;
export type InsertHomepageSection = typeof homepageSections.$inferInsert;

/**
 * Settings table for website configuration
 */
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value"),
  type: varchar("type", { length: 50 }), // "string", "json", "boolean", etc.
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;

/**
 * Contact Inquiries table
 */
export const contactInquiries = pgTable("contactInquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: pgEnum("inquiryStatus", ["new", "read", "responded"])("status").default("new"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type InsertContactInquiry = typeof contactInquiries.$inferInsert;

/**
 * Newsletter Subscriptions table
 */
export const newsletterSubscriptions = pgTable("newsletterSubscriptions", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = typeof newsletterSubscriptions.$inferInsert;

/**
 * Media Library table
 */
export const mediaLibrary = pgTable("mediaLibrary", {
  id: serial("id").primaryKey(),
  filename: varchar("filename", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  fileSize: integer("fileSize"),
  mimeType: varchar("mimeType", { length: 100 }),
  uploadedBy: integer("uploadedBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type MediaFile = typeof mediaLibrary.$inferSelect;
export type InsertMediaFile = typeof mediaLibrary.$inferInsert;
