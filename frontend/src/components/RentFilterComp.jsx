import React,{useState,useEffect} from 'react'
import { bhkTypes,preferedTenats,furnishing,parking } from '../rentUtils'
import FilterCheckBoxItem from "./FilterCheckBoxItem";
import PriceSliderComp from "./PriceSliderComp";
import '../styles/SearchPage.css'

function RentFilterComp({}) {
  // const[checked,setChecked]=useState(searchQuery)
  const [qParam, setQParam] = useState('');
  const [lParam, setLParam] = useState('');
  const [price, setPrice] = useState([1000, 100000]);
 
  const[prefered_tenets,setPreferedTenats]=useState('')
  const[isFurnishing,setFurnishing]=useState('')
  const[isParking,setParking]=useState('')
  console.log(price,prefered_tenets,isFurnishing,isParking,qParam)

  useEffect(()=>{
     // search params ----
     const searchParams = new URLSearchParams(location.search);
     const q = searchParams.get('q');
     const l = searchParams.get('l');

     
     // Query parameters ko state mein set karo
     setQParam(q || '');
     setLParam(l || '');
  },[location.search])

  // console.log(qParam,lParam)

  return (
    <div className="rent_filter_sidebar">
      <div className=" w-full ">
        <p className="text-xl sm:text-3xl text-slate-800 px-3  capitalize py-3  border-b-2 border-slate-800 font-roboto  font-normal ">
          choose filter
        </p>
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
    <div className="w-full px-2 md:hidden  sm:flex sm:justify-center sm:items-center">
      <button className=" font-roboto font-semibold  rounded-md w-full sm:w-1/2 px-4 py-3 focus:ring-0 border-none outline-none  bg-sky-800 text-white capitalize text-xl">apply filter</button>
    </div>
  </div>
  )
}

export default RentFilterComp