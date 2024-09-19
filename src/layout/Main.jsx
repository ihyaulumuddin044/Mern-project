import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import "../App.css";
import Footer from "../component/Footer";
// import { AuntContext } from "../context/AuntProvider";
// import LoadingSpiner from "../component/LoadingSpiner";

const Main = () => {
  // const { loading } = useContext(AuntContext);
  return (
    <div>
      
        <div>
        <Navbar />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div> 
      
      
    </div>
  );
};

export default Main;
