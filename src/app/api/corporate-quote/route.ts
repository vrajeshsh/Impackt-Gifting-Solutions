import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  console.log('Corporate quote request:', body);
  
  return NextResponse.json({
    success: true,
    message: 'Quote request received. We will contact you within 24 hours.',
  });
}
