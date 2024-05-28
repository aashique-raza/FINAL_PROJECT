import React from 'react'
import PropertyAmenitiesItem from './PropertyAmenitiesItem'
import { FaBed } from 'react-icons/fa'
import { FaBan, FaSmokingBan, FaDog, FaUserFriends } from 'react-icons/fa';

function PgRules({pgRUles}) {

    const ruleIcons = {
        "no girls entry": <FaBan />,
        "no smoking": <FaSmokingBan />,
        "no pets": <FaDog />,
        "guest allowed": <FaUserFriends />
      };

  return (
    <div className="pg-rules-container w-full bg-white border-2 border-gray-400 py-4 px-3 mb-10">
    <h3 className=" py-5 inline-block border-b-2 border-red-600 capitalize font-bold font-roboto tracking-wide text-xl sm:text-2xl md:text-4xl ">
     pg rules
    </h3>
   
      <div className="w-full flex flex-wrap gap-8 mt-3">
        <PropertyAmenitiesItem icon={<FaBed size={'20px'} />} name={"single bed"} />
      </div>
    
  </div>
  )
}

export default PgRules

// {pgRules.map((rule, index) => (
//     <PropertyAmenitiesItem key={index} icon={ruleIcons[rule]} name={rule} />
//   ))}