import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Skip subdomain logic entirely on localhost (dev mode)
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return NextResponse.next();
  }

  // Production subdomain routing
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || '';
  if (!rootDomain) return NextResponse.next();

  const currentHost = hostname.replace(/:\d+$/, '');

  if (currentHost !== rootDomain && currentHost.endsWith(rootDomain)) {
    const subdomain = currentHost.replace(`.${rootDomain}`, '');

    if (subdomain === 'dashboard') {
      const path = url.pathname === '/' ? '/dashboard' : `/dashboard${url.pathname}`;
      url.pathname = path;
      return NextResponse.rewrite(url);
    }

    if (subdomain === 'admin') {
      const path = url.pathname === '/' ? '/admin' : `/admin${url.pathname}`;
      url.pathname = path;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
