import React, { useState } from 'react'
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'
import { AiOutlineUser } from 'react-icons/ai'
import img from '../../assets/EduSphere_Left_Part.jpeg'
import { useSelector, useDispatch } from "react-redux";
import { share } from '../../redux/slice'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  const [cpass, setCPass] = useState("")
  const [fullname, setFullname] = useState("")
  const [login, setLogin] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const userInfo = useSelector((state)=> state.userInfo.user)
  const handleSignup = () => {
    const user = { username: username, password: pass }
    // dispatch(save(user))
    setUsername("")
    setPass("")
    setCPass("")
    setFullname("")
    navigate('/home')
  }
  const handleComponent = (e)=>{
      e.preventDefault()
      setLogin(!login)
      console.log(login)
      dispatch(share(!login))
    }
  return (
    <>
      <h1 className='font-medium text-2xl text-center'>EduSphere</h1>
      <form className='flex flex-col p-2 gap-4 items-center'>
        <div className='flex bg-white rounded-lg text-black px-2 justify-between items-center'>
          <input type="text" name="username" id="username" placeholder='Username' className='bg-white rounded-lg text-black p-1 px-2 outline-none' value={username} onChange={(e) => setUsername(e.target.value)} />
          <FaUser />
        </div>
        <div className='flex bg-white rounded-lg text-black px-2 justify-between items-center'>
          <input type="text" name="fullname" id="fullname" placeholder='Full Name' className='bg-white rounded-lg text-black p-1 px-2 outline-none' value={fullname} onChange={(e) => setFullname(e.target.value)} />
          <AiOutlineUser />
        </div>
        <div className='flex bg-white rounded-lg text-black px-2 justify-between items-center'>
          <input type="password" name="password" id="password" placeholder='Password' className='bg-white rounded-lg text-black p-1 px-2 outline-none' value={pass} onChange={(e) => setPass(e.target.value)} />
          <FaEye />
        </div>
        <div className='flex bg-white rounded-lg text-black px-2 justify-between items-center'>
          <input type="password" name="cpassword" id="cpassword" placeholder='Confirm Password' className='bg-white rounded-lg text-black p-1 px-2 outline-none' value={cpass} onChange={(e) => setCPass(e.target.value)} />
          <FaEyeSlash />
        </div>
        <p className='text-sm'>Already have a account? <a className='text-xs text-blue-400 cursor-pointer' onClick={handleComponent}>Login</a></p>
        <button onClick={handleSignup} className='bg-gray-800 w-fit px-4 py-1 rounded-2xl'>Create Account</button>
      </form>
    </>
  )
}

export default SignUp