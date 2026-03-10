import { readdir } from "fs/promises";
import path from "path";

async function getImages(dir: string, base: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const results: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const nested = await getImages(
        path.join(dir, entry.name),
        `${base}/${entry.name}`,
      );
      results.push(...nested);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      results.push(`${base}/${entry.name}`);
    }
  }

  return results;
}

export async function GET() {
  const dir = path.join(process.cwd(), "public/images");
  const images = await getImages(dir, "/images");
  return Response.json(images);
}
