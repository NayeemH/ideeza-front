import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

/** @param {import("next/server").NextRequest} req */
export async function middleware(req: any) {
	// FIXME: fix below if condition

	if (
		req.nextUrl.pathname.startsWith('/user') ||
		req.nextUrl.pathname.startsWith('/technician')
	) {
		// console.log('req.nextUrl.pathname------------', req.nextUrl.pathname)
		const session: any = await getToken({
			req,
			secret: process.env.JWT_SECRET || '',
			secureCookie:
				process.env.NEXTAUTH_URL?.startsWith('https://') ?? !!process.env.VERCEL_URL,
		});
		// console.log('session from middleware---', session)
		if (!session) {
			// console.log('No Session is here----------,session: ', session)
			return NextResponse.redirect(process.env.NEXTAUTH_URL || '/');
		}
		if (session?.user?.role == 'User' && !req.nextUrl.pathname.startsWith('/user')) {
			return NextResponse.redirect(process.env.NEXTAUTH_URL || '/');
		}
		if (
			session?.user?.role == 'Technician' &&
			!req.nextUrl.pathname.startsWith('/technician')
		) {
			return NextResponse.redirect(process.env.NEXTAUTH_URL || '/');
		}
		if (session?.user?.role == 'Admin' && !req.nextUrl.pathname.startsWith('/admin')) {
			return NextResponse.redirect(process.env.NEXTAUTH_URL || '/');
		}
	}
}
