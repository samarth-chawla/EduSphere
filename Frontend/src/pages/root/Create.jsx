// export default Create
import { useState } from "react";

export default function Create() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [privacy, setPrivacy] = useState("public");
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Correctly setting the image preview
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setImage(null); // Clears the image
  };

  return (
    <div className="w-full flex-1 mx-auto p-4 bg-gray-800 text-white">
      <h2 className="text-xl font-bold mb-2">Create a Post</h2>
      <textarea
        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {/* Image Upload */}
      <label className="cursor-pointer" htmlFor="image" >
        {image ? (
          <div className="relative w-[80%] left-20">
          <img
            src={image}
            alt="Post"
            className="w-full object-cover rounded mb-2"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
        ) : (<input
          type="file"
          accept="image/*"
          className="mt-2 h-1/2"
          onChange={handleImageChange}
        />)}
        {/* <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" name="image" id="image" /> */}
      </label>
      {/* Post Button */}
      <button className="mt-3 w-full bg-blue-500 p-2 rounded">Post</button>
    </div>
  );
}
