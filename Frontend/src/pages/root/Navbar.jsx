import React from 'react'

const Navbar = () => {
  return (
    <>
        <div className='w-full h-[10vh] bg-gray-900 flex flex-between p-10 text-white'>
            <h1>Discover</h1>
            <div>
                
                <input type='search' placeholder='Search for content '></input>
            </div>
        </div>
    </>
  )
}

export default Navbar