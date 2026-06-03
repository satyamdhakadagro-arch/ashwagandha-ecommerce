import { COOKIE_NAME } from "@shared/const";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(() => {
      // Clerk handles logout on the client side
      // This endpoint just confirms the request was processed
      return {
        success: true,
      } as const;
    }),
  }),

  // Public endpoints
  products: router({
    list: publicProcedure.query(async () => {
      return await db.getProducts();
    }),
    featured: publicProcedure.query(async () => {
      return await db.getFeaturedProducts();
    }),
    bestSellers: publicProcedure.query(async () => {
      return await db.getBestSellerProducts();
    }),
    bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
      return await db.getProductBySlug(input.slug);
    }),
    // Admin endpoints
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        nameHi: z.string().optional(),
        description: z.string().optional(),
        descriptionHi: z.string().optional(),
        shortDescription: z.string().optional(),
        shortDescriptionHi: z.string().optional(),
        price: z.number(),
        categoryId: z.number(),
        stock: z.number(),
        isBestSeller: z.boolean().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
        return await db.createProduct(input);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
        return await db.deleteProduct(input.id);
      }),
  }),

  categories: router({
    list: publicProcedure.query(async () => {
      return await db.getCategories();
    }),
  }),

  blog: router({
    list: publicProcedure.query(async () => {
      return await db.getBlogPosts();
    }),
    bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
      return await db.getBlogPostBySlug(input.slug);
    }),
  }),

  faqs: router({
    list: publicProcedure.query(async () => {
      return await db.getFAQs();
    }),
  }),

  banners: router({
    list: publicProcedure.input(z.object({ type: z.string().optional() })).query(async ({ input }) => {
      return await db.getBanners();
    }),
  }),

  homepage: router({
    sections: publicProcedure.query(async () => {
      return await db.getHomepageSections();
    }),
  }),

  reviews: router({
    byProduct: publicProcedure.input(z.object({ productId: z.number() })).query(async ({ input }) => {
      return await db.getReviewsByProductId(input.productId);
    }),
  }),

  settings: router({
    get: publicProcedure.input(z.object({ key: z.string() })).query(async ({ input }) => {
      return await db.getSetting(input.key);
    }),
    all: publicProcedure.query(async () => {
      return await db.getAllSettings();
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          subject: z.string().min(1),
          message: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        return await db.createContactInquiry(input);
      }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        return await db.subscribeNewsletter(input.email);
      }),
  }),

  orders: router({
    create: publicProcedure
      .input(
        z.object({
          customerId: z.number(),
          totalAmount: z.string(),
          status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).optional(),
          paymentStatus: z.enum(['pending', 'completed', 'failed']).optional(),
          shippingAddress: z.string().optional(),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const orderNumber = `ORD-${Date.now()}`;
        return await db.createOrder({ orderNumber, ...input });
      }),
  }),

  // Admin endpoints
  admin: router({
    dashboard: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      return { success: true };
    }),
  }),

  // Banner Management
  adminBanners: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
      return await db.getBanners();
    }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        titleHi: z.string(),
        image: z.string(),
        type: z.enum(['hero', 'promotional', 'featured']),
        link: z.string().optional(),
        description: z.string().optional(),
        descriptionHi: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
        return await db.createBanner(input);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        titleHi: z.string().optional(),
        image: z.string().optional(),
        type: z.enum(['hero', 'promotional', 'featured']).optional(),
        link: z.string().optional(),
        description: z.string().optional(),
        descriptionHi: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
        const { id, ...data } = input;
        return await db.updateBanner(id, data);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
        return await db.deleteBanner(input.id);
      }),
  }),

  // Homepage Sections Management
  adminHomepage: router({
    sections: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
      return await db.getHomepageSections();
    }),
    updateSection: protectedProcedure
      .input(z.object({
        id: z.number(),
        isVisible: z.boolean().optional(),
        displayOrder: z.number().optional(),
        content: z.string().optional(),
        contentHi: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
        const { id, ...data } = input;
        return await db.updateHomepageSection(id, data);
      }),
  }),

  // Contact Inquiries Management
  adminInquiries: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
      return await db.getContactInquiries();
    }),
    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
        return await db.getContactInquiryById(input.id);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
