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
    const link = await db.socialLink.findUnique({ where: { id } });

    if (!link) {
      return NextResponse.json({ success: false, message: 'Social link not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: link });
  } catch (error) {
    console.error('Social link get error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch social link' },
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
    const existing = await db.socialLink.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ success: false, message: 'Social link not found' }, { status: 404 });
    }

    const body = await request.json();
    const updateData: Record<string, unknown> = {};

    if (body.platform !== undefined) {
      if (body.platform !== existing.platform) {
        const duplicate = await db.socialLink.findUnique({ where: { platform: body.platform } });
        if (duplicate) {
          return NextResponse.json(
            { success: false, message: 'A social link for this platform already exists' },
            { status: 409 }
          );
        }
      }
      updateData.platform = body.platform;
    }
    if (body.url !== undefined) updateData.url = body.url;
    if (body.username !== undefined) updateData.username = body.username;
    if (body.icon !== undefined) updateData.icon = body.icon;
    if (body.showInFooter !== undefined) updateData.showInFooter = body.showInFooter;
    if (body.showInHeader !== undefined) updateData.showInHeader = body.showInHeader;
    if (body.order !== undefined) updateData.order = body.order;
    if (body.active !== undefined) updateData.active = body.active;

    const link = await db.socialLink.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: link });
  } catch (error) {
    console.error('Social link update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update social link' },
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
    const existing = await db.socialLink.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ success: false, message: 'Social link not found' }, { status: 404 });
    }

    await db.socialLink.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Social link deleted' });
  } catch (error) {
    console.error('Social link delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete social link' },
      { status: 500 }
    );
  }
}
