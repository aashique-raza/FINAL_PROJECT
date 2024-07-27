import React from "react";
import { NavLink } from "react-router-dom";
import { LuIndianRupee } from "react-icons/lu";
import "../../styles/SingleProperty.css";
import { useParams } from "react-router-dom";

function PropertySimillarComp() {
  const { type, id } = useParams();

  return (
    <NavLink
      to={`property/${type}/${data._id}`} // Update this to the actual route you want to navigate to
      className="   property-simillar-box flex items-center w-full bg-white border-2 border-gray-800 shadow-lg transition transform duration-300 hover:shadow-2xl hover:scale-95"
    >
      <div className="  overflow-hidden">
        <img
          src={`${data.images[0]}`}
          alt="img"
          className="w-full h-full object-fill"
        />
      </div>
      <div className=" duration-300  px-3 flex-1  flex flex-col items-start border-2">
        <h2 className=" hover:text-red-600  transition  ease-in-out my-2 text-xl sm:text-2xl font-medium text-slate-800 capitalize tracking-wide font-roboto">
          {type === "rental"
            ? `${data.BHKType} for Rent in ${data.location.city}`
            : `${data.roomSharing} for Rent in ${data.location.city}`}
        </h2>
       
        <div className="flex items-center justify-around gap-12 mt-16">
          <p className="    text-gray-900 flex flex-col items-center justify-center gap-2 capitalize font-slab text-sm sm:text-xl">
            rent
            <span className="flex items-center font-bold">
              <LuIndianRupee size={"16px"} className="inline-block" />
              {data.rentAmount}
            </span>
          </p>
          {type === "rental" && (
            <p className="  text-gray-900 flex flex-col items-center justify-center gap-2 capitalize font-slab text-sm sm:text-xl">
              build area{" "}
              <span className=" font-bold"> {data.builtUpArea} sqrft. </span>
            </p>
          )}

          {type === "pg" && (
            <p className=" text-gray-900 flex flex-col items-center justify-center gap-2 capitalize font-slab text-sm sm:text-xl">
              food avaibility{" "}
              <span className="  font-bold">
                {" "}
                {data.foodAvaibility === true ? "Yes" : "No"}{" "}
              </span>
            </p>
          )}
        </div>
      </div>
    </NavLink>
  );
}

export default PropertySimillarComp;
