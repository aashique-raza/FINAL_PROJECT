import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import "../styles/Home.css";
import SearchItemButton from "../components/SearchItemButton";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function HomePage() {

  const [selectedOption, setSelectedOption] = useState('rental'); // State to keep track of selected option

  // Function to handle change in radio input selection
  const handleRadioChange = (value) => {
    setSelectedOption(value); // Update selected option state
  };
  const navigate=useNavigate()
  
  const handleSubmit=(e)=>{
    e.preventDefault();

    navigate(`/search/${selectedOption}`)
  }

  return (
    <main className="home_container">
      <section className="search_section flex lg:justify-center lg:items-center  justify-center items-start lg:pt-0 pt-5 ">
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
              <div id="searchInputTextBox" className=" ">
                <FaSearch className="icons" />
                <input
                  type="text"
                  placeholder="search flat,house or pg.."
                  id="searchInput"
                  className=" focus:ring-0"
                />
              </div>
              <div id="locationOtionBox" className=" ">
                <MdLocationPin className="icons" />
                <select name="" id="" className="focus:ring-0 custom-select h-100 border p-2 overflow-auto">
                  <option value="mumbai" >
                    mumbai
                  </option>
                  <option value="delhi" className=" py-6">delhi</option>
                  <option value="pune">pune</option>
                  <option value="nagpur">nagpur</option>
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
