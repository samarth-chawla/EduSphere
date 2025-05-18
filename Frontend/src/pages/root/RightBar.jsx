import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

const RightBar = () => {
  const user = useSelector((state) => (state.userInfo.user))

  const [follow, setFollow] = useState(false);
  const [followedUsers, setFollowedUsers] = useState({});
  const [suggestion, setSuggestion] = useState([]);
  const [loggeduserId,setLoggeduserId] = useState();

  const getSuggestions = async () => {
    const response = await fetch("/api/getSuggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({loggeduserId})
    })
    const sug = await response.json()
    if (response.ok) {
      console.log(sug)
      setSuggestion(sug)
    }
  }
  const getUserId = async () => {
    const response = await fetch("/api/getUserId", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(user)
    })
    const data = await response.json()
    const id = data.userId
    setLoggeduserId(id)
  }
  useEffect(() => {
    getSuggestions()
    getUserId()
  }, [loggeduserId])


  const toggleFollow =async (userId) => {
    const alreadyFollowed = followedUsers?.[userId];
    if (alreadyFollowed) {
      const response = fetch(`/api/suggestions/${userId}/follow`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, loggeduserId }),
      })
      if(response.ok){
        console.log(response)
      }
      setFollowedUsers(prev => ({
        ...prev,
        [userId]: false,
      }));
    }
    // setFollowedUsers((prev) => ({
    // ...prev,
    // [userId]: !prev[userId],
    // }));
    else {
      const response = fetch(`/api/suggestions/${userId}/follow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, loggeduserId }),
      })
      // const msg = await response.text()
      if(response.ok){
        console.log(response)
      }
      setFollowedUsers(prev => ({
        ...prev,
        [userId]: true,
      }));
    }
  }
  return (
    <div className='flex flex-col w-[30vw] bg-gray-900 p-5 text-lg text-white overflow-y-scroll scrollbar-hide'>
      <div>
        <h1 className='font-bold mb-2'>Trending Topics</h1>
        <div>
          <div className='bg-[#565656] p-2 rounded-lg mb-2'>
            <p className='font-light text-sm text-gray-200'>#hashtags</p>
            <h4>HashTag Title </h4>
            <p className='font-light text-sm text-gray-200'>noofposts</p>
          </div>
          <div className='bg-[#565656] p-2 rounded-lg mb-2'>
            <p className='font-light text-sm text-gray-200'>#hashtags</p>
            <h4>HashTag Title </h4>
            <p className='font-light text-sm text-gray-200'>noofposts</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className='font-bold mb-2 mt-2'>Suggestions</h1>
        <div>
          <div className="flex items-center gap-4 text-base justify-between pb-3">
            <div className='flex gap-2 items-center'>
              <img className="w-8 h-8 bg-transparent rounded-full outline-none" src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
              <div className="flex flex-col">
                <h2 className="">Devang Kishore</h2>
                <h3 className="text-sm font-light text-gray-200">@devang_kishore</h3>
              </div>
            </div>
            <div className='bg-blue-500 rounded-xl px-3 py-1 cursor-pointer'>Follow</div>
          </div>
          <div className="flex items-center gap-4 text-base justify-between pb-3">
            <div className='flex gap-2 items-center'>
              <img className="w-8 h-8 bg-transparent rounded-full outline-none" src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
              <div className="flex flex-col">
                <h2 className="">Samarth Chawla</h2>
                <h3 className="text-sm font-light text-gray-200">@samarth_chawla</h3>
              </div>
            </div>
            <div className='bg-blue-500 rounded-xl px-3 py-1 cursor-pointer'>Follow</div>
          </div>
        </div>
        {
          suggestion.map((user, index) => {
            return (
              <div key={index} className="flex items-center gap-4 text-base justify-between pb-3">
                <div className='flex gap-2 items-center'>
                  <img className="w-8 h-8 bg-transparent rounded-full outline-none" src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
                  <div className="flex flex-col">
                    <h2 className="">{user.fullname}</h2>
                    <h3 className="text-sm font-light text-gray-200">@{user.username}</h3>
                  </div>
                </div>
                <div onClick={() => toggleFollow(user.user_id)} className={`${followedUsers[user.user_id] ? "bg-gray-500 text-black" : "bg-blue-500"} rounded-xl px-3 py-1 cursor-pointer`}>{` ${followedUsers[user.user_id] ? "Unfollow" : "Follow"}`}</div>
              </div>)
          })
        }
        {/* <SlOptions /> */}
      </div>
    </div >
  )
}

export default RightBar