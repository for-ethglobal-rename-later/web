import { NextResponse } from 'next/server';

export async function POST() {
  const reply = 'The AI chatbot is still in the development phase. I am unable to assist you at the moment.';
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return NextResponse.json({ reply });
}
