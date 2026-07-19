import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const protectedRoutes: string[] = []

export function middleware(request: NextRequest) {
	const token = request.cookies.get('session_token')?.value
	const { pathname } = request.nextUrl

	const isProtectedRoute = protectedRoutes.some(route =>
		pathname.startsWith(route)
	)

	if (isProtectedRoute && !token) {
		return NextResponse.redirect(new URL('/forbidden', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: []
}
