import React from "react";
import { LuIndianRupee } from "react-icons/lu";
import PropertyAmenitiesItem from "./PropertyAmenitiesItem";
import { FaBed } from "react-icons/fa";
import '../../styles/SingleProperty.css'

function SharingRoomDetailes({
  sharing,rent,deposit,roomAmenity
}) {
  return (
    <div className="sharing-room-details w-full bg-white border-2 border-gray-400 py-4 px-3 mb-10">
      <h3 className=" py-5 inline-block border-b-2 border-red-600 capitalize font-bold font-roboto tracking-wide text-xl sm:text-2xl md:text-4xl ">
        {sharing} room sharing details
      </h3>
      <div className=" occupancy w-full flex sm:items-center sm:flex-row sm:gap-40 md:52 sm:justify-start flex-col gap-3 py-8 border-b-2">
        <p className=" flex items-center justify-start gap-9 capitalize text-xl sm:text-2xl font-roboto font-light">
          Rent for {sharing} Occupancy{" "}
          <span className=" font-semibold font-roboto capitalize text-sm sm:text-xl text-gray-700">
            {" "}
            <LuIndianRupee className=" inline-block" /> {rent}/m
          </span>{" "}
        </p>
        <p className=" flex items-center justify-start gap-9 capitalize text-xl sm:text-2xl font-roboto font-light">
          Security Deposit{" "}
          <span className=" font-semibold font-roboto capitalize text-sm sm:text-xl text-gray-700">
            <LuIndianRupee className=" inline-block" /> {deposit}
          </span>{" "}
        </p>
      </div>

      <div>
        <p className=" py-6 font-roboto font-medium capitalize text-sm sm:text-xl">
          room faciliteis
        </p>
        <div className="w-full flex flex-wrap gap-8 mt-3">
          {
            roomAmenity?.map((item,index)=>(
              <PropertyAmenitiesItem icon={item.icon} name={item.label} key={index} />
            ))
          }
         
        </div>
      </div>
    </div>
  );
}

export default SharingRoomDetailes;
