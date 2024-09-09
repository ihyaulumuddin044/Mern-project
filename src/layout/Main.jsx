import React from 'react'
import Navbar from '../component/Navbar'
import Benners from '../component/Benners'
import '../App.css'
import Home from '../pages/home/Home'
import Footer from '../component/Footer'

const Main = () => {
  return (
    <div>
        <Navbar />
        <Home />
        <Footer />

    </div>
  )
}

export default Main
