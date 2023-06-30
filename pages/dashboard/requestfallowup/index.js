import RequestFallowUpPage from '@/components/templates/dashboard/RequestFallowUpPage'
import Request from '@/models/Request';
import User from '@/models/User';
import connectDB from '@/utils/connectDB';
import { getSession } from 'next-auth/react';
import React from 'react'

function RequestFallowUp({ requests }) {


  return (
    <RequestFallowUpPage requests={requests} />
  )
}

export default RequestFallowUp;



export const getServerSideProps = async ({ req }) => {

  await connectDB()

  const session = await getSession({ req })

  const user = await User.findOne({ email: session.user.email })

  const requests = await Request.find({ user: user._id }).sort({ createdAt: -1 })



  return {
    props: {
      requests: JSON.parse(JSON.stringify(requests))
    }
  }
}
