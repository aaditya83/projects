import React from 'react'

function Navbar(props) {
  return (
    <nav className="flex bg-slate-500 text-white justify-between py-4 w-full md:w-1/2 mx-auto rounded-lg">
      <div className="logo">
        <span className='text-xl font-bold mx-8'>itodo</span>
      </div>
      <ul className=' flex gap-8 mx-10'>
        <li className='cursor-pointer hover:text-slate-200 hover:font-bold hover:transition-all'>home</li>
        <li className='cursor-pointer hover:text-slate-200 hover:font-bold hover:transition-all'>tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
