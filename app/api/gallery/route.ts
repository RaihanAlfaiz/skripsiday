import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface MediaItem {
  src: string;
  type: "image" | "video";
}

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "gallery");

    if (!fs.existsSync(galleryDir)) {
      return NextResponse.json({ images: [], media: [] });
    }

    const files = fs.readdirSync(galleryDir);
    
    // Filter for valid image & video formats
    const validImageExts = [".jpg", ".jpeg", ".png", ".webp"];
    const validVideoExts = [".mp4", ".mov", ".webm"];

    const media: MediaItem[] = [];
    const images: string[] = [];

    files.forEach((file) => {
      const ext = path.extname(file).toLowerCase();
      const relativePath = `/gallery/${file}`;

      if (validImageExts.includes(ext)) {
        images.push(relativePath);
        media.push({ src: relativePath, type: "image" });
      } else if (validVideoExts.includes(ext)) {
        media.push({ src: relativePath, type: "video" });
      }
    });

    return NextResponse.json({ images, media });
  } catch (error) {
    console.error("Error reading gallery files:", error);
    return NextResponse.json({ images: [], media: [] }, { status: 500 });
  }
}
