import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { decryptUserData } from '@/lib/encryption';

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

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const decrypt = searchParams.get('decrypt') === 'true';

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const users = await db.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
        encryptedData: true,
        dataIv: true,
      },
    });

    // If decrypt=true and requester is super_admin, decrypt sensitive data
    if (decrypt) {
      const usersWithDecrypted = users.map((user) => {
        const { encryptedData, dataIv, ...rest } = user;
        let decryptedInfo: Record<string, unknown> = {};

        if (encryptedData && dataIv) {
          decryptedInfo = decryptUserData(encryptedData, dataIv);
        }

        return {
          ...rest,
          decryptedInfo: Object.keys(decryptedInfo).length > 0 ? decryptedInfo : null,
        };
      });

      return NextResponse.json({ success: true, users: usersWithDecrypted });
    }

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Users list error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
