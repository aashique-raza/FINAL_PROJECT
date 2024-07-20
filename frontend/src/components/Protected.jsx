import React, { useEffect, useState } from "react";

import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { logOutSuccess } from "../features/user.slice";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "../token";
function Protected({children}) {
  const dispatch=useDispatch()
 const{isUserAuthenTicated}=useSelector((state)=>state.user)
  if (!isUserAuthenTicated) {
    dispatch(logOutSuccess());
    return <Navigate to="/login" />;
  }

  return <Outlet/>;
}

export default Protected;
