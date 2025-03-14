import React from 'react'
import { MdHome } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom"
import { CiCirclePlus } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";

const SideMenu = () => {
    return (
        <>
            <div className='flex flex-col w-[13vw] bg-gray-900 p-5 text-xl'>
                <Link to="/" className="flex text-white px-5 p-2 gap-2 items-center focus:rounded-full focus:shadow-[4px_4px_8px_rgba(255,255,255,0.1),-4px_-4px_8px_rgba(0,0,0,0.6)] mb-4">
                    <MdHome />
                    <h1>Home</h1>
                </Link>
                <Link to="/" className="flex text-white px-5 p-2 gap-2 items-center focus:rounded-full focus:shadow-[4px_4px_8px_rgba(255,255,255,0.1),-4px_-4px_8px_rgba(0,0,0,0.6)] mb-4">
                    <FaArrowTrendUp />
                    <h1>Explore</h1>
                </Link>
                <Link to="/create" className="flex text-white px-5 p-2 gap-2 items-center focus:rounded-full focus:shadow-[4px_4px_8px_rgba(255,255,255,0.1),-4px_-4px_8px_rgba(0,0,0,0.6)] mb-4">
                    <CiCirclePlus />
                    <h1>Create</h1>
                </Link>
                <Link to="/profile" className="flex text-white px-5 p-2 gap-2 items-center focus:rounded-full focus:shadow-[4px_4px_8px_rgba(255,255,255,0.1),-4px_-4px_8px_rgba(0,0,0,0.6)] mb-4">
                    <CgProfile />
                    <h1>Profile</h1>
                </Link>
                <Link to="/" className="flex text-white px-5 p-2 gap-2 items-center focus:rounded-full focus:shadow-[4px_4px_8px_rgba(255,255,255,0.1),-4px_-4px_8px_rgba(0,0,0,0.6)] mb-4">
                    <IoLogOutOutline />
                    <h1>Logout</h1>
                </Link>
            </div>
        </>
    )
}

export default SideMenu