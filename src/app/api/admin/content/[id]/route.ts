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
    const content = await db.pageContent.findUnique({ where: { id } });

    if (!content) {
      return NextResponse.json({ success: false, message: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error('Content get error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch page content' },
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

    if (!decoded || decoded.role !== 'super_admin') {
      return NextResponse.json({ success: false, message: 'Forbidden — super admin only' }, { status: 403 });
    }

    const { id } = await params;
    const existing = await db.pageContent.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ success: false, message: 'Content not found' }, { status: 404 });
    }

    const body = await request.json();
    const updateData: Record<string, unknown> = {};

    if (body.page !== undefined) updateData.page = body.page;
    if (body.section !== undefined) updateData.section = body.section;
    if (body.title !== undefined) updateData.title = body.title;
    if (body.subtitle !== undefined) updateData.subtitle = body.subtitle;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
    if (body.order !== undefined) updateData.order = body.order;
    if (body.active !== undefined) updateData.active = body.active;

    if (body.page !== undefined || body.section !== undefined) {
      const checkPage = body.page ?? existing.page;
      const checkSection = body.section ?? existing.section;
      const duplicate = await db.pageContent.findUnique({
        where: { page_section: { page: checkPage, section: checkSection } },
      });
      if (duplicate && duplicate.id !== id) {
        return NextResponse.json(
          { success: false, message: 'Content for this page and section already exists' },
          { status: 409 }
        );
      }
    }

    const content = await db.pageContent.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update page content' },
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
    const existing = await db.pageContent.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ success: false, message: 'Content not found' }, { status: 404 });
    }

    await db.pageContent.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Page content deleted' });
  } catch (error) {
    console.error('Content delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete page content' },
      { status: 500 }
    );
  }
}
