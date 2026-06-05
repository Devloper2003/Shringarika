import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

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
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Theme ID is required' },
        { status: 400 }
      );
    }

    const theme = await db.themeConfig.findUnique({ where: { id } });
    if (!theme) {
      return NextResponse.json({ success: false, message: 'Theme not found' }, { status: 404 });
    }

    await db.themeConfig.updateMany({
      where: { active: true },
      data: { active: false },
    });

    const activated = await db.themeConfig.update({
      where: { id },
      data: { active: true },
    });

    return NextResponse.json({ success: true, data: activated });
  } catch (error) {
    console.error('Theme activate error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to activate theme' },
      { status: 500 }
    );
  }
}
