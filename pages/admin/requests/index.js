import RequestsAdminPage from '@/components/templates/admin/RequestsAdminPage'
import Request from '@/models/Request';
import React from 'react'

function RequestsAdmin({ requests }) {
    
    return (

        <RequestsAdminPage requests={requests} />
    )
}

export default RequestsAdmin;



export const getServerSideProps = async (context) => {

    const { status } = context.query

    if (status === undefined || status === "") {
        return {
            redirect: {
                destination: "/admin/requests?status=all",
                permanent: false,
            }
        }
    }



    if (status === "all") {
        const requests = await Request.find().sort({ confirmAdmin : -1 }).populate("user")
        return {
            props: {
                requests: JSON.parse(JSON.stringify(requests))
            }
        }
    } else {
        if (status !== "all" && status !== "sale" && status !== "repire" && status !== "counseling") {
            return {
                redirect: {
                    destination: "/admin/requests?status=all",
                    permanent: false,
                }
            }
        }
        const requests = await Request.find({ type: status }).sort({  confirmAdmin : -1 }).populate("user")
        return {
            props: {
                requests: JSON.parse(JSON.stringify(requests))
            }
        }
    }

}

