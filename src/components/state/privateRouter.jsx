import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {AuthContext} from './authContext';

const PrivateRoute = () => {
    const [user, setUser] = useContext(AuthContext);

    const auth = user.isLoggedIn; // determine if authorized, from context or however you're doing it
    return auth ? <Outlet /> : <Navigate to="/" />;
}
export default PrivateRoute