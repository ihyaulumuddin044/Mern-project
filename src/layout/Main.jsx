import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/Navbar'
import '../App.css'
import Footer from '../component/Footer'


const Main = () => {
  return (
    <div>
        <Navbar />
        <div className='min-h-screen'>
        <Outlet />
        </div>
        <Footer />

    </div>
  )
}

export default Main
