import React from 'react'
import {Button} from 'flowbite-react'
import google from "../assets/google.png";

function GoogleOAuthButton() {
  return (
    <button className="btn">
    <img src={google} alt="google"  />
    <p>google</p>
</button>


  )
}

export default GoogleOAuthButton