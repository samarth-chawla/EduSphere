import { useState, useEffect, useRef } from "react";
import { FaImages } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { GoCommentDiscussion } from "react-icons/go";
import { useDispatch } from "react-redux";
import EmojiPicker from 'emoji-picker-react';
import { share } from "../../redux/slice";

function Feed() {
  const emojiref = useRef()
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const dispatch = useDispatch();
  const handleShare = (text) => {
    dispatch(share(text));
    setText("");
    setImage(null)
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const onEmojiClick = (emoji) => {
    console.log(emoji.emoji)
    setText(prev => prev + emoji.emoji);
    setShowPicker(false);
  };
  useEffect(() => {
    const handelclickoutside = (event) => {
      if (emojiref.current && !emojiref.current.contains(event.target)) {
        setShowPicker(false);
      }
    }
    document.addEventListener("mousedown", handelclickoutside);
    return () => {
      document.removeEventListener("mousedown", handelclickoutside);
    }
  }, [emojiref])

  return (
    <div className="flex flex-col gap-4 items-center w-[100%] h-[100%] bg-gray-900 p-10">
      {/* Create  Post Div */}
      <div className="bg-[#565656] flex flex-col w-[100%] rounded-3xl">
        {/* Thoughts Div */}
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
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts"
            className="h-[40%] w-[90%] text-xl py-5 px-4 rounded-3xl outline-none shadow-[4px_4px_8px_rgba(255,255,255,0.1),-4px_-4px_8px_rgba(0,0,0,0.6)]"
          />
        </div>
        {/* Image Div */}
        <div className={`w-[100%] h-[10%] flex ${image ? "flex-col" : "flex-row"} items-center px-10 justify-between`}>
          <div className={`gap-5 flex text-2xl justify-center items-center`}>
            <div className={`flex items-center gap-2 ${image ? "w-full" : "w-auto flex flex-row"}`}>
              <label className="cursor-pointer" htmlFor="image" >
                {image ? (
                  <img
                    src={image}
                    alt="Profile Preview"
                    className="w-[80%] object-cover left-20 relative"
                  />
                ) : (
                  <FaImages />
                  // <div className="w-32 h-32 flex items-center justify-center border rounded-full ml-15 md:ml-17 md:w-42 md:h-42 bg-[#253D4C] text-white border-[#5BC6DF] relative">
                  //   <h2 className="absolute top-[50] font-bold "> Upload Image</h2>
                  //   <h1 className="text-8xl font-bold text-[#5BC6DF]">{userinfo.email.charAt(0).toUpperCase()}</h1>
                  // </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" name="image" id="image" />
              </label>
              {image && <button className="px-3 bg-black text-white rounded-lg p-1 text-sm" onClick={() => setImage(null)}>Remove</button>}
            </div>
            <div className="relative">
              <MdEmojiEmotions onClick={() => setShowPicker((val) => !val)} />
              {showPicker && (
                <div ref={emojiref} className="absolute top-10 left-0 z-20">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
          </div>
          <button className={`px-3 bg-black text-white rounded-lg p-1 ${image ? "my-2" : "" }`} onClick={() => handleShare(text)}>Share</button>
        </div>
      </div>
      {/* Post Div */}
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
        <div className="flex flex-col gap-2 justify-between items-center">
          <p>First  Post</p>
          <img src="../../src/assets/post.jpg" alt="" className="w-[90%] rounded-2xl"/>
        </div>
        <div className="w-[100%] bg-transparent flex gap-5 p-4 items-center justify-between px-6">
          <div className="flex gap-3 text-xl">
            <AiOutlineLike />
            <AiOutlineDislike />
          </div>
          <div className="flex gap-3 text-xl">
            <GoCommentDiscussion />
            <IoIosSend className="text-2xl" />
          </div>
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
        <div className="flex flex-col gap-2 justify-between items-center">
          <p>First  Post</p>
          <img src="../../src/assets/post.jpg" alt="" className="w-[90%] rounded-2xl"/>
        </div>
        <div className="w-[100%] bg-transparent flex gap-5 p-4 items-center justify-between px-6">
          <div className="flex gap-3 text-xl">
            <AiOutlineLike />
            <AiOutlineDislike />
          </div>
          <div className="flex gap-3 text-xl">
            <GoCommentDiscussion />
            <IoIosSend className="text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;