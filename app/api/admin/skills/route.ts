import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/admin";

export async function GET() {
  try {
    const data = await readJson<Record<string, unknown>>("skills.json");
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao ler skills" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await writeJson("skills.json", body);
    return NextResponse.json(body);
  } catch (e) {
    return NextResponse.json({ error: "Erro ao atualizar skills" }, { status: 500 });
  }
}
