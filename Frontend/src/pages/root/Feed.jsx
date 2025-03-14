import { useState,useEffect, useRef } from "react";
import { FaImages } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { AiOutlineDislike,AiOutlineLike } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { GoCommentDiscussion } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import EmojiPicker from 'emoji-picker-react';
import { share } from "../../redux/slice";

function Feed() {
  const [text, setText] = useState("");
  const [emojipicker, setemojipicker] = useState("")
  const dispatch = useDispatch();
  const emojiref = useRef()
  const handleShare = (text)=>{
    dispatch(share(text));
    setText("");  
    console.log(sharedValue)
  }

  return (
    <div className="flex flex-col gap-2 items-center w-[100%] h-[100%] bg-gray-900 p-10">
      <div className="bg-[#565656] flex flex-col w-[100%] rounded-3xl">
        <div className="w-[100%] bg-transparent flex gap-5 p-4 items-center justify-center">
          <img
            className="w-15 h-15 bg-transparent rounded-full outline-none"
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
          <input
            type="text"
            name="content"
            id="content"
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="Share your thoughts"
            className="h-[40%] w-[90%] text-xl py-5 px-4 rounded-3xl outline-none shadow-[4px_4px_8px_rgba(255,255,255,0.1),-4px_-4px_8px_rgba(0,0,0,0.6)]"
          />
        </div>
        <div className="w-[100%] h-[10%] flex items-center px-10 justify-between ">
          <div className=" flex gap-5 text-2xl">
            <FaImages />
            <MdEmojiEmotions/>
          </div>
          <button className="px-3 bg-black text-white rounded-lg p-1" onClick={()=>handleShare(text)}>Share</button>
        </div>
      </div>
      <div className="bg-[#565656] flex flex-col w-[100%] rounded-3xl">
        <div className="w-[100%] bg-transparent flex gap-5 p-4 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <img
              className="w-12 h-12 bg-transparent rounded-full outline-none"
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
            <div className="flex flex-col ">
              <h2 className="text-[1.3vw]">Devang kishore</h2>
              <h3 className="text-gray-400 font-medium">Active</h3>
            </div>
          </div>
          <SlOptions />
        </div>
        <div></div>
        <div className="w-[100%] bg-transparent flex gap-5 p-4 items-center justify-between px-6">
          <div className="flex gap-3 text-xl">
            <AiOutlineLike />
            <AiOutlineDislike />
          </div>
          <div className="flex gap-3 text-xl">
            <GoCommentDiscussion />
            <IoIosSend className="text-2xl"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;