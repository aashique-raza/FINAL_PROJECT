import React from 'react'
import github from "../assets/github.png";
import { Button } from 'flowbite-react';
import '../styles/Button.css'


function GithubButton() {
  return (
    <button className='btn' >
    <img src={github} alt="github"  />
    <p >google</p>
   </button>
  )
}

export default GithubButton