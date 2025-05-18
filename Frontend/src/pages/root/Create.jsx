import { useState, useRef, useEffect } from "react";
import { FaImages } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuUpload } from "react-icons/lu";

export default function Create() {
  const emojiref = useRef()
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const user = useSelector((state) => (state.userInfo.user));
  const navigate = useNavigate();

  const handleShare = async (e) => {
    e.preventDefault()
    const imageData = { user: user, image: image, caption: content }
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(imageData),
      });
      const message = await response.text();
      if (response.ok) {
        alert("Upload successful");
        navigate("/home");
      } else {
        alert("Upload failed: " + message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
    setContent("");
    setImage(null)
  }
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const uploadType = file.type.startsWith("image/") ? "image" : "raw";
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "EduSphere");
    data.append("cloud_name", "doqhrlji4");
    const res = await fetch(`https://api.cloudinary.com/v1_1/doqhrlji4/${uploadType}/upload`, {
      method: "POST",
      body: data
    })
    const uploadedImageUrl = await res.json()
    setImage(uploadedImageUrl.url);
  };
  const handleRemoveImage = () => {
    setImage(null); // Clears the image
  };
  const onEmojiClick = (emoji) => {
    console.log(emoji.emoji)
    setContent(prev => prev + emoji.emoji);
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
    <div className="w-full flex-1 mx-auto p-4 bg-gray-800 text-white scrollbar-hide overflow-y-scroll">
      <h2 className="text-xl font-bold mb-2">Create a Post</h2>
      <div className="flex p-2 rounded bg-gray-700  border border-gray-600 gap-2 items-center">
        <textarea
          className="w-full "
          placeholder="Share your thoughts.."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="relative">
          <MdEmojiEmotions size={"24px"} onClick={() => setShowPicker((val) => !val)} />
          {showPicker && (
            <div ref={emojiref} className="absolute top-10 left-0 z-20">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
      </div>
      {/* Image Upload */}
      <div className={`w-[100%] h-[10%] flex flex-col mt-4 gap-2 items-center px-10 justify-between`}>
        <div className={`gap-5 flex text-2xl justify-center items-center ${image ? " ": "min-h-[50vh]"}`}>
          <div className={`flex items-center gap-2 ${image ? "w-full" : "w-auto flex flex-row"}`}>
            <label className="cursor-pointer" htmlFor="image" >
              {image ? (
                <img
                  src={image}
                  alt="Profile Preview"
                  className="w-[80%] object-cover left-20 relative"
                />
              ) : (
                <div className="flex gap-2 items-center"><LuUpload size={"44px"}/>Upload your image here</div>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" name="image" id="image" />
            </label>
            {image && <button className="cursor-pointer" onClick={() => setImage(null)}><RiDeleteBin6Line size={"32px"}/></button>}
          </div>
        </div>
        {/* <button className={`px-3 bg-black text-white rounded-lg p-1 ${image ? "my-2" : ""}`} onClick={handleShare}>Share</button> */}
        <button className="mt-3 w-full bg-blue-500 p-2 rounded" onClick={handleShare}>Post</button>
      </div>
      {/* Post Button */}
    </div>
  );
}
