import React from 'react'
import Navbar from './Navbar'
import SideMenu from './SideMenu'
import Feed from './Feed'
import Create from './Create'
import RightBar from './RightBar'

const HomeLayout = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className='flex flex-1 w-full'>
        <SideMenu />
        <div className='bg-gray-500 w-[2px]'></div>
        <Feed />
        <div className='bg-gray-500 w-[2px]'></div>
        <RightBar/>
      </div>
    </div>
  )
}

export default HomeLayout