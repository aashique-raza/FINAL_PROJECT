import React from "react";

import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
// import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailed } from "../features/user.slice";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../configue";
import { initializeApp } from "firebase/app";
import {
  setTokenInLocalStorage,
  setRefreshTokenInLocalStorage,
} from "../token";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);

// console.log('firebaseConfig',firebaseConfig)

function GoogleOAuthButton({ classNameName = "", showSuccessMessage }) {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      // console.log("resultsFromGoogle", resultsFromGoogle);
      const displayName = resultsFromGoogle.user.displayName.split(" ");
      const firstName = displayName[0];
      const lastName = displayName[1] || ""; // Handle cases where there might be only one name
      // return
      const res = await fetch(`${API_URL}/auth/googlelogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
          isEmailVerified: resultsFromGoogle.user.emailVerified,
        }),
      });
      const data = await res.json();
      // console.log('data',data)
      if (!res.ok) {
        dispatch(loginFailed(data.message));
        return;
      }
      dispatch(loginSuccess(data.user));
      setTokenInLocalStorage(data.tokens.accessToken);
      setRefreshTokenInLocalStorage(data.tokens.refreshToken);
      showSuccessMessage('logged in successfull!')

      // setTokenInLocalStorage(token, cookieExpiry);

      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/network-request-failed") {
        // Add specific handling for network request failed
        console.error(
          "Network request failed. Please check your internet connection and try again."
        );
      }
    }
  };
  return (
    <div className=" bg-white" onClick={handleGoogleClick}>
      <button className="px-4 py-4 xl:py-4 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
        <img
          className=" w-6 h-6 xl:w-8 xl:h-8"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span className=" text-xl">Login with Google</span>
      </button>
    </div>
  );
}

export default GoogleOAuthButton;
