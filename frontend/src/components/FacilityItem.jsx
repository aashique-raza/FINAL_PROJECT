import React from 'react'
import '../styles/CardComp.css'

function FacilityItem({icon,type,name}) {
  return (
    <div className='facility_box_items w-2/5 flex-grow flex items-center justify-start border-2 gap-5 py-2 px-2'>
            <h4 className=' text-3xl text-slate-700'>{icon}</h4>
            <div className='flex flex-col justify-start gap-2'>
                <h3 className=' capitalize text-2xl font-roboto font-semibold text-slate-800'>{name}</h3>
                <p className=' text-slate-500 capitalize text-xl'>{type}</p>
            </div>
    </div>
  )
}

export default FacilityItem