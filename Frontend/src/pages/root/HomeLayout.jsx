import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar'
import SideMenu from './SideMenu'
import Feed from './Feed'
import Create from './Create'
import RightBar from './RightBar'
import Profile from './Profile'

const HomeLayout = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className='flex flex-1 w-full'>
        <SideMenu />
        <div className='bg-gray-500 w-[2px]'></div>
        <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>

        <div className='bg-gray-500 w-[2px]'></div>
        <RightBar/>
      </div>
    </div>
  )
}

export default HomeLayout