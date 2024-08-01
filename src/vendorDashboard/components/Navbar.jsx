import React from 'react'

const Navbar = ({handleVendorRegister,handleVendorLogin}) => {
  return (
    <div className='bg-red-500 h-14 items-center  flex justify-between'>
      <div className='ml-8 text-xl font-semibold'>
        VendorDashboard
      </div>
      <div className='text-xl font-semibold mr-8'>
        <span onClick={handleVendorLogin} className='cursor-pointer'>Login/</span>
        <span onClick={handleVendorRegister} className='cursor-pointer'>Register</span>
      </div>
    </div>
  )
}

export default Navbar
