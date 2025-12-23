import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken, refreshToken } = body;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { success: false, error: 'Missing tokens' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();

    // Update access token cookie
    cookieStore.set('accessToken', accessToken, {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60, // 1 hour
    });

    // Update refresh token cookie
    cookieStore.set('refreshToken', refreshToken, {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return NextResponse.json({
      success: true,
      message: 'Tokens synced successfully',
    });
  } catch (error) {
    console.error('Token sync error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to sync tokens' },
      { status: 500 }
    );
  }
}
