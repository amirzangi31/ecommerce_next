import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useRouter } from 'next/router'

function Layout({ children }) {

    const router = useRouter()
    const { pathname } = router;





    return (
        <>
            {!pathname.includes("/admin") && <Header />}
            <div>
                {children}
            </div>
            {!pathname.includes("/admin") && <Footer />}
        </>
    )
}

export default Layout