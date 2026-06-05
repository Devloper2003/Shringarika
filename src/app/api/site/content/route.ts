import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    if (!page) {
      return NextResponse.json(
        { success: false, message: 'Page query parameter is required (e.g., ?page=home)' },
        { status: 400 }
      );
    }

    const contents = await db.pageContent.findMany({
      where: {
        page,
        active: true,
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ success: true, data: contents });
  } catch (error) {
    console.error('Public content fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch page content' },
      { status: 500 }
    );
  }
}
