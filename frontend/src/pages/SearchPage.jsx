import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/SearchPage.css";
import PgFilterComp from "../components/PgFilterComp";
import RentFilterComp from "../components/RentFilterComp";
import CardComp from "../components/CardComp";
import { avaibility } from "../utils";
import {ThreeDots} from 'react-loader-spinner'
import { API_URL } from "../configue";


function SearchPage() {
  const location = useLocation();
  const [category, setCategory] = useState(null);
  const [filterComVisible, setFilterCompVisible] = useState(false);
  const [filters, setFilters] = useState({
    qParam: "",
    lParam: "",
    available_For: "",
    pgAvaibility: "",
    isfood: "",
    foodType: "",
    price: [1000, 100000],
  });

  const[loading,setLoading]=useState(false)
  const[error,setError]=useState(null)
  const[property,setProperty]=useState(null)
  

 
 

  useEffect(() => {
    const path = location.pathname; // Yaha se pura path mil jayega, jaise "/search/:category"
    const category = path.split("/")[2]; // Yaha se category ke value ko extract kiya jata hai
    // console.log(category)
    setCategory(category);

   
  }, [location.pathname]);
  

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
 
 


  const fecthData = async () => {
    const url = `${API_URL}/pg/getPgProperty?room_sharing=${filters.qParam}&location=${filters.lParam}`;


    try {
      setError(null)
      setLoading(true)
      
      const res=await fetch(url,{
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
      })
      const result = await res.json();
      // console.log(result)
      if (!res.ok) {
       
        setError(result.message);
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      return
    } catch (error) {
      console.log('fetching data failed',error)
      setError(error.message)
      setLoading(false)
    }
  };

  useEffect(()=>{
    fecthData()
  },[])

  
  // console.log(filters)
 

  const handleFilterComp = () => {
    setFilterCompVisible(!filterComVisible);
  };

  return (
    <main className=" search_page_container ">
      <div className="  px-3 flex justify-end  w-full pg_filter_btn bg-white py-2   ">
        <button
          onClick={handleFilterComp}
          className=" w-40 capitalize font-roboto text-xl px-5 py-2 focus:ring-0 border-none outline-none rounded-md bg-red-700 text-white "
        >
         {
          filterComVisible ? 'close' :"filter"
         }
        </button>
      </div>

      <aside
        className={`${
          filterComVisible ? "show_filter_comp" : ""
        } filter_sidebar`}
      >
        {category?.trim().toLowerCase() === "rental".trim() && (
          <RentFilterComp
          
            filterComVisible={filterComVisible}
            setFilterCompVisible={setFilterCompVisible}
            
            
          />
        )}
        {category?.trim().toLowerCase() === "pg".trim() && (
          <PgFilterComp
         
            filterComVisible={filterComVisible}
            setFilterCompVisible={setFilterCompVisible}
            onFilterChange={handleFilterChange}
            
            
          />
        )}
      </aside>
      <div className=" flex-1 flex flex-col gap-7 px-2 ">
        {
          loading && (
            <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
          )
        }
        {
          error && (
            <div className=" w-full py-10 bg-slate-200 rounded-md flex  justify-center items-center shadow-md">
              <p className=" text-red-700 capitalize font-slab font-semibold text-sm sm:text-xl md:text-2xl">{error}</p>
            </div>
          )
        }
        <CardComp/>
        <CardComp/>
      </div>
    </main>
  );
}

export default SearchPage;
