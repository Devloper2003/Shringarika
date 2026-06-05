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
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: Record<string, unknown> = {};
    if (category && category !== 'all') where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { altText: { contains: search } },
      ];
    }

    const media = await db.mediaUpload.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: media });
  } catch (error) {
    console.error('Media list error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch media uploads' },
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
    const { title, description, category, imageUrl, publicId, altText, tags, featured } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: 'Image URL is required' },
        { status: 400 }
      );
    }

    const media = await db.mediaUpload.create({
      data: {
        title: title || null,
        description: description || null,
        category: category || null,
        imageUrl,
        publicId: publicId || null,
        altText: altText || null,
        tags: tags || null,
        uploadedBy: decoded.userId,
        featured: featured ?? false,
      },
    });

    return NextResponse.json({ success: true, data: media }, { status: 201 });
  } catch (error) {
    console.error('Media create error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create media upload' },
      { status: 500 }
    );
  }
}
