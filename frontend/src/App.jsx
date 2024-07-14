import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './pages/signup/signup'
import Profile from './pages/profile/profile'
import Login from './pages/login/login'
import Home from './pages/home/home'
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
