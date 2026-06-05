import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(
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
    const report = await db.aIReport.findUnique({ where: { id } });

    if (!report) {
      return NextResponse.json({ success: false, message: 'Report not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: report });
  } catch (error) {
    console.error('AI report get error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch AI report' },
      { status: 500 }
    );
  }
}

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
    const existing = await db.aIReport.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ success: false, message: 'Report not found' }, { status: 404 });
    }

    const body = await request.json();
    const updateData: Record<string, unknown> = {};

    if (body.isBookmarked !== undefined) updateData.isBookmarked = body.isBookmarked;
    if (body.title !== undefined) updateData.title = body.title;

    const report = await db.aIReport.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: report });
  } catch (error) {
    console.error('AI report update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update AI report' },
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

    if (!decoded || decoded.role !== 'super_admin') {
      return NextResponse.json({ success: false, message: 'Forbidden — super admin only' }, { status: 403 });
    }

    const { id } = await params;
    const existing = await db.aIReport.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ success: false, message: 'Report not found' }, { status: 404 });
    }

    await db.aIReport.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'AI report deleted' });
  } catch (error) {
    console.error('AI report delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete AI report' },
      { status: 500 }
    );
  }
}
