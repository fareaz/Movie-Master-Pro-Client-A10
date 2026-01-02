import React from 'react';

import Loading from '../Loading';
import useRole from '../../hooks/useRole';
import UserDashboardHome from './UserDashboardHome';
import AdminDashboardHome from './AdminDashboardHome';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <Loading></Loading>
    }
    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
    
    else {
        return <UserDashboardHome></UserDashboardHome>
    }
};

export default DashboardHome;