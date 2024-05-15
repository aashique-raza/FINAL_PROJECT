import React from "react";
import FilterCheckBoxItem from "./FilterCheckBoxItem";
import { pgRoomSharing, availableFor, avaibility, foodTypes } from "../utils";
import PriceSliderComp from "./PriceSliderComp";
import { FaTimes } from 'react-icons/fa';
import '../styles/SearchPage.css'

function PgFilterComp({filterComVisible,setFilterCompVisible}) {
  const roomSharing = ["single", "double", "three", "four"];

  // roomSharing.map((item)=>console.log(item))

 const handleHideFilterComp=()=>{
    setFilterCompVisible(false)
 }

  return (
    <div className="pg_filter_sidebar">
     
      <div>
        <p>room sharing</p>
        <div className=" flex justify-start items-start gap-3 flex-wrap px-2">
          {roomSharing?.map((item, index) => (
            <FilterCheckBoxItem
              key={index}
              option={item}
              type={"radio"}
              name="sharing_group"
            />
          ))}
        </div>
      </div>
      <div>
        <p>available for</p>
        <div className=" flex justify-start items-start gap-3 flex-wrap px-2">
          {availableFor?.map((item, index) => (
            <FilterCheckBoxItem
              key={index}
              option={item.label}
              type={"radio"}
              name="available_group"
            />
          ))}
        </div>
      </div>
      <div>
        <p>avaibility within</p>
        <div className=" flex justify-start items-start gap-3 flex-wrap px-2">
          {avaibility?.map((item, index) => (
            <FilterCheckBoxItem
              key={index}
              option={item.label}
              type={"radio"}
              name="avaibility_group"
            />
          ))}
        </div>
      </div>
      <div className=" w-full sm:w-1/2">
        <PriceSliderComp />
      </div>
      <div>
        <p>food type</p>
        <div className=" flex justify-start items-start gap-1 flex-wrap ">
          {foodTypes?.map((item, index) => (
            <FilterCheckBoxItem
              key={index}
              option={item.label}
              type={"radio"}
              name="food_group"
            />
          ))}
        </div>
      </div>
      <div className="w-full px-2 md:hidden  sm:flex sm:justify-center sm:items-center">
        <button className=" font-roboto font-semibold  rounded-md w-full sm:w-1/2 px-4 py-3 focus:ring-0 border-none outline-none  bg-sky-800 text-white capitalize text-xl">apply filter</button>
      </div>
    </div>
  );
}

export default PgFilterComp;
