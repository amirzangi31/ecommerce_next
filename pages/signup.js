import SignupPage from "@/components/templates/SignupPage";
import { getSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

function Signup() {
  return (
    <SignupPage />
  )
}

export default Signup;

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
