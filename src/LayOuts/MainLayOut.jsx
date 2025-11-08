import React from 'react';

const MainLayOut = () => {
    return (
         <div className="max-w-7xl mx-auto">
        {/* <NavBar /> */}
        <div className="mt-4">
          <Outlet />
        </div>
        {/* <Footer/> */}
      </div>
    );
};

export default MainLayOut;