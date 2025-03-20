import React from 'react'
import { FaFireFlameCurved } from "react-icons/fa6";
import { ImTable } from "react-icons/im";
import { CiBookmark } from "react-icons/ci";
const data = [
  "Item 1", "Item 2", "Item 3",
  "Item 4", "Item 5", "Item 6",
  "Item 7", "Item 8", "Item 9",
];

const Profile = () => {
  return (
    <>
      <div className='flex flex-col gap-4 items-center w-[100%] min-h-[100%] bg-gray-900 px-10 py-2 text-white'>
        <div className='flex gap-10 w-[80%] p-10'>
          <div className='flex w-full justify-between items-center'>
            <div>
              <img src="../../src/assets/hogwarts.jpg" alt="" className='w-32 h-32 rounded-full object-cover border-2  border-[#5BC6DF] md:w-42 md:h-42' />
            </div>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-5'>
                <h2 className='text-xl'>_samarth_chawla</h2>
                <button className='bg-gray-700 px-2 py-1 rounded-lg'>Edit Profile</button>
              </div>
              <div className='flex justify-between'>
                <p>2 Posts</p>
                <p className='flex items-center gap-1'>000 Aura<FaFireFlameCurved /></p>
              </div>
              <div className='flex flex-col text-sm'>
                <h1 className='text-base'>Samarth Chawla</h1>
                <p>desc line1</p>
                <p>desc line2</p>
              </div>
            </div>
          </div>
        </div>
        <div className='h-0.5 bg-amber-50 w-[80%] mt-2' />
        <div className='w-[80%] flex  flex-col'>
          <div className='flex gap-20 justify-center'>
            <button className='flex items-center gap-1'><ImTable />Posts</button>
            <button className='flex items-center gap-1'><CiBookmark />Saved</button>
          </div>
          <div className='grid grid-cols-3 gap-4 p-4'>
            {data.map((item, index) => (
              <div key={index} className="border p-4 text-center bg-gray-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile