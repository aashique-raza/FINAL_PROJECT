import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "../styles/SearchPage.css";
import PgFilterComp from "../components/PgFilterComp";
import RentFilterComp from "../components/RentFilterComp";
import CardComp from "../components/CardComp";
import { avaibility } from "../utils";
import { ThreeDots } from "react-loader-spinner";
import { API_URL } from "../configue";
import { useSelector,useDispatch } from "react-redux";
import { setFilteredProperties } from "../features/favourite.slice";

function SearchPage({showSuccessMessage}) {
  const location = useLocation();
  const [category, setCategory] = useState(null);
  const [filterComVisible, setFilterCompVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  // const [filteredProperty, setFilteredProperty] = useState(null);
  const dispatch=useDispatch()
  const{filteredProperty}=useSelector((state)=>state.favouriteProperty)

  const handleFilterChange = (values) => {
    // console.log(values)
  };

  useEffect(() => {
    const path = location.pathname; // Get the full path, e.g., "/search/rental"
    // console.log('Path:', path);
    const category = path.split("/")[2]; // Extract the category, e.g., "rental"
    // console.log('Category:', category);
    setCategory(category);
  }, [location.pathname]);

  const handleFilterComp = () => {
    setFilterCompVisible(!filterComVisible);
  };

  // console.log('apply filter se bahr',category)

  const applyFilter = async () => {
    // Common parameters
    const qParam = searchParams.get("q") || "";
    const lParam = searchParams.get("l") || "";

    let url;

    // Parameters specific to rental

    if (category?.trim().toLowerCase() === "rental".trim()) {
      
      const price = searchParams.get("price")
        ? searchParams.get("price").split(",").map(Number)
        : [100, 100000];
      const isFurnishing = searchParams.get("isFurnishing") || "";
      const preferedTenets = searchParams.get("prefered_tenets") || "";
      const isParking = searchParams.get("isParking") || "";

      url = `${API_URL}/rent/getRentalProperty?bhktype=${
        qParam || "1bhk"
      }&location=${lParam || "saket"}&price=${price.join(",")}&tenet=${
        preferedTenets || ""
      }&isFurnished=${isFurnishing || ""}&isParking=${isParking || ""}`;
    }
    // Parameters specific to PG
    else {
      const available_For = searchParams.get("available_For") || "";
      const pgAvaibility = searchParams.get("pgAvaibility") || "";
      const isfood = searchParams.get("isfood") || "";
      const foodType = searchParams.get("foodType") || "";
      const price = searchParams.get("price")
        ? searchParams.get("price").split(",").map(Number)
        : [100, 100000];

      url = `${API_URL}/pg/getPgProperty?room_sharing=${
        qParam || "1bhk"
      }&available_for=${available_For || ""}&pg_avaibility=${
        pgAvaibility || ""
      }&pg_rent_amount=${price.join(",")}&food_avaibility=${
        isfood || ""
      }&food_type=${foodType || ""}&location=${lParam || "saket"}&page=${1}`;
    }

    try {
      setError(null);
      setLoading(true);

      const resp = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await resp.json();
      // console.log(result);

      if (!resp.ok) {
        setError(result.message);
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      // setFilteredProperty(result.properties);
      dispatch(setFilteredProperties(result.properties))
    } catch (error) {
      console.log("filter request failed", error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
   // Only apply the filter after the category has been set
   if (category) {
    applyFilter();
  }
  }, [category]); // Empty dependency array ensures this runs only once on mount

  return (
    <main className=" search_page_container ">
      <div className="  px-3 flex justify-end  w-full pg_filter_btn bg-white py-2   ">
        <button
          onClick={handleFilterComp}
          className=" w-40 capitalize font-roboto text-xl px-5 py-2 focus:ring-0 border-none outline-none rounded-md bg-red-700 text-white "
        >
          {filterComVisible ? "close" : "filter"}
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
            applyFilter={applyFilter}
          />
        )}
        {category?.trim().toLowerCase() === "pg".trim() && (
          <PgFilterComp
            filterComVisible={filterComVisible}
            setFilterCompVisible={setFilterCompVisible}
            onFilterChange={handleFilterChange}
            applyFilter={applyFilter}
          />
        )}
      </aside>
      <div className=" flex-1 flex flex-col gap-7 px-2 ">
        {loading && (
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#FF0000"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
        {error ? (
          <div className="w-full py-10 bg-slate-100 rounded-md flex justify-center items-center shadow-md">
            <p className="text-red-700 capitalize font-slab font-semibold text-sm sm:text-xl md:text-2xl">
              {error}
            </p>
          </div>
        ) : filteredProperty && filteredProperty.length > 0 ? (
          filteredProperty.map((data, index) => (
            <CardComp key={index} data={data}  />
          ))
        ) : (
          <div className="w-full py-10 bg-slate-100 rounded-md flex justify-center items-center shadow-md">
            <p className="text-red-700 capitalize font-slab font-semibold text-sm sm:text-xl md:text-2xl">
              {"no properties found"}
            </p>
          </div> // Optional: Display a message if no properties are found
        )}
      </div>
    </main>
  );
}

export default SearchPage;
