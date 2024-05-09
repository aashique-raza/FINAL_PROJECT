import React, { useEffect, useState } from "react";

import { Outlet, Navigate } from "react-router-dom";

import { logOutSuccess } from "../features/user.slice";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "../token";
function Protected() {
  const loggedInStatus=isLoggedIn()
  const dispatch = useDispatch();
  if (!loggedInStatus) {
    dispatch(logOutSuccess());
  }

  return loggedInStatus ? <Outlet /> : <Navigate to={"/login"} />;
}

export default Protected;
