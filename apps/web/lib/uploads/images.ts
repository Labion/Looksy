import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const uploadRoot = path.join(
  process.cwd(),
  "public",
  "uploads",
  "exhibit-images"
);

const maxImageSizeBytes = 8 * 1024 * 1024;

function safeExtension(filename: string, mimeType: string) {
  const extension = path.extname(filename).toLowerCase();

  if (/^\.(jpg|jpeg|png|gif|webp|avif)$/.test(extension)) {
    return extension;
  }

  switch (mimeType) {
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/gif":
      return ".gif";
    case "image/webp":
      return ".webp";
    case "image/avif":
      return ".avif";
    default:
      return "";
  }
}

export async function saveUploadedImage(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image uploads are supported.");
  }

  if (file.size <= 0) {
    throw new Error("Uploaded image is empty.");
  }

  if (file.size > maxImageSizeBytes) {
    throw new Error("Uploaded image must be 8 MB or smaller.");
  }

  await mkdir(uploadRoot, { recursive: true });

  const filename = `${new Date().toISOString().slice(0, 10)}-${randomUUID()}${safeExtension(
    file.name,
    file.type
  )}`;
  const diskPath = path.join(uploadRoot, filename);
  const publicPath = `/uploads/exhibit-images/${filename}`;

  await writeFile(diskPath, Buffer.from(await file.arrayBuffer()));

  return {
    filePath: publicPath,
    originalFilename: file.name,
    mimeType: file.type
  };
}
