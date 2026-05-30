import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
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
      return await db.getBanners(input.type);
    }),
  }),

  homepage: router({
    sections: publicProcedure.query(async () => {
      return await db.getHomepageSections();
    }),
  }),

  reviews: router({
    byProduct: publicProcedure.input(z.object({ productId: z.number() })).query(async ({ input }) => {
      return await db.getProductReviews(input.productId);
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
      .input(z.object({ email: z.string().email(), name: z.string().optional() }))
      .mutation(async ({ input }) => {
        return await db.subscribeNewsletter(input.email, input.name);
      }),
  }),

  orders: router({
    create: publicProcedure
      .input(
        z.object({
          customerName: z.string(),
          customerEmail: z.string().email().optional(),
          customerPhone: z.string(),
          shippingAddress: z.string().optional(),
          items: z.array(z.any()),
          subtotal: z.string(),
          total: z.string(),
          tax: z.string().optional(),
          shipping: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const orderNumber = `ORD-${Date.now()}`;
        return await db.createOrder({ orderNumber, ...input });
      }),
  }),

  // Protected endpoints (for future use)
  admin: router({
    dashboard: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      // Return dashboard data
      return { success: true };
    }),
  }),
});

export type AppRouter = typeof appRouter;
