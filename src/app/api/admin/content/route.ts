import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const section = searchParams.get('section');

    const where: Record<string, unknown> = {};
    if (page) where.page = page;
    if (section) where.section = section;

    const contents = await db.pageContent.findMany({
      where,
      orderBy: [{ page: 'asc' }, { order: 'asc' }],
    });

    return NextResponse.json({ success: true, data: contents });
  } catch (error) {
    console.error('Content list error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch page contents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { page, section, title, subtitle, content, imageUrl, order, active } = body;

    if (!page || !section) {
      return NextResponse.json(
        { success: false, message: 'Page and section are required' },
        { status: 400 }
      );
    }

    const existing = await db.pageContent.findUnique({
      where: { page_section: { page, section } },
    });
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Content for this page and section already exists' },
        { status: 409 }
      );
    }

    const pageContent = await db.pageContent.create({
      data: {
        page,
        section,
        title: title || null,
        subtitle: subtitle || null,
        content: content || null,
        imageUrl: imageUrl || null,
        order: order ?? 0,
        active: active ?? true,
      },
    });

    return NextResponse.json({ success: true, data: pageContent }, { status: 201 });
  } catch (error) {
    console.error('Content create error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create page content' },
      { status: 500 }
    );
  }
}
