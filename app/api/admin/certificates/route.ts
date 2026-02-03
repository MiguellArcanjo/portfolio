import { NextResponse } from "next/server";
import { readJson, writeJson, getNextId } from "@/lib/admin";

export async function GET() {
  try {
    const data = await readJson<Array<Record<string, unknown> & { id: number }>>("certificates.json");
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao ler certificados" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await readJson<Array<Record<string, unknown> & { id: number }>>("certificates.json");
    const id = getNextId(data);
    const newItem = { ...body, id };
    data.push(newItem);
    await writeJson("certificates.json", data);
    return NextResponse.json(newItem);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao criar certificado" }, { status: 500 });
  }
}
