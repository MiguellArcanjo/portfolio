import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/admin";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await readJson<Array<Record<string, unknown> & { id: number }>>("certificates.json");
    const item = data.find((c) => String(c.id) === id);
    if (!item) return NextResponse.json({ error: "Certificado não encontrado" }, { status: 404 });
    return NextResponse.json(item);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao ler certificado" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = await readJson<Array<Record<string, unknown> & { id: number }>>("certificates.json");
    const index = data.findIndex((c) => String(c.id) === id);
    if (index === -1) return NextResponse.json({ error: "Certificado não encontrado" }, { status: 404 });
    data[index] = { ...data[index], ...body, id: data[index].id };
    await writeJson("certificates.json", data);
    return NextResponse.json(data[index]);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao atualizar certificado" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await readJson<Array<Record<string, unknown> & { id: number }>>("certificates.json");
    const filtered = data.filter((c) => String(c.id) !== id);
    if (filtered.length === data.length)
      return NextResponse.json({ error: "Certificado não encontrado" }, { status: 404 });
    await writeJson("certificates.json", filtered);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Erro ao excluir certificado" }, { status: 500 });
  }
}
