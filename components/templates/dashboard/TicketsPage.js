import React from 'react'
import CardTicket from '@/components/modules/CardTicket'

function TicketsPage({ tickets }) {




  return (
    <div className='container mx-auto py-16 px-2'>

      <p className='title-one'>تیکت ها</p>

      <div className=''>
        {tickets.map(item => (
          <>
            {console.log(item)}
            <CardTicket key={item._id} {...item} />
          </>
        ))}
      </div>
    </div>
  )
}

export default TicketsPage