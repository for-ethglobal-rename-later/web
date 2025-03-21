import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const reply = 'Bu otomatik bir yanıttır. Tüm mesajlara aynı yanıt gönderilmektedir.';
  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json({ reply });
}
