import React from 'react'
import PropertyAmenitiesItem from './PropertyAmenitiesItem'
import { FaBed } from 'react-icons/fa'
import { FaBan, FaSmokingBan, FaDog, FaUserFriends } from 'react-icons/fa';

// Final rules list with icons
const pgrulesIcon = [
  { name: "no girls entry", icon: <FaBan /> },
  { name: "no smoking", icon: <FaSmokingBan /> },
  { name: "no pets", icon: <FaDog /> },
  { name: "guest allowed", icon: <FaUserFriends /> },
];

// Function to filter and return matched rules with icons
const filterPgRules = (rules) => {
  return pgrulesIcon.filter(item => rules && rules.includes(item.name));
};

function PgRules({pgRUles}) {

  const matchedPgRules = filterPgRules(pgRUles);

  return (
    <div className="pg-rules-container w-full bg-white border-2 border-gray-400 py-4 px-3 mb-10">
    <h3 className=" py-5 inline-block border-b-2 border-red-600 capitalize font-bold font-roboto tracking-wide text-xl sm:text-2xl md:text-4xl ">
     pg rules
    </h3>
   
      <div className="w-full flex flex-wrap gap-8 mt-3">
        {
          matchedPgRules && matchedPgRules.map((item,index)=>(
            <PropertyAmenitiesItem icon={item.icon} name={item.name} key={index} />
          ))
        }
       
      </div>
    
  </div>
  )
}

export default PgRules

// {pgRules.map((rule, index) => (
//     <PropertyAmenitiesItem key={index} icon={ruleIcons[rule]} name={rule} />
//   ))}