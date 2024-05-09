import React, { useEffect, useState } from "react";

import { Outlet, Navigate } from "react-router-dom";

import { logOutSuccess } from "../features/user.slice";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "../token";
function Protected() {
  const dispatch = useDispatch();
  if (!isLoggedIn()) {
    dispatch(logOutSuccess());
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
}

export default Protected;
