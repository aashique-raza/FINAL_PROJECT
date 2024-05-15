import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SearchPage() {
    const location = useLocation();
    const[category,setCategory]=useState(null)

    useEffect(()=>{
        const path = location.pathname; // Yaha se pura path mil jayega, jaise "/search/:category"
        const category = path.split("/")[2]; // Yaha se category ke value ko extract kiya jata hai
        // console.log(category)
        setCategory(category)
    },[location.pathname])

    // console.log(category)

  return (
    <div className=' mt-52'>SearchPage</div>
  )
}

export default SearchPage