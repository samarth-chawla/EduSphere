import React, { useState } from 'react'
import { FaUser, FaEye } from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux";
import { save } from '../../redux/userSlice'
import { FcGoogle } from "react-icons/fc";
import { share } from "../../redux/slice";
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  const [login, setLogin] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { username: username, password: pass }
    try {
      const response = await fetch("/api/loginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
      });

      const message = await response.text();
      console.log(response)
      if (response.ok) {
        alert("Login successful");
        dispatch(save(user))
        navigate("/home");
      } else {
        alert("Login failed: " + message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
    setUsername("")
    setPass("")
  }
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:3000/api/auth/google';

  }
  const handleComponent = (e) => {
    e.preventDefault()
    console.log(login)
    setLogin(!login)
    dispatch(share(!login))
  }

  return (
    <div className='flex flex-col justify-center items-center w-full gap-5'>
      <div>
        <h1 className='font-medium text-2xl text-center'>EduSphere</h1>
        <form className='flex flex-col p-2 gap-4 items-center' onSubmit={(e) => e.preventDefault()}>
          <div className='flex bg-white rounded-lg text-black px-2 justify-between items-center'>
            <input type="text" name="username" id="username" placeholder='Username' className='bg-white rounded-lg text-black p-1 px-2 outline-none' value={username} onChange={(e) => setUsername(e.target.value)} />
            <FaUser />
          </div>
          <div className='flex bg-white rounded-lg text-black px-2 justify-between items-center'>
            <input type="password" name="password" id="password" placeholder='Password' className='bg-white rounded-lg text-black p-1 px-2 outline-none' value={pass} onChange={(e) => setPass(e.target.value)} />
            <FaEye />
          </div>
          <p className='text-sm'>Don't have a account? <a className='text-xs text-blue-400 cursor-pointer' onClick={handleComponent}>Create Account</a></p>
          <button onClick={handleLogin} className='bg-gray-800 w-fit px-4 py-1 rounded-2xl'>Login</button>
        </form>
      </div>
      <div className='flex w-[30%] justify-center items-center gap-2 mb-2'>
        <div className='h-0.5 w-[30%] bg-gray-400'></div>
        <p>OR</p>
        <div className='h-0.5 w-[30%] bg-gray-400'></div>
      </div>
      <div>
        <button onClick={handleGoogleLogin} className='flex justify-between items-center gap-1 bg-white text-black py-1 px-2 rounded-2xl'><FcGoogle />Sign In with Google</button>
      </div>
    </div>
  )
}

export default SignIn