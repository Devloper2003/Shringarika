import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, occasion, message, type = 'general', source = 'website' } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    const inquiry = await db.inquiry.create({
      data: {
        name,
        phone: phone || null,
        email: email || null,
        occasion: occasion || null,
        message,
        type,
        source,
      },
    });

    // TODO: Send email notification via Resend API
    // await sendEmail({ to: 'hello@shringarika.com', subject: `New contact message from ${name}`, ... });

    return NextResponse.json(
      { success: true, id: inquiry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit message' },
      { status: 500 }
    );
  }
}
