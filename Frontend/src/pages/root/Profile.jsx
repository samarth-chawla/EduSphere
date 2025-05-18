import { useState, useEffect } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { ImTable } from "react-icons/im";
import { CiBookmark } from "react-icons/ci";
import { useSelector } from "react-redux";
import { MdOutlineEdit } from "react-icons/md";
const posts = [

];

const Profile = () => {
  const [userId, setuserId] = useState()
  console.log("user id ", userId)
  const [userInfo, setuserInfo] = useState([])
  const [posts, setPosts] = useState([])
  const user = useSelector((state) => (state.userInfo.user));

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch("/api/getuserInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user)
      })
      const data = await response.json()
      console.log(data)
      const id = data.user_id
      setuserId(id)
      setuserInfo(data)
    }
    getUserInfo();
  }, [])
console.log(userInfo)
  useEffect(() => {
    if (!userId) return;  // Skip fetch if userId is falsy
    const getPosts = async () => {
      try {
        const response = await fetch(`/api/getPosts/${userId}`, {
          method: "GET",
        });
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
        // const ids = data.map(post => post.post_id)
        // setpostIds(ids)
      } catch (error) {
        console.error("Error:", error);
        alert("Error loading posts. Check the console for details.");
      }
    }
    getPosts()
  }, [userId]);
  return (
    <>
      <div className='flex flex-col gap-4 items-center w-[100%] min-h-[100%] bg-gray-900 px-10 py-2 text-white overflow-y-scroll scrollbar-hide'>
        <div className='flex gap-10 w-[80%] p-10'>
          <div className='flex w-full justify-between items-center'>
            <div>
              <img src="../../src/assets/hogwarts.jpg" alt="" className='w-32 h-32 rounded-full object-cover border-2  border-[#5BC6DF] md:w-42 md:h-42' />
            </div>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-5'>
                <h2 className='text-xl'>{userInfo.username}</h2>
                <button className='bg-gray-700 px-2 py-1 rounded-lg flex items-center gap-1'><MdOutlineEdit />Edit Profile</button>
              </div>
              <div className='flex justify-between'>
                <p>{posts.length} Posts</p>
                <p className='flex items-center gap-1'>000 Aura<FaFireFlameCurved /></p>
              </div>
              <div>
                {/* {(Array.from(userInfo.follows))} */}
                {userInfo.follows.length} Following
              </div>
              <div className='flex flex-col text-sm'>
                <h1 className='text-base'>{userInfo.fullname}</h1>
                {/* <p>desc line1</p>
                <p>desc line2</p> */}
                <p className="text-slate-400">{(userId && userInfo.bio.length === 0) ?  "NO BIO..." : "userInfo.bio "}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='h-0.5 bg-amber-50 w-[80%] mt-2' />
        <div className='w-[80%] flex  flex-col'>
          <div className='flex gap-20 justify-center'>
            <button className='flex items-center gap-1 hover:underline cursor-pointer'><ImTable />Posts</button>
            <button className='flex items-center gap-1 hover:underline cursor-pointer'><CiBookmark />Saved</button>
          </div>
          <div className='grid grid-cols-3 gap-4 p-4'>
            {posts.length === 0 ? (
              <p className="text-blue-200 text-xl text-center">No posts till now.......</p>
            ) : (posts.map((post, index) => {
              let base64Image;
              if (post.image && post.image.data) {
                const byteArray = new Uint8Array(Array.from(post.image.data));
                const imageUrl = new TextDecoder().decode(byteArray); // This is the actual URL
                base64Image = imageUrl;
              } return (
                <div key={index} className="border p-1 text-center bg-gray-200 flex justify-center items-center">
                  {base64Image && (<img src={base64Image} alt="" className="w-[90%] rounded-2xl" />)}
                </div>)
            }))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile