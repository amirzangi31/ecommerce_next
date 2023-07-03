import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


const adminRoute = ["/admin"]
const dashboardRoute = ["/dashboard"]
const cartRoute = ["/cart"]
const signRoute = ["/signin", "signup"]
const emailAdmin = ["zangiabadi1378888@gmail.com"]

export async function middleware(req) {

    const pathname = req.nextUrl.pathname

    const token = await getToken({
        req,
        secret: process.env.SECRET
    })
    if (adminRoute.some((path) => pathname.startsWith(path))) {
        const url = new URL("/signin", req.url)
        if (!token) {
            return NextResponse.redirect(url)
        }
        const verifyEmail = emailAdmin.some(item => item === token.email)
        if (token.name !== "admin" || !verifyEmail) {
            return NextResponse.redirect(url)
        }
    } else if (dashboardRoute.some((path) => pathname.startsWith(path))) {
        const url = new URL("/signin", req.url)
        if (!token) {
            return NextResponse.redirect(url)
        }
    } else if (cartRoute.some((path) => pathname.startsWith(path))) {
        const url = new URL("/signin", req.url)
        if (!token) {
            return NextResponse.redirect(url)
        }
    } else if (signRoute.some(path => pathname.startsWith(path))) {
        const url = new URL("/", req.url)
        if (token) {
            return NextResponse.redirect(url)
        }
    }


    return;

}