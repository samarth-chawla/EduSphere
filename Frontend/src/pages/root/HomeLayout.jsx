import React from 'react'
import Navbar from './Navbar'
import SideMenu from './SideMenu'

const HomeLayout = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <SideMenu/>
    </div>
  )
}

export default HomeLayout