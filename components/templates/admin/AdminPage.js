import React from 'react'
import LayoutAdmin from './LayoutAdmin'

import Loader from '@/components/modules/admin/Loader'

function AdminPage({ user }) {





    return (

        <LayoutAdmin title="پنل ادمین">

            <div className='center h-[calc(100vh-120px)]'>
                <h2>
                    سلام {user} خوش امدید👋
                </h2>
            </div>

        </LayoutAdmin>
    )
}

export default AdminPage