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

    const themes = await db.themeConfig.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: themes });
  } catch (error) {
    console.error('Theme list error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch themes' },
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
    const {
      name, label, primaryColor, secondaryColor, accentColor, backgroundColor,
      textColor, cardColor, borderColor, fontFamily, headingFont, bodyFont,
      customCss, showParticles, showCursorEffect, active,
    } = body;

    if (!name || !label) {
      return NextResponse.json(
        { success: false, message: 'Name and label are required' },
        { status: 400 }
      );
    }

    const existing = await db.themeConfig.findUnique({ where: { name } });
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'A theme with this name already exists' },
        { status: 409 }
      );
    }

    if (active) {
      await db.themeConfig.updateMany({
        where: { active: true },
        data: { active: false },
      });
    }

    const theme = await db.themeConfig.create({
      data: {
        name,
        label,
        primaryColor: primaryColor || '#B76E79',
        secondaryColor: secondaryColor || '#E8D9C0',
        accentColor: accentColor || '#B89840',
        backgroundColor: backgroundColor || '#F2EDE8',
        textColor: textColor || '#1A1A1A',
        cardColor: cardColor || '#F7F3EF',
        borderColor: borderColor || '#D4C2A5',
        fontFamily: fontFamily || 'Cormorant Garamond',
        headingFont: headingFont || 'Playfair Display',
        bodyFont: bodyFont || 'DM Sans',
        customCss: customCss || null,
        showParticles: showParticles ?? true,
        showCursorEffect: showCursorEffect ?? true,
        active: active ?? false,
      },
    });

    return NextResponse.json({ success: true, data: theme }, { status: 201 });
  } catch (error) {
    console.error('Theme create error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create theme' },
      { status: 500 }
    );
  }
}
