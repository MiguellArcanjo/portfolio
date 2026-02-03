import { NextResponse } from "next/server";
import { readJson, writeJson, getNextId } from "@/lib/admin";

export async function GET() {
  try {
    const data = await readJson<Array<Record<string, unknown>>>("projects.json");
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao ler projetos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await readJson<Array<Record<string, unknown> & { id: number }>>("projects.json");
    const id = getNextId(data);
    const newItem = { ...body, id };
    data.push(newItem);
    await writeJson("projects.json", data);
    return NextResponse.json(newItem);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao criar projeto" }, { status: 500 });
  }
}
