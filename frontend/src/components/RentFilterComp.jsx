import React,{useState,useEffect} from 'react'
import { bhkTypes,preferedTenats,furnishing,parking } from '../rentUtils'
import { IoIosArrowDown,IoIosArrowUp  } from "react-icons/io";
import FilterCheckBoxItem from "./FilterCheckBoxItem";
import PriceSliderComp from "./PriceSliderComp";
import '../styles/SearchPage.css'
import { allCities } from '../utils';
import {API_URL} from '../configue'
import { useSearchParams } from 'react-router-dom';

function RentFilterComp({applyFilter, filterComVisible,
  setFilterCompVisible}) {
 const[searchParams,setSearchParams]=useSearchParams()
  const [qParam, setQParam] = useState('');
  const [lParam, setLParam] = useState('');
  const [price, setPrice] = useState([100, 100000]);
 
  const[prefered_tenets,setPreferedTenats]=useState('')
  const[isFurnishing,setFurnishing]=useState('')
  const[isParking,setParking]=useState('')
  // console.log(price,prefered_tenets,isFurnishing,isParking,qParam)

  useEffect(()=>{
     // search params ----
     const q = searchParams.get('q');
     const l = searchParams.get('l');
     setQParam(q );
     setLParam(l );
  },[])
  useEffect(() => {
    // Update search params when state changes
    const params = {};

    if (qParam) params.q = qParam;
    if (lParam) params.l = lParam;
    if (isFurnishing) params.isFurnishing = isFurnishing;
    if (prefered_tenets) params.prefered_tenets = prefered_tenets;
    if (isParking) params.isParking = isParking;
    
    if (price) params.price = price.join(",");

    const currentParams = Object.fromEntries(searchParams.entries());
    const newParams = Object.entries(params);

    if (newParams.some(([key, value]) => currentParams[key] !== value)) {
      setSearchParams(params);
    }

   
  }, [
    qParam,
    lParam,
    isFurnishing,
    isParking,
    price,
    prefered_tenets,
    setSearchParams,
    searchParams,
  ]);



  

  return (
    <div className="rent_filter_sidebar">
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
    </div >
      <div className={filterComVisible ? 'showForMobile' : 'hideForMobile'}>
      <div className=" w-full  border-b-2 border-slate-800 py-3 px-2 flex items-center justify-between ">
        <p className=" text-xl sm:text-3xl text-slate-800   capitalize   font-roboto  font-normal  ">
          choose filter
        </p>
        <button onClick={applyFilter} className=" bg-slate-700 text-white px-6 rounded-md py-3 font-raleway text-xl sm:text-xl capitalize font-medium  block ">
          apply filter
        </button>
      </div>
      <div className=" w-full custom_select_city_box">
        <p>select city</p>
        <select
          onChange={(e) => setLParam(e.target.value)}
          name=""
          id=""
          value={lParam}
          className=" focus:ring-0 px-4 py-3 rounded-sm font-roboto text-sm sm:text-xl md:text-2xl capitalize border-2 border-slate-800"
        >
          {allCities?.map((city, index) => (
            <option value={city.value} id={city.label} key={index}>
              {city.label}
            </option>
          ))}
        </select>
      </div>
     
    <div>
      <p>BHK type</p>
      <div className=" flex justify-start items-start gap-3 flex-wrap px-2">
        {bhkTypes?.slice(1).map((item, index) => (
          <FilterCheckBoxItem 
            key={index}
            option={item.label}
            type={"radio"}
            name="bhk_group"
            value={item.value}
            isChecked={item.value.trim().toLocaleLowerCase()===qParam.trim().toLocaleLowerCase()}
            setValue={setQParam}
          />
        ))}
      </div>
    </div>
    <div>
      <p>prefered tenets</p>
      <div className=" flex justify-start items-start gap-3 flex-wrap px-2">
        {preferedTenats?.map((item, index) => (
          <FilterCheckBoxItem
            key={index}
            option={item.label}
            type={"radio"}
            name="tenats_group"
            value={item.value}
            isChecked={item.value.trim().toLocaleLowerCase()===prefered_tenets.trim().toLocaleLowerCase()}
            setValue={setPreferedTenats}
          />
        ))}
      </div>
    </div>
    <div>
      <p>furnishing</p>
      <div className=" flex justify-start items-start gap-3 flex-wrap px-2">
        {furnishing?.map((item, index) => (
          <FilterCheckBoxItem
            key={index}
            option={item.label}
            type={"radio"}
            name="furnishing_group"
            value={item.value}
            isChecked={item.value.trim().toLocaleLowerCase()===isFurnishing.trim().toLocaleLowerCase()}
            setValue={setFurnishing}
            
          />
        ))}
      </div>
    </div>
    <div className=" w-full sm:w-1/2 md:w-full">
      <PriceSliderComp setPrice={setPrice} price={price} />
    </div>
    <div>
      <p>parking</p>
      <div className=" flex justify-start items-start gap-1 flex-wrap ">
        {parking?.map((item, index) => (
          <FilterCheckBoxItem
            key={index}
            option={item.label}
            type={"radio"}
            name="parking_group"
            value={item.value}
            isChecked={item.value.trim().toLocaleLowerCase()===isParking.trim().toLocaleLowerCase()}
            setValue={setParking}
          />
        ))}
      </div>
    </div>
    
      </div>
  </div>
  )
}

export default RentFilterComp