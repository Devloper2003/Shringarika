import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const links = await db.socialLink.findMany({
      where: {
        active: true,
        OR: [
          { showInFooter: true },
          { showInHeader: true },
        ],
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ success: true, data: links });
  } catch (error) {
    console.error('Public social links fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch social links' },
      { status: 500 }
    );
  }
}
