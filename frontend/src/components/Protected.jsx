import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
function Protected() {
    const {user}=useSelector((state)=>state.user)

return !user ? <Outlet/> : <Navigate to={'/'}/>
}

export default Protected


