import SigninAdminPage from '@/components/templates/admin/SigninAdminPage'
import { getSession } from 'next-auth/react';
import React from 'react'

function signin() {
  return (
    <SigninAdminPage />
  )
}

export default signin;



export async function getServerSideProps({ req }) {

  const session = await getSession({ req })
  if (session?.user?.name === "admin") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false
      }
    }
  }


  return {
    props: {}
  }
}