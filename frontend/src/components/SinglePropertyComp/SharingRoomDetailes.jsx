import React from "react";
import { LuIndianRupee } from "react-icons/lu";
import PropertyAmenitiesItem from "./PropertyAmenitiesItem";
import { FaBed } from "react-icons/fa";

function SharingRoomDetailes() {
  return (
    <div className="sharing-room-details w-full bg-white border-2 border-gray-400 py-4 px-3 mb-10">
      <h3 className=" py-5 inline-block border-b-2 border-red-600 capitalize font-bold font-roboto tracking-wide text-xl sm:text-2xl md:text-4xl ">
        single room sharing details
      </h3>
      <div className=" w-full flex items-center gap-52 py-8 border-b-2">
        <p className=" flex items-center justify-start gap-9 capitalize text-xl sm:text-2xl font-roboto font-light">
          Rent for single Occupancy{" "}
          <span className=" font-semibold font-roboto capitalize text-sm sm:text-xl text-gray-700">
            {" "}
            <LuIndianRupee className=" inline-block" /> 50,000/m{" "}
          </span>{" "}
        </p>
        <p className=" flex items-center justify-start gap-9 capitalize text-xl sm:text-2xl font-roboto font-light">
          Security Deposit{" "}
          <span className=" font-semibold font-roboto capitalize text-sm sm:text-xl text-gray-700">
            <LuIndianRupee className=" inline-block" /> 50,000
          </span>{" "}
        </p>
      </div>

      <div>
        <p className=" py-6 font-roboto font-medium capitalize text-sm sm:text-xl">
          room faciliteis
        </p>
        <div className="w-full flex flex-wrap gap-8 mt-3">
          <PropertyAmenitiesItem icon={<FaBed size={'20px'} />} name={"single bed"} />
        </div>
      </div>
    </div>
  );
}

export default SharingRoomDetailes;
