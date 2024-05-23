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

function HomePage() {
  const [selectedOption, setSelectedOption] = useState("rental"); // State to keep track of selected option
  const [searchBHK, setSearchBHK] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const[searchSharing,setSearchSharing]=useState('')

  // Function to handle change in radio input selection
  const handleRadioChange = (value) => {
    setSelectedOption(value); // Update selected option state
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(selectedOption==='rental'){
      
      navigate(`/search/${selectedOption}?q=${searchBHK }&&l=${searchLocation}`);

    }else{
      navigate(`/search/${selectedOption}?q=${searchSharing }&&l=${searchLocation}`);
    }
    
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
              />
              <SearchItemButton
                htmlFor={"pg"}
                id={"pg"}
                isChecked={selectedOption === "pg"}
                onCheckedChange={handleRadioChange}
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
                    onChange={((e)=>{setSearchBHK(e.target.value)})}
                  >
                    {bhkTypes?.map((bhk,index) => (
                      <option value={bhk.value} key={index}>{bhk.label}</option>
                    ))}
                  </select>
                </div>
              )}

              {selectedOption?.trim().toLocaleLowerCase() === "pg".trim()&&(<div>
                  <select
                    name=""
                    value={searchSharing}
                    id=""
                    className="focus:ring-0 custom-select h-100 border p-2 overflow-auto"
                    onChange={((e)=>{setSearchSharing(e.target.value)})}
                  >
                    {pgRoomSharing?.map((sharing,index) => (
                      <option key={index} value={sharing.value}>{sharing.label}</option>
                    ))}
                  </select>
                </div>)}

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
                  {allCities?.map((city,index) => (
                    <option key={index} value={city.value}>{city.label}</option>
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
    </main>
  );
}

export default HomePage;
