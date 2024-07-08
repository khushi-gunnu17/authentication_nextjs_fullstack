import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// The file name should be middleware only.

// middleware always works on edge and is different from middlewares in express or any other framework or library.
export function middleware(request: NextRequest) {

    // path is where the user is located.
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    const token = request.cookies.get('token')?.value || ''

    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }   

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))    
    }
    
}


// matcher means that in these routes the middlware has to be runned.
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}