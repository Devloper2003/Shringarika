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
    const activeOnly = searchParams.get('active') === 'true';

    const where: Record<string, unknown> = {};
    if (activeOnly) where.active = true;

    const links = await db.socialLink.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ success: true, data: links });
  } catch (error) {
    console.error('Social links list error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch social links' },
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
    const { platform, url, username, icon, showInFooter, showInHeader, order, active } = body;

    if (!platform || !url) {
      return NextResponse.json(
        { success: false, message: 'Platform and URL are required' },
        { status: 400 }
      );
    }

    const existing = await db.socialLink.findUnique({ where: { platform } });
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'A social link for this platform already exists' },
        { status: 409 }
      );
    }

    const link = await db.socialLink.create({
      data: {
        platform,
        url,
        username: username || null,
        icon: icon || null,
        showInFooter: showInFooter ?? true,
        showInHeader: showInHeader ?? false,
        order: order ?? 0,
        active: active ?? true,
      },
    });

    return NextResponse.json({ success: true, data: link }, { status: 201 });
  } catch (error) {
    console.error('Social link create error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create social link' },
      { status: 500 }
    );
  }
}
