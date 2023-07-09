import ProfilePage from '@/components/templates/dashboard/ProfilePage'
import User from '@/models/User'
import connectDB from '@/utils/connectDB'
import { getSession } from 'next-auth/react'
import React from 'react'

function ProfileUser({ user }) {
  return (
    <ProfilePage user={user} />
  )
}

export default ProfileUser


export async function getServerSideProps({ req }) {
  const session = await getSession({ req });


  await connectDB();

  const user = await User.findOne({ email: session.user.email });

  const result = {
    name: user.name,
    email: user.email,
    postalcode: user.postalcode,
    phone: user.phone,
    address: user.address,
    image: user.profileimage,
    card : user.card
  }

  
  return {
    props: {
      user: JSON.parse(JSON.stringify(result)),
    },
  };
}