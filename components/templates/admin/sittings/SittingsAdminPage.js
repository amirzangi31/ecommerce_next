import React from 'react'
import LayoutAdmin from '../LayoutAdmin'
import Link from 'next/link'
import Button from '@/components/modules/Button'

function SittingsAdminPage() {
    return (
        <LayoutAdmin title="تنظیمات">
            <div className='grid grid-cols-2 py-4 gap-4'> 
                <Link href="/admin/sittings/colors" >
                    <Button className="btn-secondary-admin w-full">رنگ ها</Button>
                </Link>
                <Link href="/admin/sittings/users" >
                    <Button className="btn-secondary-admin w-full">کاربران</Button>
                </Link>
                <Link href="/admin/sittings/users" >
                    <Button className="btn-secondary-admin w-full">تراکنش ها</Button>
                </Link>
                <Link href="/admin/sittings/users" >
                    <Button className="btn-secondary-admin w-full">کاربران پر خرید</Button>
                </Link>
                <Link href="/admin/sittings/addadmin" >
                    <Button className="btn-secondary-admin w-full">ارسال رایگان</Button>
                </Link>
                <Link href="/admin/sittings/admins" >
                    <Button className="btn-secondary-admin w-full"> ادمین ها</Button>
                </Link>
                <Link href="/admin/sittings/profileadmin" >
                    <Button className="btn-secondary-admin w-full">پروفایل ادمین</Button>
                </Link>
            </div>
        </LayoutAdmin>
    )
}

export default SittingsAdminPage