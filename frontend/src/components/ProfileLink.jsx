import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Profile.css'

function ProfileLink({link='/profile',className='',color='',linkaName=''}) {
  return (
    <div className={`profileLink`}>
        <Link to={link} className='link font-raleway' >{linkaName}</Link>
    </div>
  )
}

export default ProfileLink