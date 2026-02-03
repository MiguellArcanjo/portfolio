import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      console.error("GMAIL_USER ou GMAIL_APP_PASSWORD não configurados no .env");
      return NextResponse.json(
        { error: "Serviço de e-mail não configurado. Verifique as variáveis de ambiente." },
        { status: 500 }
      );
    }

    // Configuração do transporter Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // E-mail que você receberá (pode ser o mesmo Gmail ou outro)
    const toEmail = process.env.CONTACT_EMAIL || gmailUser;

    await transporter.sendMail({
      from: `"Portfólio" <${gmailUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `Nova mensagem do portfólio - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">Nova mensagem do portfólio</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Mensagem:</strong></p>
          <p style="white-space: pre-wrap; background: #f3f4f6; padding: 1rem; border-radius: 8px;">${message}</p>
          <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">Enviado pelo formulário de contato do portfólio.</p>
        </div>
      `,
      text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    });

    return NextResponse.json(
      { message: "Mensagem enviada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
