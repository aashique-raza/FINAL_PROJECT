import React from "react";
import "../styles/YourProperty.css";
import YourPropertyCard from "../components/YourPropertyCard";

function YourPropertyPage() {
  return (
    <main className=" your-property-container">
      <div className=" justify-start items-center flex  border-b-2  ">
        <h1 className=" px-4 py-6 md:px-10  md:py-12 capitalize font-roboto tracking-wider font-semibold text-teal-950 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          You have already posted 3 properties on rental wave
        </h1>
      </div>
      <div className=" lg:px-16 md:px-8 sm:px-5 px-3 mt-20 flex items-center justify-start  gap-4 sm:gap-5 md:gap-7 lg:gap-10 flex-wrap ">
        <div className="radio-input-wrapper">
          <input type="radio" name="property-type" id="all" />
          <label htmlFor="all">all</label>
        </div>
        <div className="radio-input-wrapper">
          <input type="radio" name="property-type" id="rental" />
          <label htmlFor="rental">Rent</label>
        </div>

        <div className="radio-input-wrapper">
          <input type="radio" name="property-type" id="pg" />
          <label htmlFor="pg">Pg</label>
        </div>
      </div>

      <div className=" your-property-card-wrapper  sm:gap-10 px-4 sm:px-6 md:px-8 lg:px-16 mt-16 lg:mt-28  ">
        <YourPropertyCard />
        <YourPropertyCard />
        <YourPropertyCard />
        <YourPropertyCard />
        <YourPropertyCard />
        <YourPropertyCard />
      </div>
    </main>
  );
}

export default YourPropertyPage;
