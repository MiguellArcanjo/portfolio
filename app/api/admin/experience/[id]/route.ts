import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/admin";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await readJson<Array<Record<string, unknown> & { id: number }>>("experience.json");
    const item = data.find((e) => String(e.id) === id);
    if (!item) return NextResponse.json({ error: "Experiência não encontrada" }, { status: 404 });
    return NextResponse.json(item);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao ler experiência" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = await readJson<Array<Record<string, unknown> & { id: number }>>("experience.json");
    const index = data.findIndex((e) => String(e.id) === id);
    if (index === -1) return NextResponse.json({ error: "Experiência não encontrada" }, { status: 404 });
    data[index] = { ...data[index], ...body, id: data[index].id };
    await writeJson("experience.json", data);
    return NextResponse.json(data[index]);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao atualizar experiência" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await readJson<Array<Record<string, unknown> & { id: number }>>("experience.json");
    const filtered = data.filter((e) => String(e.id) !== id);
    if (filtered.length === data.length)
      return NextResponse.json({ error: "Experiência não encontrada" }, { status: 404 });
    await writeJson("experience.json", filtered);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Erro ao excluir experiência" }, { status: 500 });
  }
}
