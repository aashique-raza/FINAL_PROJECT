import React,{useState} from 'react'
import { Outlet,Link ,useLocation} from 'react-router-dom'
import ProfileLink from '../components/ProfileLink'

function ProfilePage() {
    const [path,setPath]=('myProfile')



    const location = useLocation();
    const lastPath = location.pathname.split('/').pop();
    // console.log(lastPath)

  return (
    <main className='profilePgaeContainer'>
        <section className='profile_sidebar_section'>
            <p>manage your account</p>
            <div className='profileSideBarLInks'>
               <Link to={'myProfile'} className={`${lastPath==='myProfile' ? 'active' :''}`} >basic profile</Link>
               <Link to={'yourPropertyList'} className={`${lastPath==='yourPropertyList' ? 'active' :''}`}>your Property</Link>
               <Link to={'favourite'} className={`${lastPath==='favourite' ? 'active' :''}`}>favourite property</Link>
            </div>
        </section>
        <Outlet/>
    </main>
  )
}

export default ProfilePage