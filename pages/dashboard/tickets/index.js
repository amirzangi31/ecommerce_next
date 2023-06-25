import TicketsPage from '@/components/templates/dashboard/TicketsPage'
import Ticket from '@/models/Ticket'
import User from '@/models/User'
import connectDB from '@/utils/connectDB'
import { getSession } from 'next-auth/react'
import React from 'react'

function Tickets({ tickets }) {

  return (
    <TicketsPage tickets={tickets} />
  )
}

export default Tickets


export const getServerSideProps = async ({ req }) => {
  await connectDB()

  const session = await getSession({ req })

  const user = await User.findOne({ email: session.user.email })

  const tickets = await Ticket.find({ user: user._id }).sort({ createdAt: -1 })


  return {
    props: {
      tickets: JSON.parse(JSON.stringify(tickets))
    }
  }


}

