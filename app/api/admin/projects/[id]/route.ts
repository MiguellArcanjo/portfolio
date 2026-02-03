import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/admin";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await readJson<Array<Record<string, unknown> & { id: number }>>("projects.json");
    const item = data.find((p) => String(p.id) === id);
    if (!item) return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 });
    return NextResponse.json(item);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao ler projeto" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = await readJson<Array<Record<string, unknown> & { id: number }>>("projects.json");
    const index = data.findIndex((p) => String(p.id) === id);
    if (index === -1) return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 });
    data[index] = { ...data[index], ...body, id: data[index].id };
    await writeJson("projects.json", data);
    return NextResponse.json(data[index]);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao atualizar projeto" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await readJson<Array<Record<string, unknown> & { id: number }>>("projects.json");
    const filtered = data.filter((p) => String(p.id) !== id);
    if (filtered.length === data.length)
      return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 });
    await writeJson("projects.json", filtered);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Erro ao excluir projeto" }, { status: 500 });
  }
}
