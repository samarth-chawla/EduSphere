import React from 'react'
import img from '../../assets/EduSphere_Left_Part.jpeg'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { useSelector, useDispatch } from "react-redux";

const AuthLayout = () => {
  const SignInorUp = useSelector((state) => state.counter.value)
  return (
    <div className='h-screen w-full bg-black flex'>
      <div className='w-fit h-screen p-10'>
        <img src={img} alt="" className='h-full w-fit rounded-bl-4xl rounded-tl-4xl' />
      </div>
      <div className='w-1/2 h-full flex flex-1 flex-col justify-center items-center text-white'>
        {SignInorUp?<SignIn/>:<SignUp/>}
      </div>
    </div>
  )
}

export default AuthLayout