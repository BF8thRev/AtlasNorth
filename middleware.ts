import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip auth check for static files and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/data') ||
    request.nextUrl.pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Check if password is set in environment
  const envPassword = process.env.DASHBOARD_PASSWORD;
  
  // If no password is set, allow access (for development)
  if (!envPassword) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get('mission-control-auth');
  
  if (authCookie?.value === envPassword) {
    return NextResponse.next();
  }

  // Check for basic auth header
  const authHeader = request.headers.get('authorization');
  
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ');
    
    if (scheme === 'Basic') {
      const buffer = Buffer.from(encoded, 'base64');
      const [username, password] = buffer.toString().split(':');
      
      if (password === envPassword) {
        const response = NextResponse.next();
        // Set cookie to remember auth
        response.cookies.set('mission-control-auth', password, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });
        return response;
      }
    }
  }

  // Return 401 with Basic Auth challenge
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Mission Control Dashboard"',
    },
  });
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
