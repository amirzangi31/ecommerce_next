import React from 'react'
import Nav from './Nav'

function LayoutAdmin({ children, title }) {
    return (
        <div className='admin-content '>
            <Nav />
            <div className='admin-container'>
                <div className='bg-bg-admin h-full  rounded-xl p-1 '>
                    <div className='admin-container__inner'>
                        <h2 >{title}</h2>
                        <hr className='my-2' />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutAdmin