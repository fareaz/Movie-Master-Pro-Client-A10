
import NavBar from '../Components/NavBar';
import Loading from '../Pages/Loading';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayOut = () => {
    return (
         <div className="max-w-7xl mx-auto">
        <NavBar></NavBar>
        <div className="min-h-screen">
       
          <Outlet></Outlet> 
        </div>
        <Footer></Footer>
      </div>
    );
};

export default MainLayOut;