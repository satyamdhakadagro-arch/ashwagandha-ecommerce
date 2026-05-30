import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload file to Cloudinary
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  filename: string,
  folder: string = "ashwagandha"
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename.replace(/\.[^/.]+$/, ""), // Remove extension
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        } else {
          reject(new Error("Upload failed"));
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
}

/**
 * Delete file from Cloudinary
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Failed to delete from Cloudinary:", error);
    throw error;
  }
}

/**
 * Get optimized image URL with transformations
 */
export function getOptimizedImageUrl(
  publicId: string,
  width?: number,
  height?: number,
  quality: "auto" | "low" | "medium" | "high" = "auto"
): string {
  let url = cloudinary.url(publicId, {
    quality,
    fetch_format: "auto",
  });

  if (width || height) {
    url = cloudinary.url(publicId, {
      width,
      height,
      crop: "fill",
      gravity: "auto",
      quality,
      fetch_format: "auto",
    });
  }

  return url;
}

/**
 * Upload image from URL
 */
export async function uploadImageFromUrl(
  imageUrl: string,
  filename: string,
  folder: string = "ashwagandha"
): Promise<{ url: string; publicId: string }> {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder,
      public_id: filename.replace(/\.[^/.]+$/, ""),
      resource_type: "auto",
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Failed to upload image from URL:", error);
    throw error;
  }
}
