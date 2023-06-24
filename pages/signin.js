import SigninPage from '@/components/templates/SigninPage'
import { getSession } from 'next-auth/react';
import React from 'react'

function Signin() {
  return (
    <SigninPage />
  )
}

export default Signin;


export const getServerSideProps = async ({ req }) => {

  const session = await getSession({ req })

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

