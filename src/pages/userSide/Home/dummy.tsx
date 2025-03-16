import React from 'react'

type Props = {}

function Dummy({}: Props) {
  return (
    <div className='flex items-center justify-center h-screen'>
        <form action="" className='flex flex-col border p-10'>
            <input type="text" placeholder="Enter your name" className='border'/>
            <input type="email" placeholder="Enter your Email" className='border'/>
            <button type="submit">Submit</button>

        </form>
    </div>
  )
}

export default Dummy