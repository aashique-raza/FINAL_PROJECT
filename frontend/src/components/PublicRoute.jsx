// import React from 'react'
import React, { useEffect, useState } from "react";

import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { isLoggedIn } from "../token";

function PublicRoute({children}) {
  const{isUserAuthenTicated}=useSelector((state)=>state.user)
  
    return isUserAuthenTicated ?<Navigate to={"/"} />  : children;
}

export default PublicRoute