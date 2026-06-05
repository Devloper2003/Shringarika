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
    const theme = await db.themeConfig.findUnique({ where: { id } });

    if (!theme) {
      return NextResponse.json({ success: false, message: 'Theme not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: theme });
  } catch (error) {
    console.error('Theme get error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch theme' },
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
    const existing = await db.themeConfig.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ success: false, message: 'Theme not found' }, { status: 404 });
    }

    const body = await request.json();
    const updateData: Record<string, unknown> = {};

    if (body.name !== undefined) {
      if (body.name !== existing.name) {
        const duplicate = await db.themeConfig.findUnique({ where: { name: body.name } });
        if (duplicate) {
          return NextResponse.json(
            { success: false, message: 'A theme with this name already exists' },
            { status: 409 }
          );
        }
      }
      updateData.name = body.name;
    }
    if (body.label !== undefined) updateData.label = body.label;
    if (body.primaryColor !== undefined) updateData.primaryColor = body.primaryColor;
    if (body.secondaryColor !== undefined) updateData.secondaryColor = body.secondaryColor;
    if (body.accentColor !== undefined) updateData.accentColor = body.accentColor;
    if (body.backgroundColor !== undefined) updateData.backgroundColor = body.backgroundColor;
    if (body.textColor !== undefined) updateData.textColor = body.textColor;
    if (body.cardColor !== undefined) updateData.cardColor = body.cardColor;
    if (body.borderColor !== undefined) updateData.borderColor = body.borderColor;
    if (body.fontFamily !== undefined) updateData.fontFamily = body.fontFamily;
    if (body.headingFont !== undefined) updateData.headingFont = body.headingFont;
    if (body.bodyFont !== undefined) updateData.bodyFont = body.bodyFont;
    if (body.customCss !== undefined) updateData.customCss = body.customCss;
    if (body.showParticles !== undefined) updateData.showParticles = body.showParticles;
    if (body.showCursorEffect !== undefined) updateData.showCursorEffect = body.showCursorEffect;

    if (body.active === true) {
      await db.themeConfig.updateMany({
        where: { active: true },
        data: { active: false },
      });
      updateData.active = true;
    } else if (body.active === false) {
      updateData.active = false;
    }

    const theme = await db.themeConfig.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: theme });
  } catch (error) {
    console.error('Theme update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update theme' },
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
    const existing = await db.themeConfig.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ success: false, message: 'Theme not found' }, { status: 404 });
    }

    if (existing.active) {
      return NextResponse.json(
        { success: false, message: 'Cannot delete the active theme. Activate another theme first.' },
        { status: 400 }
      );
    }

    await db.themeConfig.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Theme deleted' });
  } catch (error) {
    console.error('Theme delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete theme' },
      { status: 500 }
    );
  }
}
