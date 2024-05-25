import React from "react";
import { IoMdWater } from "react-icons/io";

function PropertyOverview() {
  return (
    <div className="w-full flex flex-grow flex-wrap items-center justify-start gap-3  mt-10">
      <div className="w-full sm:w-1/2 flex gap-3 items-center justify-start  border-b-2 border-dotted border-gray-500 py-4">
        <h3 className=" text-2xl sm:text-4xl text-slate-800">
          {" "}
          <IoMdWater />{" "}
        </h3>
        <h2 className="text-1xl sm:text-3xl capitalize font-roboto font-light tracking-wide text-slate-600 ">
          water supply
        </h2>
        <h4 className="  ml-8 text-sm sm:text-2xl capitalize font-roboto  font-bold tracking-wide text-slate-600 ">
          corporation
        </h4>
      </div>
    </div>
  );
}

export default PropertyOverview;
