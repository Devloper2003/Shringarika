import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'super_admin')) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await db.inquiry.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, message: 'Inquiry not found' }, { status: 404 });
    }

    const inquiry = await db.inquiry.update({
      where: { id },
      data: {
        ...(body.status !== undefined && { status: body.status }),
      },
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error('Inquiry update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'super_admin')) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const existing = await db.inquiry.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, message: 'Inquiry not found' }, { status: 404 });
    }

    await db.inquiry.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    console.error('Inquiry delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}
