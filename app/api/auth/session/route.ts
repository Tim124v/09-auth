import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serverApi } from '@/lib/api/serverApi';
import { parse } from 'cookie';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (accessToken) {
      // Проверяем валидность accessToken
      try {
        const userResponse = await serverApi.get('users/me', {
          headers: {
            Cookie: cookieStore.toString(),
          },
        });
        return NextResponse.json(userResponse.data);
      } catch {
        // Если accessToken невалиден, удаляем его
        cookieStore.delete('accessToken');
      }
    }

    if (refreshToken) {
      try {
        const apiRes = await serverApi.get('auth/session', {
          headers: {
            Cookie: cookieStore.toString(),
          },
        });
        const setCookie = apiRes.headers['set-cookie'];
        if (setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
          let newAccessToken = '';
          let newRefreshToken = '';

          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            if (parsed.accessToken) newAccessToken = parsed.accessToken;
            if (parsed.refreshToken) newRefreshToken = parsed.refreshToken;
          }

          if (newAccessToken) {
            cookieStore.set('accessToken', newAccessToken, {
              path: '/',
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
            });
          }
          if (newRefreshToken) {
            cookieStore.set('refreshToken', newRefreshToken, {
              path: '/',
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
            });
          }

          // Получаем данные пользователя
          const userResponse = await serverApi.get('users/me', {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
          return NextResponse.json(userResponse.data);
        }
      } catch {
        // Если refreshToken невалиден, удаляем его
        cookieStore.delete('refreshToken');
      }
    }
    
    return NextResponse.json(null);
  } catch {
    return NextResponse.json(null);
  }
}
