import { NextResponse } from 'next/server';

export function middleware(request) {
  // Handle OPTIONS preflight — respond immediately without hitting the route handler
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
        'Access-Control-Max-Age':       '86400',
      },
    });
  }

  // For all other methods, pass through and attach CORS headers to the response
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin',  '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
  return response;
}

// Only run on API routes
export const config = {
  matcher: '/api/:path*',
};
