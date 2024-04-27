import React, { useEffect, useState } from "react";
import "../styles/Listing.css";
import { AllStates, cities } from "../utils";
import SelectTag from "./SelectTag";
import Input from "../components/Input";

function LocalityDetails({ formData, setFormData }) {
  // const [state, setState] = useState("");

  // Function to filter cities based on the current city
  function filterCitiesByCurrentCity(currentCity) {
    // Find the city object corresponding to the current city
    const cityObject = cities.find(
      (city) => Object.keys(city.cityName)[0] === currentCity.toLowerCase()
    );

    // If city object is found, return its cities array, otherwise return an empty array
    return cityObject ? Object.values(cityObject.cityName)[0] : [];
  }
  console.log(formData.state)

  const filteredCities = filterCitiesByCurrentCity(formData.state);

  return (
    <div className="locality-details">
      <div className="pg-section-heading">
        <h1> Locality: </h1>
      </div>
      <div className="local-add">
        <SelectTag
          optionValues={AllStates}
          optionName="select state"
          id='state'
          formData={formData}
          setFormData={setFormData}
          
          
        />
        <SelectTag
          optionName="select cities"
          optionValues={filteredCities}
          setFormData={setFormData}
          formData={formData}
          id='city'
        />
        <Input
          label="street/local area"
          type="text"
          placeholder="ex. hauz rani gao..."
          id="localAddress"
          formData={formData}
          setFormData={setFormData}
          
        />
      </div>
    </div>
  );
}

export default LocalityDetails;
