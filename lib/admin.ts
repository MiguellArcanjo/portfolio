import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const PUBLIC_DIR = path.join(process.cwd(), "public");

export async function readJson<T>(filename: string): Promise<T> {
  const filePath = path.join(DATA_DIR, filename);
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content) as T;
}

export async function writeJson(filename: string, data: unknown): Promise<void> {
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function getPublicDir(subdir: "projects" | "certificates"): string {
  return path.join(PUBLIC_DIR, subdir);
}

export async function saveUploadedFile(
  subdir: "projects" | "certificates",
  file: File
): Promise<string> {
  const dir = getPublicDir(subdir);
  await fs.mkdir(dir, { recursive: true });
  const ext = path.extname(file.name) || ".png";
  const base = path.basename(file.name, ext).replace(/\s+/g, "-");
  const filename = `${base}-${Date.now()}${ext}`;
  const filePath = path.join(dir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);
  return `/${subdir}/${filename}`;
}

export function getNextId<T extends { id: number }>(items: T[]): number {
  if (items.length === 0) return 1;
  return Math.max(...items.map((i) => i.id)) + 1;
}
