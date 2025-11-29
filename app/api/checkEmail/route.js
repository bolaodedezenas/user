import { NextResponse } from 'next/server';
import { adminAuth } from '@/libs/firebase/firebaseAdmin';


export async function POST(req) {
  const body = await req.json();
  const email = body?.email;

  if (!email) {
    return NextResponse.json({ error: 'Email necessário' }, { status: 400 });
  }

  try {
    await adminAuth.getUserByEmail(email);
    return NextResponse.json({ exists: true });
  } catch (err) {
    return NextResponse.json({ exists: false }, { status: 404 });
  }
}
