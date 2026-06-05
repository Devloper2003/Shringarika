import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import ZAI from 'z-ai-web-dev-sdk';

async function generateReport(prompt: string): Promise<string> {
  const zai = await ZAI.create();
  const systemPrompt = `You are an expert analytics and business intelligence assistant for "House of Shringarika", a luxury bridal & couture fashion brand based in Jaipur, Rajasthan. Generate detailed, professional reports with actionable insights. Use markdown formatting for structure. Include data-driven recommendations.`;

  const completion = await zai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ],
  });

  return completion.choices[0]?.message?.content || 'Failed to generate report';
}

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
    const type = searchParams.get('type');

    const where: Record<string, unknown> = {};
    if (type) where.type = type;

    const reports = await db.aIReport.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    console.error('AI report list error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch AI reports' },
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

    if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'super_admin')) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { title, type, prompt } = body;

    if (!title || !type || !prompt) {
      return NextResponse.json(
        { success: false, message: 'Title, type, and prompt are required' },
        { status: 400 }
      );
    }

    const generatedContent = await generateReport(prompt);

    const report = await db.aIReport.create({
      data: {
        title,
        type,
        prompt,
        content: generatedContent,
        generatedBy: 'AI Assistant',
      },
    });

    return NextResponse.json({ success: true, data: report }, { status: 201 });
  } catch (error) {
    console.error('AI report create error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate AI report' },
      { status: 500 }
    );
  }
}
