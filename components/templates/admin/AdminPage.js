import React, { useContext } from 'react'
import LayoutAdmin from './LayoutAdmin'
import { AuthContext } from '@/context/AuthContextProvider'
import Loader from '@/components/modules/admin/Loader'

function AdminPage() {

    const { userInfo: { loading, user, error } } = useContext(AuthContext)



    return (

        <LayoutAdmin title="پنل ادمین">
            {
                loading ? <Loader />  :
                    <div className='center h-full'>
                        <h2>
                            سلام {user?.email} خوش امدید👋
                        </h2>
                    </div>
            }
        </LayoutAdmin>
    )
}

export default AdminPage