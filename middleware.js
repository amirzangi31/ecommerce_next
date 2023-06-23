import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


const adminRoute = ["/admin"]
const dashboardRoute = ["/dashboard"]
const cartRoute = ["/cart"]
const emailAdmin = ["zangiabadi1378888@gmail.com"]

export async function middleware(req) {

    const pathname = req.nextUrl.pathname

    if (adminRoute.some((path) => pathname.startsWith(path))) {
        const token = await getToken({
            req,
            secret: process.env.SECRET
        })
        const url = new URL("/signinadmin", req.url)
        if (!token) {
            return NextResponse.redirect(url)
        }
        const verifyEmail = emailAdmin.some(item => item === token.email)
        if (token.name !== "admin" || !verifyEmail) {
            return NextResponse.redirect(url)
        }
    } else if (dashboardRoute.some((path) => pathname.startsWith(path))) {
        const token = await getToken({
            req,
            secret: process.env.SECRET
        })
        const url = new URL("/signin", req.url)
        if (!token) {
            return NextResponse.redirect(url)
        }
    } else if (cartRoute.some((path) => pathname.startsWith(path))) {
        const token = await getToken({
            req,
            secret: process.env.SECRET
        })
        const url = new URL("/signin", req.url)
        if (!token) {
            return NextResponse.redirect(url)
        }
    }


    return;

}