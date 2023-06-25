import OrdersAdminPage from '@/components/templates/admin/OrdersAdminPage'
import Cart from '@/models/Cart'
import connectDB from '@/utils/connectDB'
import React from 'react'

function Order({ carts, isData }) {

  return (
    <OrdersAdminPage carts={carts} isData={isData} />
  )
}

export default Order


export const getServerSideProps = async (context) => {

  await connectDB()


  const { confirm, date } = context.query

  let isData = false


  if (confirm === "true") {
    if (date === "today") {
      const carts = await Cart.find({
        dateConfirmAdmin: {
          $gte: new Date(new Date().setHours(0o0, 0o0, 0o0)), // شروع امروز
          $lt: new Date(new Date().setHours(23, 59, 59)) // پایان امروز
        },
        isPaid: true,
        confirmAdmin: true
      }).populate("user").populate("items.product")

      isData = true;
      return {
        props: {
          carts: JSON.parse(JSON.stringify(carts)),
          isData
        }
      }

    } else if (date === "month") {
      const carts = await Cart.find({
        dateConfirmAdmin: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // شروع این ماه
          $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59) // پایان این ماه
        },
        isPaid: true,
        confirmAdmin: true
      }).populate("user").populate("items.product")

      isData = true;


      return {
        props: {
          carts: JSON.parse(JSON.stringify(carts)),
          isData
        }
      }
    }
  } else if (confirm === "false") {
    if (date === "today") {
      const carts = await Cart.find({
        datePaid: {
          $gte: new Date(new Date().setHours(0o0, 0o0, 0o0)), // شروع امروز
          $lt: new Date(new Date().setHours(23, 59, 59)) // پایان امروز
        },
        isPaid: true,
        confirmAdmin: false
      }).populate("user").populate("items.product")

      isData = true


      return {
        props: {
          carts: JSON.parse(JSON.stringify(carts)),
          isData: true
        }
      }
    } else if (date === "month") {
      const carts = await Cart.find({
        datePaid: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // شروع این ماه
          $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59) // پایان این ماه
        },
        isPaid: true,
        confirmAdmin: false
      }).populate("user").populate("items.product")

      


      isData = true;


      return {
        props: {
          carts: JSON.parse(JSON.stringify(carts)),
          isData
        }
      }
    }
  }

  return {
    props: {
      carts: [],
      isData
    }
  }

}
