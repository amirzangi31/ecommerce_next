import { baseurl } from '@/lib/baseurl'
import React, { createContext, useEffect, useState } from 'react'


export const AuthContext = createContext({})



function AuthContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState(
        {
            loading: true,
            user: {},
            error: {}
        }
    )

    const fetchUser = async () => {
        setUserInfo({
            ...userInfo,
            loading: true
        })
        const res = await fetch(`${baseurl}api/user`)

        const data = await res.json()

        if (data.status === "success") {
            setUserInfo({
                loading: false,
                user: data.user,
                error: ""
            })
        } else if (data.status === "failed") {
            setUserInfo({
                loading: false,
                user: {},
                error: data.message
            })
        }
    }

    useEffect(() => {
        fetchUser()
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <AuthContext.Provider value={{ userInfo }}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider