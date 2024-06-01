import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import "../styles/Home.css";
import SearchItemButton from "../components/SearchItemButton";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { allCities, pgRoomSharing } from "../utils";
import { bhkTypes } from "../rentUtils";
import { useSearchParams } from "react-router-dom";
import SearchCategory from "../components/HomeComp/SearchCategory";
import CardBox from "../components/HomeComp/CardBox";
import { API_URL } from "../configue";

import { ThreeDots } from "react-loader-spinner";

const filterOptions = [
  { id: "allItem", name: "filter-category", label: "All Property" },
  { id: "rentalItem", name: "filter-category", label: "Rental Property" },
  { id: "leaseItem", name: "filter-category", label: "Lease Property" },
  { id: "pgItem", name: "filter-category", label: "PG Property" },
];

function HomePage() {
  const [selectedOption, setSelectedOption] = useState("rental"); // State to keep track of selected option
  const [searchBHK, setSearchBHK] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchSharing, setSearchSharing] = useState("");
  const [selectFilter, setSelectFilter] = useState("allItem");
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1); // for pagination
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle change in radio input selection
  const handleRadioChange = (value) => {
    setSelectedOption(value); // Update selected option state
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedOption === "rental") {
      navigate(`/search/${selectedOption}?q=${searchBHK}&&l=${searchLocation}`);
    } else {
      navigate(
        `/search/${selectedOption}?q=${searchSharing}&&l=${searchLocation}`
      );
    }
  };

  const handleFilterChange = (value) => {
    setSelectFilter(value);
  };
  // console.log(selectFilter)

  useEffect(() => {
    fetchListings(1);
  }, [selectFilter]);

  const fetchListings = async (pageNumber) => {
    try {
      setError(null);
      setLoading(true);
      let pgData = [];
      let rentalData = [];
      let rentResponse;
      let pgResponse;

      if (selectFilter === "allItem" || selectFilter === "pgItem") {
        pgResponse = await fetch(
          `${API_URL}/pg/allProperty?page=${pageNumber}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!pgResponse.ok) {
          setError(pgResponse.message);
          setLoading(false);
          return;
        }

        pgData = await pgResponse.json();

        // console.log("pg data", pgData);
      }

      if (
        selectFilter === "allItem" ||
        selectFilter === "rentalItem" ||
        selectFilter === "leaseItem"
      ) {
        const type = selectFilter === "leaseItem" ? "lease" : "";
        rentResponse = await fetch(
          `${API_URL}/rent/property?page=${pageNumber}&type=${type}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!rentResponse.ok) {
          setError(rentResponse.message);
          setLoading(false);
          return;
        }

        rentalData = await rentResponse.json();
        // console.log("rental data", rentalData);
      }

      const combinedListings = [
        ...(pgData.property || []),
        ...(rentalData.rentListings || []),
      ];

      if (pageNumber === 1) {
        setListings(combinedListings); // Reset the listings on new filter
      } else {
        setListings((prevListings) => [...prevListings, ...combinedListings]);
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error(err);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchListings(nextPage);
  };

  return (
    <main className="home_container ">
      <section className="search_section flex  justify-center items-start pt-12">
        <div className=" search_center_box  ">
          <div className=" flex flex-col gap-3 sm:gap-5 md:gap-7 items-center search_heading">
            <h1 className=" text-4xl md:text-6xl font-semibold font-roboto capitalize   ">
              discover your{" "}
              <span className=" text-red-600">perfect rental</span>{" "}
            </h1>
            <p className=" text-xl md:text-3xl font-roboto font-normal capitalize ">
              rent apartment,house and pg in few clicks
            </p>
          </div>
          <div className="search_input_container flex flex-col items-center gap-3 md:gap-7 mt-3 ">
            <div className=" flex items-center sm:gap-3 gap-2">
              <SearchItemButton
                htmlFor={"rental"}
                id={"rental"}
                isChecked={selectedOption === "rental"}
                onCheckedChange={handleRadioChange}
                name={"search-cat"}
              />
              <SearchItemButton
                htmlFor={"pg"}
                id={"pg"}
                isChecked={selectedOption === "pg"}
                onCheckedChange={handleRadioChange}
                name={"search-cat"}
              />
            </div>
            <form className="  px-2" onSubmit={handleSubmit}>
              {selectedOption?.trim().toLocaleLowerCase() ===
                "rental".trim() && (
                <div>
                  <select
                    name=""
                    value={searchBHK}
                    id=""
                    className="focus:ring-0 custom-select h-100 border p-2 overflow-auto"
                    onChange={(e) => {
                      setSearchBHK(e.target.value);
                    }}
                  >
                    {bhkTypes?.map((bhk, index) => (
                      <option value={bhk.value} key={index}>
                        {bhk.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedOption?.trim().toLocaleLowerCase() === "pg".trim() && (
                <div>
                  <select
                    name=""
                    value={searchSharing}
                    id=""
                    className="focus:ring-0 custom-select h-100 border p-2 overflow-auto"
                    onChange={(e) => {
                      setSearchSharing(e.target.value);
                    }}
                  >
                    {pgRoomSharing?.map((sharing, index) => (
                      <option key={index} value={sharing.value}>
                        {sharing.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div id="locationOtionBox" className=" ">
                <MdLocationPin className="icons" />
                <select
                  value={searchLocation}
                  name=""
                  id=""
                  className="focus:ring-0 custom-select h-100 border p-2 overflow-auto"
                  onChange={(e) => {
                    setSearchLocation(e.target.value);
                  }}
                >
                  {allCities?.map((city, index) => (
                    <option key={index} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>
              <div id="searchButton">
                <button type="submit" className=" focus:ring-0">
                  <FaSearch /> <span>search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="featured-listing-container">
        <div className=" flex justify-center items-center py-5">
          <h1 className=" inline-block border-b-4 rounded-lg tracking-wider border-red-600 py-4 capitalize font-bold text-2xl sm:text-2xl md:text-3xl lg:text-5xl">
            featured listing
          </h1>
        </div>

        <div className=" mt-5 flex items-center justify-start gap-2 sm:gap-6 md:gap-10 lg:gap-14 border-2 border-gray-400 py-10 rounded-sm px-2 sm:px-4 flex-wrap">
          {filterOptions.map((item, index) => (
            <SearchCategory
              key={index}
              id={item.id}
              name={item.name}
              label={item.label}
              isChecked={selectFilter === item.id}
              handleFilterCHange={handleFilterChange}
            />
          ))}
        </div>
        <div className="home-card-wrapper mt-10">
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

          {!loading &&
            !error &&
           listings && listings.map((listing, index) => (
              <CardBox key={index} data={listing} />
            ))}

        </div>
        <div className=" w-full justify-center items-center ">
              <button className=" px-5 py-3 capitalize text-sm sm:text-xl md:text-2xl tracking-wider font-roboto font-medium text-white bg-red-600">load more</button>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
