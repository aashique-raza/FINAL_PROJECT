import React, { useState, useEffect } from "react";
import "../styles/YourProperty.css";
import YourPropertyCard from "../components/YourPropertyCard";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../configue";
import { ThreeDots } from "react-loader-spinner";
import { getTokenFromLocalStorage } from "../token";
import {setAllUserPgProperty,setAllUserProperty,setAllUserRentProperty,filterPropertyByQuery } from "../features/userProperty.slice";

// import { useSelector,useDispatch } from "react-redux";

function YourPropertyPage({showSuccessMessage}) {
  const [filterQuery, setFilterQuery] = useState("all");
  const { user } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userProperty, setUserProperty] = useState([]);
  const token = getTokenFromLocalStorage();
  const{allProperty}=useSelector((state)=>state.userProperties)
  const dispatch=useDispatch()

  // console.log('all property of user',allProperty)

  const handleFilterChange = (e) => {
    const { id, value } = e.target;

    // console.log('first time id',id)
    setFilterQuery(id);
    dispatch(filterPropertyByQuery(id))
  };

  useEffect(() => {
    fetchUserProperty();
  },[]);

  const fetchUserProperty = async () => {
    try {
      setError(null);
      setLoading(true);

      let pgProperty;
      let rentProperty;

      
        const resp1 = await fetch(`${API_URL}/pg/getUserProperty/${user._id}`, {
          headers: {
            "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!resp1.ok) {
          setError(resp.message);
          setLoading(false);
          return;
        }

        pgProperty = await resp1.json();
        // console.log("pg prperty", pgProperty);
        dispatch(setAllUserPgProperty(pgProperty?.property))
      

      
        const resp = await fetch(
          `${API_URL}/rent/getUserProperty/${user._id}`,
          {
            headers: {
              "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!resp.ok) {
          setError(error.message);
          setLoading(false);
          return;
        }

        rentProperty = await resp.json();
        // console.log("rent property", rentProperty);
        dispatch(setAllUserRentProperty(rentProperty?.property))
      

      const combineData=[
       
        ...(pgProperty?.property || []),
        ...(rentProperty?.property || [])
      ]

      // console.log('combine property of user',combineData)

      // dispatch(setAllUserProperty(combineData))
      setUserProperty(combineData)

      setLoading(false);
      setError(null);
      return;
    } catch (error) {
      console.log("fetching user property failed", error);
      setLoading(false);
      setError(error.message);
    }
  };

  
    // console.log(userProperty)
  

  return (
    <main className=" your-property-container">
      <div className=" justify-start items-center flex  border-b-2  ">
        <h1 className=" px-4 py-6 md:px-10  md:py-12 capitalize font-roboto tracking-wider font-semibold text-teal-950 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          You have already posted {allProperty.length} properties on rental wave
        </h1>
      </div>
      <div className=" lg:px-16 md:px-8 sm:px-5 px-3 mt-20 flex items-center justify-start  gap-4 sm:gap-5 md:gap-7 lg:gap-10 flex-wrap ">
        <div className="radio-input-wrapper">
          <input
            onChange={handleFilterChange}
            type="radio"
            name="property-type"
            id="all"
            checked={filterQuery === "all"}
          />
          <label htmlFor="all">all</label>
        </div>
        <div className="radio-input-wrapper">
          <input
            onChange={handleFilterChange}
            type="radio"
            name="property-type"
            id="rental"
            checked={filterQuery === "rental"}
          />
          <label htmlFor="rental">Rent</label>
        </div>

        <div className="radio-input-wrapper">
          <input
            onChange={handleFilterChange}
            type="radio"
            name="property-type"
            id="pg"
            checked={filterQuery === "pg"}
          />
          <label htmlFor="pg">Pg</label>
        </div>
      </div>

      <div className=" your-property-card-wrapper  sm:gap-10 px-4 sm:px-6 md:px-8 lg:px-16 mt-16 lg:mt-28  ">
        {loading && (
          <div className="flex justify-center items-center bg-white py-4">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="red"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center bg-white py-4">
            <h1 className="capitalize font-bold font-roboto text-sm sm:text-xl md:text-2xl tracking-wider text-red-400">
              {error}
            </h1>
          </div>
        )}

        {
           allProperty?.length>0 ? allProperty.map((property,index)=>(
            <YourPropertyCard showSuccessMessage={showSuccessMessage} key={index} property={property} />
          )) : (
            <>
            <h1 className=" w-full text-red-600 capitalize text-xl md:text-2xl font-bold tracking-wider font-sans">you have not listed any property yet!</h1></>
          )
        }
        
       
      </div>
    </main>
  );
}

export default YourPropertyPage;



// if (filterQuery === "all" || filterQuery === "pg") {
//   const resp = await fetch(`${API_URL}/pg/getUserProperty/${user._id}`, {
//     headers: {
//       "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
//       Authorization: `Bearer ${token}`,
//     },
//     credentials: "include",
//   });

//   if (!resp.ok) {
//     setError(resp.message);
//     setLoading(false);
//     return;
//   }

//   pgProperty = await resp.json();
//   // console.log("pg prperty", pgProperty);
// }

// if (filterQuery === "all" || filterQuery === "rental") {
//   const resp = await fetch(
//     `${API_URL}/rent/getUserProperty/${user._id}`,
//     {
//       headers: {
//         "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
//         Authorization: `Bearer ${token}`,
//       },
//       credentials: "include",
//     }
//   );

//   if (!resp.ok) {
//     setError(error.message);
//     setLoading(false);
//     return;
//   }

//   rentProperty = await resp.json();
//   // console.log("rent property", rentProperty);
// }