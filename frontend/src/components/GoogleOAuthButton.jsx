import React from 'react'
import {Button} from 'flowbite-react'
import google from "../assets/google.png";

function GoogleOAuthButton({className=''}) {
  return (
    <button className={`${className}`}>
    <img src={google} alt="google"   />
    <p>continue with google</p>
</button>


  )
}

export default GoogleOAuthButton