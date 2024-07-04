import React, { useEffect, useState } from "react";
import "../styles/Listing.css";
import { AllStates, cities } from "../utils";
import SelectTag from "./SelectTag";
import Input from "../components/Input";
import EditSelectComp from "./EditComp/EditSelectComp/EditSelectComp";
import EditInputComp from "./EditComp/EditInputComp";

function LocalityDetails({ formData, setFormData}) {
  // const [state, setState] = useState("");

  // Function to filter cities based on the current city
  function filterCitiesByCurrentCity(currentCity) {
    // Find the city object corresponding to the current city
    const cityObject = cities.find(
      (city) => Object.keys(city.cityName)[0] === currentCity?.toLowerCase()
    );

    // If city object is found, return its cities array, otherwise return an empty array
    return cityObject ? Object.values(cityObject.cityName)[0] : [];
  }
  // console.log(formData.state)

  const filteredCities = filterCitiesByCurrentCity(formData?.location?.state);

  return (
    <div className="locality-details">
      <div className="pg-section-heading">
        <h1> Locality: </h1>
      </div>
      <div className=" flex items-center gap-5 xl:gap-16 flex-wrap bg-white py-8 px-2 md:px-4 lg:px-6 rounded-md">
        <EditSelectComp
          optionValues={AllStates}
          optionName="select state"
          id='state'
          formData={formData}
          setFormData={setFormData}
          name={'state'}
          
                defaultValue={formData?.location?.state}
                locationField={true}
          
        />
        
        <EditSelectComp
          optionName="select cities"
          optionValues={filteredCities}
          setFormData={setFormData}
          formData={formData}
          id='city'
          name={'city'}
          defaultValue={formData?.location?.city}
                locationField={true}
        />
        <EditInputComp
          label="street/local area"
          type="text"
          placeholder="ex. hauz rani gao..."
          id="localAddress"
          formData={formData}
          setFormData={setFormData}
       
          defaultValue={formData?.location?.localAddress}
                locationField={true}
          
        />
         
      </div>
    </div>
  );
}

export default LocalityDetails;
