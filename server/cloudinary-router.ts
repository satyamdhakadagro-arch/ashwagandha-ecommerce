import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { uploadToCloudinary, deleteFromCloudinary, getOptimizedImageUrl } from "./cloudinary";

export const cloudinaryRouter = router({
  /**
   * Upload image to Cloudinary
   */
  uploadImage: protectedProcedure
    .input(
      z.object({
        base64: z.string().describe("Base64 encoded image data"),
        filename: z.string(),
        folder: z.string().optional().default("ashwagandha"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Convert base64 to buffer
        const buffer = Buffer.from(input.base64, "base64");

        // Upload to Cloudinary
        const result = await uploadToCloudinary(buffer, input.filename, input.folder);

        return {
          success: true,
          url: result.url,
          publicId: result.publicId,
        };
      } catch (error) {
        console.error("Upload failed:", error);
        throw new Error("Failed to upload image");
      }
    }),

  /**
   * Delete image from Cloudinary
   */
  deleteImage: protectedProcedure
    .input(
      z.object({
        publicId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }

      try {
        await deleteFromCloudinary(input.publicId);
        return { success: true };
      } catch (error) {
        console.error("Delete failed:", error);
        throw new Error("Failed to delete image");
      }
    }),

  /**
   * Get optimized image URL
   */
  getOptimizedUrl: publicProcedure
    .input(
      z.object({
        publicId: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
        quality: z.enum(["auto", "low", "medium", "high"]).optional().default("auto"),
      })
    )
    .query(({ input }) => {
      const url = getOptimizedImageUrl(
        input.publicId,
        input.width,
        input.height,
        input.quality
      );
      return { url };
    }),
});
