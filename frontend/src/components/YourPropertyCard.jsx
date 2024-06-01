import React from "react";
import "../styles/YourProperty.css";
import { LuArrowUpRightSquare } from "react-icons/lu";
import { LuIndianRupee } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";

function YourPropertyCard() {
  return (
    <div className="your-property-card">
      <div className="flex justify-end items-center">
        <button className="py-3 px-6 sm:py-4   lg:px-13 capitalize text-sm sm:text-xl lg:text-2xl tracking-wider text-slate-700 bg-gray-100">
          inactive
        </button>
      </div>
      <div className=" mt-4">
        <NavLink className=" font-bold flex-shrink flex justify-start items-center gap-1 text-slate-800 bg-transparent capitalize text-xl  lg:text-2xl xl:text-3xl font-roboto font">
          {" "}
          1 BHK flat for rent in malviyanagr{" "}
          <span>
            {" "}
            <LuArrowUpRightSquare className=" inline-block" />{" "}
          </span>
        </NavLink>
        <p className=" capitalize my-2 text-sm font-sans  font-bold text-gray-600">
          independent house <span>local address</span>{" "}
        </p>
      </div>
      <div className=" my-8 flex items-center lg:gap-12 md:gap-9  gap-6">
        <p className=" capitalize flex items-center gap-3 font-sans tracking-wide font-semibold">
          rent{" "}
          <span className=" font-extrabold">
            {" "}
            <LuIndianRupee className=" inline-block" />
            1000/m
          </span>{" "}
        </p>
        <h4 className=" capitalize tracking-wider font-semibold font-roboto">
          city
        </h4>
      </div>
      <div className=" flex justify-between items-center mb-10">
        <button className=" tracking-wider flex justify-center items-start gap-1 lowercase  font-raleway text-xl sm:text-2xl px-5 py-3 bg-gray-200 text-teal-800 ">
          {" "}
          edit <MdEdit className=" inline-block text-green-700   mt-1" />{" "}
        </button>
        <button className=" tracking-wider flex justify-center items-start gap-1 lowercase  font-raleway text-xl sm:text-2xl px-5 py-3 bg-gray-200 text-teal-800 ">
          {" "}
          delete <MdDelete className=" inline-block  text-red-500   mt-1" />{" "}
        </button>
      </div>
      <div className=" flex justify-start items-start px-3 w-full">
        <h3 className=" font-bold w-full border-t-2 capitalize text-xl sm:text-xl lg:text-2xl  font-serif tracking-wider py-4 sm:py-6 md:py-9 lg:py-14  ">
          0 contated
        </h3>
      </div>
    </div>
  );
}

export default YourPropertyCard;
