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

    if (!decoded || decoded.role !== 'super_admin') {
      return NextResponse.json({ success: false, message: 'Super admin access required' }, { status: 403 });
    }

    const permissions = await db.staffPermission.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true, isActive: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, permissions });
  } catch (error) {
    console.error('Permissions fetch error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch permissions' }, { status: 500 });
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
      return NextResponse.json({ success: false, message: 'Super admin access required' }, { status: 403 });
    }

    const { userId, permissions } = await request.json();

    if (!userId || !permissions) {
      return NextResponse.json({ success: false, message: 'userId and permissions required' }, { status: 400 });
    }

    // Verify user exists and is staff/admin
    const targetUser = await db.user.findUnique({ where: { id: userId } });
    if (!targetUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Upsert permissions
    const result = await db.staffPermission.upsert({
      where: { userId },
      update: {
        canAccessDashboard: permissions.canAccessDashboard ?? true,
        canManageBlogs: permissions.canManageBlogs ?? false,
        canManageProducts: permissions.canManageProducts ?? false,
        canViewInquiries: permissions.canViewInquiries ?? false,
        canManageAppointments: permissions.canManageAppointments ?? false,
        canManageGallery: permissions.canManageGallery ?? false,
        canViewUsers: permissions.canViewUsers ?? false,
        canManageSettings: permissions.canManageSettings ?? false,
        canChangePassword: permissions.canChangePassword ?? true,
      },
      create: {
        userId,
        canAccessDashboard: permissions.canAccessDashboard ?? true,
        canManageBlogs: permissions.canManageBlogs ?? false,
        canManageProducts: permissions.canManageProducts ?? false,
        canViewInquiries: permissions.canViewInquiries ?? false,
        canManageAppointments: permissions.canManageAppointments ?? false,
        canManageGallery: permissions.canManageGallery ?? false,
        canViewUsers: permissions.canViewUsers ?? false,
        canManageSettings: permissions.canManageSettings ?? false,
        canChangePassword: permissions.canChangePassword ?? true,
      },
    });

    // Also update the JSON permissions field on User for quick lookup
    await db.user.update({
      where: { id: userId },
      data: {
        permissions: JSON.stringify(permissions),
      },
    });

    return NextResponse.json({ success: true, permission: result });
  } catch (error) {
    console.error('Permissions update error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update permissions' }, { status: 500 });
  }
}
