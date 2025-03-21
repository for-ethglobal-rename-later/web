import { NextResponse } from 'next/server';

let creations = [
  { id: '1', title: 'my first little creation' },
  { id: '2', title: 'another cool project' },
  { id: '3', title: 'awesome AI experiment' },
];

export async function GET() {
  return NextResponse.json(creations);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newId = (creations.length + 1).toString();

  const newCreation = {
    id: newId,
    title: body.title,
  };

  creations.push(newCreation);

  return NextResponse.json(newCreation);
}
