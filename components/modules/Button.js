import React, { useState } from 'react'

function Button({ className, children, handler }) {



  return (
    <button type='button' onClick={handler} className={`${className}`} >
      {children}  
    </button>
  )
}

export default Button