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

    const [
      totalInquiries,
      pendingAppointments,
      publishedPosts,
      activeProducts,
      totalUsers,
      recentInquiries,
      recentAppointments,
    ] = await Promise.all([
      db.inquiry.count(),
      db.appointment.count({ where: { status: 'pending' } }),
      db.blogPost.count({ where: { published: true } }),
      db.product.count({ where: { active: true } }),
      db.user.count(),
      db.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      db.appointment.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalInquiries,
        pendingAppointments,
        publishedPosts,
        activeProducts,
        totalUsers,
      },
      recentInquiries,
      recentAppointments,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
