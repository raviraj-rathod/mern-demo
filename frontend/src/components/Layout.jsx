

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
// import Home from './Pages/Home'
import Students from './Pages/Students'
import Student from './Pages/Student'
import Login from './Pages/Login'
import Header from './Header'
import {  useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { checkLogin } from './Store/authSlice'
import Users from './Pages/Users'
import User from './Pages/User'

export default function Layout() {
 
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!localStorage.getItem('users')){
      localStorage.setItem('users',JSON.stringify([]));
    }
    dispatch(checkLogin())
  }, [])
  return (
    <div>
      <Router>
      {/* Load Header */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        <Header />
        <Routes>
          <Route  element={<PrivateRoutes  />}>
            <Route element={<Navigate to="/users" replace />} path="/" exact />
            <Route element={<Users />} path="/users"  />
            <Route element={<User />} path="/users/:id"  />
            <Route element={<Students />} path="/students"  />
            <Route element={<Student />} path="/students/:id"  />
            
          </Route>
          <Route element={<Login />} path="/login" />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </Router>
    </div>
  )
}
