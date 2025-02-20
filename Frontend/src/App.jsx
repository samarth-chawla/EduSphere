import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from "react-router-dom";
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import AuthLayout from './pages/auth/AuthLayout'
import HomeLayout from './pages/root/HomeLayout'
import { Profile,Create } from './pages/root';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<SignIn />} />
            <Route path='/SignUp' element={<SignUp />} />
          </Route>
          <Route>
            <Route element={<HomeLayout />}>
              <Route index element={<Profile />} />
              <Route path='/create' element={<Create />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App
