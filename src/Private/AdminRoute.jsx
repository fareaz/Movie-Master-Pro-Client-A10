import React from 'react';
import useRole from '../hooks/useRole';
import Loading from '../Pages/Loading';



const AdminRoute = ({ children }) => {
   
    const { role, roleLoading } = useRole()

    if ( roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <h2 className='text-center text-3xl mt-20'>Access Denied. You are not authorized to view this page.</h2>
    }

    return children;
};

export default AdminRoute;