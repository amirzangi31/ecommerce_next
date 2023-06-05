import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useRouter } from 'next/router'

function Layout({ children }) {
    const [show, setShow] = useState(true)
    const router = useRouter()
    const { pathname } = router;


    useEffect(() => {
        if (pathname.includes("/admin") || pathname.includes("/signinadmin")) {
            setShow(false)
        } else {
            setShow(true)
        }
    }, [pathname])


    return (
        <>
            {show && <Header />}
            <main className='min-h-[calc(100vh-280px)]'>
                    {children}
            </main>
            {show && <Footer />}
        </>
    )
}

export default Layout