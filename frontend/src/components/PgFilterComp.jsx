import React, { useState, useEffect, useCallback } from "react";

import { debounce } from "lodash";
import { IoIosArrowDown,IoIosArrowUp  } from "react-icons/io";
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
import { allCities } from "../utils";

import { API_URL } from "../configue";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function PgFilterComp({
  filterComVisible,
  setFilterCompVisible,
  onFilterChange,
  applyFilter,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [qParam, setQParam] = useState("");
  const [lParam, setLParam] = useState("");
  const [available_For, setAvailableFor] = useState("");
  const [pgAvaibility, setavaibility] = useState("");
  const [isfood, setIsFoodAvailable] = useState("");
  const [foodType, setFoodType] = useState("");
  const [price, setPrice] = useState([100, 100000]);
  
  

  useEffect(() => {
    const q = searchParams.get("q");
    const l = searchParams.get("l");
    // Query parameters ko state mein set karo
    setQParam(q);
    setLParam(l);
  }, []);
  useEffect(() => {
    // Update search params when state changes
    const params = {};

    if (qParam) params.q = qParam;
    if (lParam) params.l = lParam;
    if (available_For) params.available_For = available_For;
    if (pgAvaibility) params.pgAvaibility = pgAvaibility;
    if (isfood) params.isfood = isfood;
    if (foodType) params.foodType = foodType;
    if (price) params.price = price.join(",");

    const currentParams = Object.fromEntries(searchParams.entries());
    const newParams = Object.entries(params);

    if (newParams.some(([key, value]) => currentParams[key] !== value)) {
      setSearchParams(params);
    }

    // setSearchParams(params);
  }, [
    qParam,
    lParam,
    available_For,
    pgAvaibility,
    isfood,
    foodType,
    price,
    setSearchParams,
    searchParams,
  ]);

  // console.log("qparam", qParam, "lparam", lParam);


  return (
    <div className="pg_filter_sidebar bg-white">
    <div className="px-3 flex justify-end w-full pg_filter_btn py-2 md:hidden">
      <button
        onClick={()=>setFilterCompVisible(!filterComVisible)}
        className=" flex  items-center gap-1  w-44 capitalize font-roboto text-xl px-5 py-2 focus:ring-0 border-none outline-none rounded-md bg-red-700 text-white"
      >
        {
          filterComVisible ? ( <>
            <IoIosArrowUp /> hide filter
          </>) : ( <>
         
          <IoIosArrowDown/>show filter
          </>)
        }
        
      </button>
    </div>
    <div className={filterComVisible ? 'showForMobile' : 'hideForMobile'}>
      <div className="w-full border-b-2 border-slate-800 py-3 px-2 flex items-center justify-between">
        <p className="text-xl sm:text-3xl text-slate-800 capitalize font-roboto font-normal">
          choose filter
        </p>
        <button
          onClick={applyFilter}
          className="bg-slate-700 text-white px-6 rounded-md py-3 font-raleway text-xl sm:text-xl capitalize font-medium block"
        >
          apply filter
        </button>
      </div>
      <div className="w-full custom_select_city_box">
        <p>select city</p>
        <select
          onChange={(e) => setLParam(e.target.value)}
          name=""
          id=""
          value={lParam}
          className="focus:ring-0 px-4 py-3 rounded-sm font-roboto text-sm sm:text-xl md:text-2xl capitalize border-2 border-slate-800"
        >
          {allCities?.map((city, index) => (
            <option value={city.value} id={city.label} key={index}>
              {city.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>room sharing</p>
        <div className="flex justify-start items-start gap-3 flex-wrap px-2">
          {pgRoomSharing.slice(1)?.map((item, index) => (
            <FilterCheckBoxItem
              key={index}
              option={item.label}
              type={'radio'}
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
        <div className="flex justify-start items-start gap-3 flex-wrap px-2">
          {availableFor?.map((item, index) => (
            <FilterCheckBoxItem
              key={index}
              option={item.label}
              type={'radio'}
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
        <p>availability within</p>
        <div className="flex justify-start items-start gap-3 flex-wrap px-2">
          {avaibility?.map((item, index) => (
            <FilterCheckBoxItem
              key={index}
              option={item.label}
              type={'radio'}
              name="availability_group"
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
      <div className="w-full sm:w-1/2">
        <PriceSliderComp setPrice={setPrice} price={price} />
      </div>
      <div>
        <p>food availability</p>
        <div className="flex justify-start items-start gap-1 flex-wrap">
          {isFoodAvailable?.map((item, index) => (
            <FilterCheckBoxItem
              key={index}
              option={item.label}
              type={'radio'}
              name="foodAvailable_group"
              value={item.value}
              setValue={setIsFoodAvailable}
              isChecked={item.value === (isfood === 'true' ? true : false)}
            />
          ))}
        </div>
      </div>
      <div>
        <p>food type</p>
        <div className="flex justify-start items-start gap-1 flex-wrap">
          {foodTypes?.map((item, index) => (
            <FilterCheckBoxItem
              key={index}
              option={item.label}
              type={'radio'}
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
    </div>
  </div>
  );
}

export default PgFilterComp;
