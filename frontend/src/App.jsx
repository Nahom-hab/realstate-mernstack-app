import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/signup/signup'
import Profile from './pages/profile/profile'
import Login from './pages/login/login'
import Home from './pages/home/home'
import CreateLising from './pages/createlisting/CreateLising'
import Navigation from './component/navigation/navigation'
import './App.css'
import ProtectedRoute from './component/protectedRoute/protectedRoute'
import EditListing from './pages/EditLIsting/editListing'
import ViewListing from './pages/ViewListing/viewlisting'
import MyListing from './pages/mylisting/MyListing'
import Search from './pages/search/Search'


export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/editListing/:id' element={<EditListing />}></Route>
        <Route path='/viewListing/:id' element={<ViewListing />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/createListing' element={<CreateLising />}></Route>
          <Route path='/mylisting' element={<MyListing />}></Route>
        </Route>

      </Routes>

    </BrowserRouter>
  )
}
