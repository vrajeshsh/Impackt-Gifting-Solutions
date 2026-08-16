import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  console.log('Newsletter subscription:', body);
  
  return NextResponse.json({
    success: true,
    message: 'Thank you for subscribing!',
  });
}
