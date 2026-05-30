CREATE TABLE "banners" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"image" varchar(500) NOT NULL,
	"link" varchar(500),
	"type" "bannerType" DEFAULT 'promotional',
	"displayOrder" integer DEFAULT 0,
	"isActive" boolean DEFAULT true,
	"startDate" date,
	"endDate" date,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blogPosts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"titleHi" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"contentHi" text NOT NULL,
	"excerpt" varchar(500),
	"excerptHi" varchar(500),
	"image" varchar(500),
	"author" varchar(255),
	"status" "blogStatus" DEFAULT 'draft',
	"views" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blogPosts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"nameHi" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"descriptionHi" text,
	"image" varchar(500),
	"metaTitle" varchar(255),
	"metaDescription" varchar(500),
	"isActive" boolean DEFAULT true,
	"displayOrder" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "contactInquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(20),
	"subject" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"status" "inquiryStatus" DEFAULT 'new',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"phone" varchar(20),
	"address" text,
	"city" varchar(100),
	"state" varchar(100),
	"zipCode" varchar(20),
	"country" varchar(100),
	"totalOrders" integer DEFAULT 0,
	"totalSpent" numeric(12, 2) DEFAULT '0',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "customers_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" varchar(500) NOT NULL,
	"questionHi" varchar(500) NOT NULL,
	"answer" text NOT NULL,
	"answerHi" text NOT NULL,
	"category" varchar(100),
	"displayOrder" integer DEFAULT 0,
	"isActive" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "homepageSections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"title" varchar(255),
	"description" text,
	"content" json,
	"displayOrder" integer DEFAULT 0,
	"isVisible" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mediaLibrary" (
	"id" serial PRIMARY KEY NOT NULL,
	"filename" varchar(255) NOT NULL,
	"url" varchar(500) NOT NULL,
	"fileSize" integer,
	"mimeType" varchar(100),
	"uploadedBy" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletterSubscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"name" varchar(255),
	"isActive" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "newsletterSubscriptions_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"orderNumber" varchar(50) NOT NULL,
	"items" json NOT NULL,
	"totalAmount" numeric(10, 2) NOT NULL,
	"status" "orderStatus" DEFAULT 'pending',
	"paymentStatus" "paymentStatus" DEFAULT 'pending',
	"shippingAddress" text,
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "orders_orderNumber_unique" UNIQUE("orderNumber")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"categoryId" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"nameHi" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"descriptionHi" text,
	"price" numeric(10, 2) NOT NULL,
	"discountPrice" numeric(10, 2),
	"image" varchar(500),
	"gallery" json DEFAULT '[]'::json,
	"variant" "variant",
	"stock" integer DEFAULT 0,
	"isFeatured" boolean DEFAULT false,
	"isBestSeller" boolean DEFAULT false,
	"isActive" boolean DEFAULT true,
	"metaTitle" varchar(255),
	"metaDescription" varchar(500),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"productId" integer NOT NULL,
	"userId" integer NOT NULL,
	"rating" integer NOT NULL,
	"title" varchar(255),
	"comment" text,
	"status" "reviewStatus" DEFAULT 'pending',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(255) NOT NULL,
	"value" text,
	"type" varchar(50),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerkId" varchar(255) NOT NULL,
	"email" varchar(320) NOT NULL,
	"name" text,
	"avatar" varchar(500),
	"role" "role" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerkId_unique" UNIQUE("clerkId"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
