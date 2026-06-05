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

    return NextResponse.json({
      success: true,
      message: 'Super admin created successfully',
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
      { success: false, message: 'Failed to create super admin' },
      { status: 500 }
    );
  }
}
