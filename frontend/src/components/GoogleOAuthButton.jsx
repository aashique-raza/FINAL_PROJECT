import React from 'react'

import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
// import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess,loginFailed } from "../features/user.slice";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../configue';
import { initializeApp } from "firebase/app";
import { setTokenInLocalStorage } from '../token';
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
const app = initializeApp(firebaseConfig);

// console.log('firebaseConfig',firebaseConfig)

function GoogleOAuthButton({className='',showSuccessMessage}) {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log('resultsFromGoogle',resultsFromGoogle)
      const displayName =resultsFromGoogle.user.displayName.split(' ');
      const firstName = displayName[0];
      const lastName = displayName[1] || ''; // Handle cases where there might be only one name
      // return
      const res = await fetch(`${API_URL}/auth/googlelogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
          isEmailVerified:resultsFromGoogle.user.emailVerified
        }),
      });
      const data = await res.json();
      // console.log('data',data)
      if(!res.ok){
        dispatch(loginFailed(data.message))
        return
      }
      dispatch(loginSuccess(data.user));
      setTokenInLocalStorage(data.token);
      // showSuccessMessage('logged in successfull!')

      // setTokenInLocalStorage(token, cookieExpiry);

      navigate("/");
      
     
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/network-request-failed') {
        // Add specific handling for network request failed
        console.error('Network request failed. Please check your internet connection and try again.');
      }
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
      size={'xl'}
      className=' text-xl'
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>


  )
}

export default GoogleOAuthButton