

import React from 'react'

const NavbarComp = () => {
  return (
    <div className="navbar bg-base-300">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">CodePlayGround</a>
      
    </div>
    <div className="flex-none">
     <a className='btn btn-primary' href='/api/auth/login'>Login/Signup</a>
    </div>
  </div>
  )
}

export default NavbarComp