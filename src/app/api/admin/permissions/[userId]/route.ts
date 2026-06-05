import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'super_admin') {
      return NextResponse.json({ success: false, message: 'Super admin access required' }, { status: 403 });
    }

    const { userId } = await params;

    const permission = await db.staffPermission.findUnique({
      where: { userId },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true }
        }
      }
    });

    if (!permission) {
      return NextResponse.json({ success: false, message: 'No permissions found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, permission });
  } catch (error) {
    console.error('Permission fetch error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch permission' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'super_admin') {
      return NextResponse.json({ success: false, message: 'Super admin access required' }, { status: 403 });
    }

    const { userId } = await params;

    await db.staffPermission.deleteMany({ where: { userId } });

    return NextResponse.json({ success: true, message: 'Permissions reset' });
  } catch (error) {
    console.error('Permission delete error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete permission' }, { status: 500 });
  }
}
