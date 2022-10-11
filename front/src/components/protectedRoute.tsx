import React, { useContext, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

type ProtectedRouteProps = {
    children: React.ReactNode,
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

    const { bearerToken } = useContext(AuthContext);
    const navigate : NavigateFunction = useNavigate();

    useEffect(() => {
        if (bearerToken === "") {
            navigate('/auth');
        }
    }, [bearerToken, navigate])

    return (
        <>
            {children}
        </>
    );
}

export default ProtectedRoute;
