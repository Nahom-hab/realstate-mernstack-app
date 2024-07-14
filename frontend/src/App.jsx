import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from '../../backend/routes/pages/signup/signup'
import Profile from '../../backend/routes/pages/profile/profile'
import Login from '../../backend/routes/pages/login/login'
import Home from '../../backend/routes/pages/home/home'
import Navigation from './component/navigation/navigation'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
    <Navigation />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>

    </BrowserRouter>
  )
}
