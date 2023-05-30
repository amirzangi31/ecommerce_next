import AdminPage from '@/components/templates/admin/AdminPage';
import connectDB from '@/utils/connectDB';
import { getSession } from 'next-auth/react';
import React from 'react';

function Admin({user}) {
    return (
        <AdminPage user={user} />
    )
}

export default Admin;


export async function getServerSideProps({ req }) {
    await connectDB()
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: "/signinadmin",
                permanent: false
            }
        }
    }


    return {
        props: { user: session?.user.email }
    }
}