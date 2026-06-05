import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check if super_admin already exists
    const existingAdmin = await db.user.findFirst({
      where: { role: 'super_admin' },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: 'Super admin already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword('admin123');

    const admin = await db.user.create({
      data: {
        name: 'Super Admin',
        email: 'admin@shringarika.com',
        password: hashedPassword,
        role: 'super_admin',
        isActive: true,
        emailVerified: true,
      },
    });

    // ━━━ Seed Default Theme ━━━
    const existingTheme = await db.themeConfig.findFirst({ where: { name: 'default' } });
    if (!existingTheme) {
      await db.themeConfig.create({
        data: {
          name: 'default',
          label: 'Classic Rose Gold',
          primaryColor: '#B76E79',
          secondaryColor: '#E8D9C0',
          accentColor: '#B89840',
          backgroundColor: '#F2EDE8',
          textColor: '#1A1A1A',
          cardColor: '#F7F3EF',
          borderColor: '#D4C2A5',
          fontFamily: 'Cormorant Garamond',
          headingFont: 'Playfair Display',
          bodyFont: 'DM Sans',
          customCss: null,
          showParticles: true,
          showCursorEffect: true,
          active: true,
        },
      });
    }

    // ━━━ Seed Default Page Content ━━━
    const defaultContent = [
      {
        page: 'home',
        section: 'hero',
        title: 'Draped in Dreams',
        subtitle: 'Crafted for You',
        content: null,
        imageUrl: null,
        order: 0,
      },
      {
        page: 'home',
        section: 'brand_story',
        title: 'Where Heritage Meets Haute Couture',
        subtitle: null,
        content: null,
        imageUrl: null,
        order: 1,
      },
      {
        page: 'home',
        section: 'cta',
        title: 'Begin Your Journey',
        subtitle: null,
        content: null,
        imageUrl: null,
        order: 2,
      },
    ];

    for (const content of defaultContent) {
      const existing = await db.pageContent.findFirst({
        where: { page: content.page, section: content.section },
      });
      if (!existing) {
        await db.pageContent.create({ data: content });
      }
    }

    // ━━━ Seed Default Social Links ━━━
    const defaultSocials = [
      {
        platform: 'instagram',
        url: 'https://instagram.com/shringarika',
        username: 'shringarika',
        showInFooter: true,
        showInHeader: false,
        order: 0,
      },
      {
        platform: 'facebook',
        url: 'https://facebook.com/shringarika',
        username: 'shringarika',
        showInFooter: true,
        showInHeader: false,
        order: 1,
      },
      {
        platform: 'pinterest',
        url: 'https://pinterest.com/shringarika',
        username: 'shringarika',
        showInFooter: true,
        showInHeader: false,
        order: 2,
      },
      {
        platform: 'whatsapp',
        url: 'https://wa.me/919999999999',
        username: null,
        showInFooter: true,
        showInHeader: false,
        order: 3,
      },
      {
        platform: 'youtube',
        url: 'https://youtube.com/@shringarika',
        username: '@shringarika',
        showInFooter: true,
        showInHeader: false,
        order: 4,
      },
    ];

    for (const social of defaultSocials) {
      const existing = await db.socialLink.findFirst({
        where: { platform: social.platform },
      });
      if (!existing) {
        await db.socialLink.create({ data: social });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Super admin, default theme, page content, and social links created successfully',
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
