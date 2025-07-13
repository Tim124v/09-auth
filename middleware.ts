import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (isPrivateRoute && !accessToken) {
    if (refreshToken) {
      try {
        const response = await fetch(`${request.nextUrl.origin}/api/auth/session`, {
          headers: {
            Cookie: request.headers.get('cookie') || '',
          },
        });
        
        if (response.ok) {
          return NextResponse.next();
        }
      } catch {
      }
    }
    
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
}; 