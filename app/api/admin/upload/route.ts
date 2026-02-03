import { NextResponse } from "next/server";
import { saveUploadedFile } from "@/lib/admin";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder") as string | null;
    if (!file || !folder) {
      return NextResponse.json(
        { error: "Envie 'file' e 'folder' (projects ou certificates)" },
        { status: 400 }
      );
    }
    if (folder !== "projects" && folder !== "certificates") {
      return NextResponse.json({ error: "folder deve ser 'projects' ou 'certificates'" }, { status: 400 });
    }
    const path = await saveUploadedFile(folder, file);
    return NextResponse.json({ path });
  } catch (e) {
    return NextResponse.json({ error: "Erro ao fazer upload" }, { status: 500 });
  }
}
