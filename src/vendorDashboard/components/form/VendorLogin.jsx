import React from 'react'

const VendorLogin = () => {
  return (
   <div className='rounded  w-[500px]  mx-auto h-[300px] mt-[65px]'  style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
    <form  className='flex flex-col justify-start items-center h-full gap-4'>
        <h2 className='text-2xl font-bold mt-4'>Vendor Login</h2>
        <label htmlFor="email" className='font-semibold'>Email</label>
        <input type="text"  id='email' className='border-2 border-gray-700 w-[70%] rounded text-lg' name='email' placeholder='Enter you email'/>
        <label htmlFor="password" className='font-semibold'>Password</label>
        <input type="text" id='password' className='border-2 border-gray-700 w-[70%] rounded text-lg'  name='password' placeholder='Enter you password'/>
        <button className='bg-black text-white p-2 rounded'>Submit</button>

    </form>
   </div>
  )
}

export default VendorLogin
