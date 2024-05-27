import React from "react";
import { IoMdWater } from "react-icons/io";

function PropertyOverview({icon,status,name}) {
  return (
    
      <div className="px-3 py-6 border-dashed border-b-2 flex gap-4 justify-start items-center w-full md:w-2/5  ">
        <h3 className=" text-2xl sm:text-4xl text-slate-800">
          {icon}
        </h3>
        <h2 className="text-sm sm:text-2xl capitalize font-roboto font-light tracking-wide text-slate-600 ">
        {name}
        </h2>
        <h4 className="  ml-12 text-sm sm:text-xl capitalize font-roboto  font-bold tracking-wide text-slate-600 ">
         {status}
        </h4>
      </div>

  );
}

export default PropertyOverview;
