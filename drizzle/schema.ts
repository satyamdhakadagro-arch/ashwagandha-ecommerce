import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  json,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * Core user table for Clerk authentication.
 * Clerk manages authentication, we store user metadata and role.
 */
export const users = pgTable(
  "users",
  {
    /** Database primary key (auto-increment) */
    id: serial("id").primaryKey(),
    /** Clerk user ID (unique identifier from Clerk) */
    clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
    /** User email from Clerk */
    email: varchar("email", { length: 320 }).notNull().unique(),
    /** User name from Clerk */
    name: varchar("name", { length: 255 }),
    /** User avatar URL from Clerk */
    avatarUrl: varchar("avatar_url", { length: 500 }),
    /** User role: admin or user */
    role: pgEnum("role", ["user", "admin"])("role").default("user").notNull(),
    /** Timestamps */
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    clerkIdIdx: uniqueIndex("clerk_id_idx").on(table.clerkId),
    emailIdx: uniqueIndex("email_idx").on(table.email),
  })
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Categories table for product organization
 */
export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    nameHi: varchar("name_hi", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    descriptionHi: text("description_hi"),
    image: varchar("image", { length: 500 }),
    isActive: boolean("is_active").default(true).notNull(),
    displayOrder: integer("display_order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex("categories_slug_idx").on(table.slug),
  })
);

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Products table with bilingual support and variants
 */
export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    categoryId: integer("category_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    nameHi: varchar("name_hi", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    descriptionHi: text("description_hi"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    discountPrice: decimal("discount_price", { precision: 10, scale: 2 }),
    image: varchar("image", { length: 500 }),
    gallery: json("gallery"), // Array of image URLs
    variant: varchar("variant", { length: 100 }), // Powder, Roots, Capsules, Extracts
    stock: integer("stock").default(0).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    isBestSeller: boolean("is_best_seller").default(false).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),
    displayOrder: integer("display_order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex("products_slug_idx").on(table.slug),
    categoryIdIdx: uniqueIndex("products_category_id_idx").on(table.categoryId),
  })
);

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Orders table
 */
export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").notNull(),
    orderNumber: varchar("order_number", { length: 50 }).notNull().unique(),
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
    status: pgEnum("order_status", [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ])("status")
      .default("pending")
      .notNull(),
    paymentStatus: pgEnum("payment_status", ["pending", "completed", "failed"])(
      "payment_status"
    )
      .default("pending")
      .notNull(),
    shippingAddress: text("shipping_address"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    orderNumberIdx: uniqueIndex("orders_order_number_idx").on(
      table.orderNumber
    ),
    customerIdIdx: uniqueIndex("orders_customer_id_idx").on(table.customerId),
  })
);

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Customers table
 */
export const customers = pgTable(
  "customers",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 320 }).notNull().unique(),
    phone: varchar("phone", { length: 20 }),
    address: text("address"),
    city: varchar("city", { length: 100 }),
    state: varchar("state", { length: 100 }),
    zipCode: varchar("zip_code", { length: 20 }),
    country: varchar("country", { length: 100 }),
    totalOrders: integer("total_orders").default(0).notNull(),
    totalSpent: decimal("total_spent", { precision: 10, scale: 2 }).default("0"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex("customers_email_idx").on(table.email),
  })
);

export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = typeof customers.$inferInsert;

/**
 * Reviews table
 */
export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    customerId: integer("customer_id").notNull(),
    rating: integer("rating").notNull(), // 1-5
    title: varchar("title", { length: 255 }),
    comment: text("comment"),
    status: pgEnum("review_status", ["pending", "approved", "rejected"])(
      "status"
    )
      .default("pending")
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    productIdIdx: uniqueIndex("reviews_product_id_idx").on(table.productId),
    customerIdIdx: uniqueIndex("reviews_customer_id_idx").on(table.customerId),
  })
);

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Blog posts table with bilingual support
 */
export const blogPosts = pgTable(
  "blog_posts",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    titleHi: varchar("title_hi", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    content: text("content"),
    contentHi: text("content_hi"),
    excerpt: text("excerpt"),
    excerptHi: text("excerpt_hi"),
    image: varchar("image", { length: 500 }),
    author: varchar("author", { length: 255 }),
    isPublished: boolean("is_published").default(false).notNull(),
    publishedAt: timestamp("published_at"),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex("blog_posts_slug_idx").on(table.slug),
  })
);

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * FAQs table with bilingual support
 */
export const faqs = pgTable(
  "faqs",
  {
    id: serial("id").primaryKey(),
    question: varchar("question", { length: 500 }).notNull(),
    questionHi: varchar("question_hi", { length: 500 }).notNull(),
    answer: text("answer"),
    answerHi: text("answer_hi"),
    category: varchar("category", { length: 100 }),
    displayOrder: integer("display_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);

export type FAQ = typeof faqs.$inferSelect;
export type InsertFAQ = typeof faqs.$inferInsert;

/**
 * Banners table for promotional content
 */
export const banners = pgTable(
  "banners",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    titleHi: varchar("title_hi", { length: 255 }).notNull(),
    description: text("description"),
    descriptionHi: text("description_hi"),
    image: varchar("image", { length: 500 }),
    link: varchar("link", { length: 500 }),
    type: varchar("type", { length: 100 }), // hero, promo, seasonal, etc
    displayOrder: integer("display_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);

export type Banner = typeof banners.$inferSelect;
export type InsertBanner = typeof banners.$inferInsert;

/**
 * Homepage sections table for managing homepage layout
 */
export const homepageSections = pgTable(
  "homepage_sections",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    type: varchar("type", { length: 100 }).notNull(), // featured, bestsellers, benefits, testimonials, blog, faq, newsletter, etc
    displayOrder: integer("display_order").default(0).notNull(),
    isVisible: boolean("is_visible").default(true).notNull(),
    content: json("content"), // Flexible JSON for section-specific data
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);

export type HomepageSection = typeof homepageSections.$inferSelect;
export type InsertHomepageSection = typeof homepageSections.$inferInsert;

/**
 * Settings table for website configuration
 */
export const settings = pgTable(
  "settings",
  {
    id: serial("id").primaryKey(),
    key: varchar("key", { length: 255 }).notNull().unique(),
    value: text("value"),
    type: varchar("type", { length: 50 }), // string, json, boolean, etc
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    keyIdx: uniqueIndex("settings_key_idx").on(table.key),
  })
);

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;

/**
 * Contact inquiries table
 */
export const contactInquiries = pgTable(
  "contact_inquiries",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    subject: varchar("subject", { length: 255 }),
    message: text("message"),
    status: pgEnum("inquiry_status", ["new", "read", "responded", "closed"])(
      "status"
    )
      .default("new")
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type InsertContactInquiry = typeof contactInquiries.$inferInsert;

/**
 * Newsletter subscriptions table
 */
export const newsletterSubscriptions = pgTable(
  "newsletter_subscriptions",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 320 }).notNull().unique(),
    isActive: boolean("is_active").default(true).notNull(),
    subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
    unsubscribedAt: timestamp("unsubscribed_at"),
  },
  (table) => ({
    emailIdx: uniqueIndex("newsletter_email_idx").on(table.email),
  })
);

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription =
  typeof newsletterSubscriptions.$inferInsert;

/**
 * Media library table
 */
export const mediaLibrary = pgTable(
  "media_library",
  {
    id: serial("id").primaryKey(),
    filename: varchar("filename", { length: 255 }).notNull(),
    url: varchar("url", { length: 500 }).notNull(),
    fileKey: varchar("file_key", { length: 500 }).notNull().unique(),
    mimeType: varchar("mime_type", { length: 100 }),
    fileSize: integer("file_size"),
    uploadedBy: integer("uploaded_by"), // User ID who uploaded
    uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    fileKeyIdx: uniqueIndex("media_file_key_idx").on(table.fileKey),
  })
);

export type MediaFile = typeof mediaLibrary.$inferSelect;
export type InsertMediaFile = typeof mediaLibrary.$inferInsert;
