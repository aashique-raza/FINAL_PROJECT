import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../token'
function Protected() {
   
    const token=getTokenFromLocalStorage()
    // console.log('protected token',token)

    

return token ? <Outlet/> : <Navigate to={'/login'}/>
}

export default Protected


