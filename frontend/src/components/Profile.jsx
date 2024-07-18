import React, { useState } from "react";
import "../styles/Profile.css";
import ProfileLink from "./ProfileLink";
import { useNavigate } from "react-router-dom";
import { logOutSuccess } from "../features/user.slice";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Spinner } from "flowbite-react";
import { removeTokenFromLocalStorage,getTokenFromLocalStorage } from "../token";
import { API_URL } from "../configue";
// import { useSelector,useDispatch } from 'react-redux'
import {clearStatePgLIsting} from '../features/pg.slice'
import { IoIosClose } from "react-icons/io";
import {clearStateOfUser} from '../features/userProperty.slice'


function Profile({ toggle = false,showSuccessMessage }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token=getTokenFromLocalStorage()
  const navigate=useNavigate()

  const links = [
    { url: "profile/myProfile", urlName: "profile" },
    {url:'profile/yourPropertyList',urlName:'your listing'},
    {url:'profile/favourite',urlName:'favourite property'}

  ];

  const handleLogOut = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${API_URL}/user/logout-account`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json", // Set content type to JSON
          "Authorization": `Bearer ${token}`
        },
        credentials:'include'
      });
      // console.log(response)
      const result = await response.json();
      // console.log(result)

      if (!response.ok) {
        // console.log(result)
        setError(result.message);
        setLoading(false)
        return;
      }
      setError(null)
      setLoading(false);
      removeTokenFromLocalStorage()
      dispatch(logOutSuccess());
  
      dispatch(clearStateOfUser())
      dispatch(clearStatePgLIsting())
      showSuccessMessage('logged out successfull!')

      navigate('/login')
    } catch (error) {
      console.log("logout failed", error);
    }
  };

  return (
    <div className={`${toggle ? "profileToggle" : ""} allLinksContainer `}>
      {links.map((link,index) => (
        <ProfileLink key={index} link={link.url} linkaName={link.urlName} />
      ))}

      <button className=" font-raleway" onClick={handleLogOut}>
        {loading ? (
          <>
          <Spinner
            color="success"
            aria-label="Failure spinner example"
          />{" "}
          loging out...
        </>
        ) : (
          "Log out"
        )}
      </button>
      {error && (
        <Alert color="failure" onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

      <div className=" w- flex justify-end py-1 absolute   top-0   right-1  text-5xl font-extrabold font-serif ">
<IoIosClose/>
      </div>
    </div>
  );
}

export default Profile;
