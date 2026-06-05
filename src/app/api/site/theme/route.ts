import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const theme = await db.themeConfig.findFirst({
      where: { active: true },
    });

    if (!theme) {
      return NextResponse.json({ success: false, message: 'No active theme found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: theme });
  } catch (error) {
    console.error('Public theme fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch active theme' },
      { status: 500 }
    );
  }
}
