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

    const existing = await db.galleryImage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
    }

    const image = await db.galleryImage.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
        ...(body.featured !== undefined && { featured: body.featured }),
        ...(body.active !== undefined && { active: body.active }),
      },
    });

    return NextResponse.json({ success: true, image });
  } catch (error) {
    console.error('Gallery update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update gallery image' },
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
    const existing = await db.galleryImage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
    }

    await db.galleryImage.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    console.error('Gallery delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete gallery image' },
      { status: 500 }
    );
  }
}
