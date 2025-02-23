// import React from 'react'

// const Create = () => {
//   return (
//     <div className='flex-1 bg-gray-900'>
//       Create
//     </div>
//   )
// }

// export default Create
import { useState } from "react";

export default function Create() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [privacy, setPrivacy] = useState("public");

  return (
    <div className="max-w-lg flex-1 mx-auto p-4 border rounded-lg bg-gray-800 text-white">
      <h2 className="text-xl font-bold mb-2">Create a Post</h2>
      
      <textarea
        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        className="mt-2 h-1/2"
        onChange={(e) => setImage(e.target.files[0])}
      />
      
      {/* Privacy Setting */}
      <select
        className="w-full p-2 rounded mt-2 bg-gray-700 border border-gray-600"
        value={privacy}
        onChange={(e) => setPrivacy(e.target.value)}
      >
        <option value="public">Public</option>
        <option value="friends">Friends Only</option>
        <option value="private">Only Me</option>
      </select>

      {/* Post Button */}
      <button className="mt-3 w-full bg-blue-500 p-2 rounded">Post</button>
    </div>
  );
}
