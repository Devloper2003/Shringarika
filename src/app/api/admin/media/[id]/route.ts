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
    const media = await db.mediaUpload.findUnique({ where: { id } });

    if (!media) {
      return NextResponse.json({ success: false, message: 'Media not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: media });
  } catch (error) {
    console.error('Media get error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch media upload' },
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
    const existing = await db.mediaUpload.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ success: false, message: 'Media not found' }, { status: 404 });
    }

    const body = await request.json();
    const updateData: Record<string, unknown> = {};

    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
    if (body.publicId !== undefined) updateData.publicId = body.publicId;
    if (body.altText !== undefined) updateData.altText = body.altText;
    if (body.tags !== undefined) updateData.tags = body.tags;
    if (body.featured !== undefined) updateData.featured = body.featured;
    if (body.active !== undefined) updateData.active = body.active;

    const media = await db.mediaUpload.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: media });
  } catch (error) {
    console.error('Media update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update media upload' },
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
    const existing = await db.mediaUpload.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ success: false, message: 'Media not found' }, { status: 404 });
    }

    await db.mediaUpload.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Media upload deleted' });
  } catch (error) {
    console.error('Media delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete media upload' },
      { status: 500 }
    );
  }
}
