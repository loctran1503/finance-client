

import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hook';
import { authSelector } from '../store/reducers/authSlice';


interface ProtectedProps {
  component: () => JSX.Element;
}

const ProtectedRoute = ({ component: Component, ...rest }: ProtectedProps) => {
  const { isAuthenticated,isLoading } = useAppSelector(authSelector);
  const navigate = useNavigate()

  useEffect(() =>{
    if(!isLoading){
      if(!isAuthenticated) return navigate('/')
    }

  },[isAuthenticated,isLoading])

  // return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
  return <Component {...rest} /> ;
};

export default ProtectedRoute;