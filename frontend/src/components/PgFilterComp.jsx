import React, { useState, useEffect } from "react";
import FilterCheckBoxItem from "./FilterCheckBoxItem";
import {
  pgRoomSharing,
  availableFor,
  avaibility,
  foodTypes,
  isFoodAvailable,
} from "../utils";
import PriceSliderComp from "./PriceSliderComp";
import { FaTimes } from "react-icons/fa";
import "../styles/SearchPage.css";

function PgFilterComp({ filterComVisible, setFilterCompVisible }) {
  const [qParam, setQParam] = useState("");
  const [lParam, setLParam] = useState("");
  const [available_For, setAvailableFor] = useState("");
  const [pgAvaibility, setavaibility] = useState("");
  const [isfood, setIsFoodAvailable] = useState("");
  const [foodType, setFoodType] = useState("");
  const [price, setPrice] = useState([1000, 100000]);

  

  useEffect(() => {
    // search params ----
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get("q");
    const l = searchParams.get("l");

    // Query parameters ko state mein set karo
    setQParam(q || "");
    setLParam(l || "");
  }, [location.search]);

 

  return (
    <div className="pg_filter_sidebar">
      <div className=" w-full ">
        <p className=" text-xl sm:text-3xl text-slate-800 px-3  capitalize py-3  border-b-2 border-slate-800 font-roboto  font-normal ">
          choose filter
        </p>
      </div>
      <div>
        <p>room sharing</p>
        <div className=" flex justify-start items-start gap-3 flex-wrap px-2">
          {pgRoomSharing.slice(1)?.map((item, index) => (
            <FilterCheckBoxItem
              key={index}
              option={item.label}
              type={"radio"}
              name="sharing_group"
              value={item.value}
              setValue={setQParam}
              isChecked={
                item.value.trim().toLocaleLowerCase() ===
                qParam.trim().toLocaleLowerCase()
              }
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
              value={item.value}
              setValue={setAvailableFor}
              isChecked={
                item.value.trim().toLocaleLowerCase() ===
                available_For.trim().toLocaleLowerCase()
              }
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
              value={item.value}
              setValue={setavaibility}
              isChecked={
                item.value.trim().toLocaleLowerCase() ===
                pgAvaibility.trim().toLocaleLowerCase()
              }
            />
          ))}
        </div>
      </div>
      <div className=" w-full sm:w-1/2">
        <PriceSliderComp setPrice={setPrice} price={price} />
      </div>
      <div>
        <p>food avaibility</p>
        <div className=" flex justify-start items-start gap-1 flex-wrap ">
          {isFoodAvailable?.map((item, index) => (
            <FilterCheckBoxItem
              key={index}
              option={item.label}
              type={"radio"}
              name="foodAvailable_group"
              value={item.value}
              setValue={setIsFoodAvailable}
              isChecked={item.value === (isfood === "true" ? true : false)}
            />
          ))}
        </div>
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
              value={item.value}
              setValue={setFoodType}
              isChecked={
                item.value.trim().toLocaleLowerCase() ===
                foodType.trim().toLocaleLowerCase()
              }
            />
          ))}
        </div>
      </div>
      <div className="w-full px-2 md:hidden  sm:flex sm:justify-center sm:items-center">
        <button className=" font-roboto font-semibold  rounded-md w-full sm:w-1/2 px-4 py-3 focus:ring-0 border-none outline-none  bg-sky-800 text-white capitalize text-xl">
          apply filter
        </button>
      </div>
    </div>
  );
}

export default PgFilterComp;
