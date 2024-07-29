import { authMiddleware } from '@lib/auth-middleware';
import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/*'] as const;
const publicRoutesWithAuthHandling = ['/login'] as const;
const redirectToIfAuthenticated = '/';
const redirectToIfUnauthenticated = '/login';

const { auth } = NextAuth(authMiddleware);

export const middleware = auth(async (request) => {
	const pathname = request.nextUrl.pathname;
	const method = request.method;

	const isPublicRouteWithAuthHandling = verifyRoute(
		pathname,
		publicRoutesWithAuthHandling
	);

	const isProtectedRoute = verifyRoute(pathname, protectedRoutes);

	if (
		isPublicRouteWithAuthHandling &&
		method === 'GET' &&
		request.auth?.user?.id
	) {
		return NextResponse.redirect(
			new URL(redirectToIfAuthenticated, request.url)
		);
	}

	if (
		isProtectedRoute &&
		!isPublicRouteWithAuthHandling &&
		method === 'GET' &&
		!request.auth?.user?.id
	) {
		return NextResponse.redirect(
			new URL(redirectToIfUnauthenticated, request.url)
		);
	}
});

const verifyRoute = (pathname: string, routes: readonly string[]) => {
	return routes.some((route) => {
		if (route.endsWith('/*')) {
			return pathname.startsWith(route.replace('/*', ''));
		}

		return pathname === route;
	});
};

export const config = {
	matcher: [
		{
			source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'next-action' },
				{ type: 'header', key: 'purpose', value: 'prefetch' },
			],
		},
	],
};
