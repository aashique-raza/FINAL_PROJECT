import React, { useState } from "react";
import "../styles/Profile.css";
import ProfileLink from "./ProfileLink";
import { useNavigate } from "react-router-dom";
import { logOutSuccess } from "../features/user.slice";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Spinner } from "flowbite-react";

function Profile({ toggle = false }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const links = [{ url: "profile/myProfile", urlName: "profile" }];

  const handleLogOut = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`/api/user/logout-account`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
      });
      // console.log(response)
      const result = await response.json();

      if (!response.ok) {
        // console.log(result)
        setError(result.message);
        return;
      }
      setLoading(false);
      dispatch(logOutSuccess());
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
          <Spinner color="success" aria-label="Failure spinner example" />
        ) : (
          "Log out"
        )}
      </button>
      {error && (
        <Alert color="failure" onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}
    </div>
  );
}

export default Profile;
