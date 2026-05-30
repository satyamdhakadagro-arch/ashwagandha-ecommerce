import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
  boolean,
  json,
  longtext,
  date,
  float,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Categories table for product organization
 */
export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameHi: varchar("nameHi", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  descriptionHi: text("descriptionHi"),
  image: varchar("image", { length: 500 }),
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: varchar("metaDescription", { length: 500 }),
  isActive: boolean("isActive").default(true),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Products table
 */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  nameHi: varchar("nameHi", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: longtext("description"),
  descriptionHi: longtext("descriptionHi"),
  shortDescription: varchar("shortDescription", { length: 500 }),
  shortDescriptionHi: varchar("shortDescriptionHi", { length: 500 }),
  price: varchar("price", { length: 20 }).notNull(),
  comparePrice: varchar("comparePrice", { length: 20 }),
  cost: varchar("cost", { length: 20 }),
  sku: varchar("sku", { length: 100 }).notNull().unique(),
  stock: int("stock").default(0),
  weight: varchar("weight", { length: 50 }),
  dimensions: varchar("dimensions", { length: 100 }),
  image: varchar("image", { length: 500 }),
  images: json("images"), // Array of image URLs
  variants: json("variants"), // Array of variants: {type, price, stock}
  benefits: json("benefits"), // Array of benefits
  benefitsHi: json("benefitsHi"),
  usage: text("usage"),
  usageHi: text("usageHi"),
  ingredients: text("ingredients"),
  ingredientsHi: text("ingredientsHi"),
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: varchar("metaDescription", { length: 500 }),
  metaKeywords: varchar("metaKeywords", { length: 500 }),
  isFeatured: boolean("isFeatured").default(false),
  isBestSeller: boolean("isBestSeller").default(false),
  isActive: boolean("isActive").default(true),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Product reviews table
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("productId").notNull(),
  customerId: int("customerId"),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }),
  rating: int("rating").notNull(), // 1-5
  title: varchar("title", { length: 255 }),
  comment: text("comment"),
  isApproved: boolean("isApproved").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Orders table
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  orderNumber: varchar("orderNumber", { length: 50 }).notNull().unique(),
  customerId: int("customerId"),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }),
  customerPhone: varchar("customerPhone", { length: 20 }).notNull(),
  shippingAddress: text("shippingAddress"),
  billingAddress: text("billingAddress"),
  items: json("items"), // Array of {productId, quantity, price}
  subtotal: varchar("subtotal", { length: 20 }).notNull(),
  tax: varchar("tax", { length: 20 }).default("0"),
  shipping: varchar("shipping", { length: 20 }).default("0"),
  total: varchar("total", { length: 20 }).notNull(),
  status: mysqlEnum("status", ["pending", "confirmed", "shipped", "delivered", "cancelled"]).default("pending"),
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "completed", "failed"]).default("pending"),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Customers table
 */
export const customers = mysqlTable("customers", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  zipCode: varchar("zipCode", { length: 20 }),
  country: varchar("country", { length: 100 }),
  totalOrders: int("totalOrders").default(0),
  totalSpent: varchar("totalSpent", { length: 20 }).default("0"),
  lastOrderDate: timestamp("lastOrderDate"),
  isSubscribed: boolean("isSubscribed").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = typeof customers.$inferInsert;

/**
 * Blog posts table
 */
export const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleHi: varchar("titleHi", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: longtext("content"),
  contentHi: longtext("contentHi"),
  excerpt: varchar("excerpt", { length: 500 }),
  excerptHi: varchar("excerptHi", { length: 500 }),
  image: varchar("image", { length: 500 }),
  author: varchar("author", { length: 255 }),
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: varchar("metaDescription", { length: 500 }),
  metaKeywords: varchar("metaKeywords", { length: 500 }),
  isPublished: boolean("isPublished").default(false),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * FAQs table
 */
export const faqs = mysqlTable("faqs", {
  id: int("id").autoincrement().primaryKey(),
  question: varchar("question", { length: 500 }).notNull(),
  questionHi: varchar("questionHi", { length: 500 }).notNull(),
  answer: text("answer"),
  answerHi: text("answerHi"),
  category: varchar("category", { length: 100 }),
  displayOrder: int("displayOrder").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FAQ = typeof faqs.$inferSelect;
export type InsertFAQ = typeof faqs.$inferInsert;

/**
 * Banners table for homepage and promotional banners
 */
export const banners = mysqlTable("banners", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleHi: varchar("titleHi", { length: 255 }).notNull(),
  image: varchar("image", { length: 500 }).notNull(),
  link: varchar("link", { length: 500 }),
  description: text("description"),
  descriptionHi: text("descriptionHi"),
  type: mysqlEnum("type", ["hero", "promotional", "featured"]).default("promotional"),
  displayOrder: int("displayOrder").default(0),
  isActive: boolean("isActive").default(true),
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Banner = typeof banners.$inferSelect;
export type InsertBanner = typeof banners.$inferInsert;

/**
 * Homepage sections configuration
 */
export const homepageSections = mysqlTable("homepageSections", {
  id: int("id").autoincrement().primaryKey(),
  sectionType: mysqlEnum("sectionType", [
    "hero",
    "featured_products",
    "best_sellers",
    "benefits",
    "why_choose_us",
    "reviews",
    "video",
    "blog_preview",
    "faq_preview",
    "contact_cta",
    "whatsapp_order",
    "newsletter",
    "social_feed",
  ]).notNull(),
  title: varchar("title", { length: 255 }),
  titleHi: varchar("titleHi", { length: 255 }),
  description: text("description"),
  descriptionHi: text("descriptionHi"),
  content: json("content"), // Flexible content based on section type
  image: varchar("image", { length: 500 }),
  displayOrder: int("displayOrder").default(0),
  isVisible: boolean("isVisible").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HomepageSection = typeof homepageSections.$inferSelect;
export type InsertHomepageSection = typeof homepageSections.$inferInsert;

/**
 * Contact inquiries table
 */
export const contactInquiries = mysqlTable("contactInquiries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "replied", "closed"]).default("new"),
  reply: text("reply"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type InsertContactInquiry = typeof contactInquiries.$inferInsert;

/**
 * Settings table for website configuration
 */
export const settings = mysqlTable("settings", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: longtext("value"),
  type: mysqlEnum("type", ["string", "json", "boolean", "number"]).default("string"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;

/**
 * Newsletter subscriptions
 */
export const newsletterSubscriptions = mysqlTable("newsletterSubscriptions", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = typeof newsletterSubscriptions.$inferInsert;

/**
 * Media library for uploaded files
 */
export const mediaLibrary = mysqlTable("mediaLibrary", {
  id: int("id").autoincrement().primaryKey(),
  filename: varchar("filename", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  fileType: varchar("fileType", { length: 50 }),
  fileSize: int("fileSize"),
  uploadedBy: int("uploadedBy"),
  altText: varchar("altText", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MediaFile = typeof mediaLibrary.$inferSelect;
export type InsertMediaFile = typeof mediaLibrary.$inferInsert;
