import React,{useState,useEffect} from 'react'

import {Navigate,Outlet,useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useCookies } from "react-cookie";


function CookieProtected() {
    const [cookies] = useCookies(["access_token"]);
    const navigate=useNavigate()
    
  useEffect(() => {
    if (cookies.jwt) {
        navigate("/");
      }
    }, [cookies, navigate]);


    return !cookies ? <Navigate to={'/login'} /> : <Outlet/>
   
}

export default CookieProtected