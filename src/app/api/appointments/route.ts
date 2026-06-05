import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, appointmentType, occasion, preferredDate, preferredTime, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    const appointment = await db.appointment.create({
      data: {
        name,
        phone,
        email: email || null,
        appointmentType: appointmentType || 'styling',
        occasion: occasion || null,
        preferredDate: preferredDate || null,
        preferredTime: preferredTime || null,
        message: message || null,
      },
    });

    // TODO: Send confirmation email via Resend API
    // TODO: Send admin notification email

    return NextResponse.json(
      { success: true, id: appointment.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Appointment booking error:', error);
    return NextResponse.json(
      { error: 'Failed to book appointment' },
      { status: 500 }
    );
  }
}
