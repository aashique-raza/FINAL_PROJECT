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

function SearchPage() {
  const location = useLocation();
  const [category, setCategory] = useState(null);
  const [filterComVisible, setFilterCompVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProperty, setFilteredProperty] = useState(null);

  const handleFilterChange = (values) => {
    // console.log(values)
  };

  useEffect(() => {
    const path = location.pathname; // Yaha se pura path mil jayega, jaise "/search/:category"
    const category = path.split("/")[2]; // Yaha se category ke value ko extract kiya jata hai
    // console.log(category)
    setCategory(category);
  }, [location.pathname]);

  const handleFilterComp = () => {
    setFilterCompVisible(!filterComVisible);
  };

  const applyFilter = async () => {
    const qParam = searchParams.get("q") || "";
    const lParam = searchParams.get("l") || "";
    const available_For = searchParams.get("available_For") || "";
    const pgAvaibility = searchParams.get("pgAvaibility") || "";
    const isfood = searchParams.get("isfood") || "";
    const foodType = searchParams.get("foodType") || "";
    const price = searchParams.get("price")
      ? searchParams.get("price").split(",").map(Number)
      : [100, 100000];
    let url;
    if (category?.trim().toLowerCase() === "rental".trim()) {
      url = `${API_URL}/rent/getRentalProperty?bhktype=${"1bhk"}&location=${"saket"}&price=${"1000,5000"}&tenet=${"faimly"}&isFurnished=${"furnishing"}`;
    } else {
      url = `${API_URL}/pg/getPgProperty?room_sharing=${
        qParam || "1bhk"
      }&available_for=${available_For || ""}&pg_avaibility=${
        pgAvaibility || ""
      }&pg_rent_amount=${price || ""}&food_avaibility=${
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
      console.log(result);

      if (!resp.ok) {
        setError(result.message);
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      setFilteredProperty(result.properties);
    } catch (error) {
      console.log("filter request failed", error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial filter application on component mount
    applyFilter();
  }, []); // Empty dependency array ensures this runs only once on mount

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
            color="#4fa94d"
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
            <CardComp key={index} data={data} />
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
