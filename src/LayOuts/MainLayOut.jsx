import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import Loading from '../Pages/Loading';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayOut = () => {
  //  const [Loading, setIsLoading] = useState(true);
  //    useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 500); 
  //   return () => clearTimeout(timer);
  // }, []);
    return (
         <div className="max-w-7xl mx-auto">
        <NavBar></NavBar>
        <div className="min-h-screen">
          {/* {Loading ? <Loading></Loading> : <Outlet></Outlet>} */}
          <Outlet></Outlet> 
        </div>
        <Footer></Footer>
      </div>
    );
};

export default MainLayOut;