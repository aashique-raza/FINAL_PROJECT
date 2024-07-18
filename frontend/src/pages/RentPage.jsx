import React, { useState, useRef, useEffect } from "react";
import "../styles/Rent.css";
import LocalityDetails from "../components/LocalityDetails";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import AmenitiesFeatures from "../components/AmenitiesFeatures";
import UploadPhotos from "../components/UploadPhotos";
import SelectTag from "../components/SelectTag";
import Input from "../components/Input";
import { roomAmenitiesList } from "../rentUtils";
import { getTokenFromLocalStorage,refreshAccessToken } from "../token";
import { API_URL } from "../configue";
import {
  preferedTenats,
  monthlyMaintenance,
  furnishing,
  parking,
  waterSupply,
  electricity,
  roomDetailsOptions,
} from "../rentUtils";
import RadioInput from "../components/RadioInput";

import CalenderInput from "../components/CalenderInput";
import { Alert, Spinner } from "flowbite-react";
// import { IndianRupeeIcon } from "@mui/icons-material";
import DescriptionInput from "../components/DescriptionInput";
import { AllStates, cities } from "../utils";
import { useNavigate } from "react-router-dom";

function RentPage({ showSuccessMessage }) {
  const token = getTokenFromLocalStorage();
  const [state, setState] = useState("");
  const [photos, setPhotos] = useState([]);
  const [isPropertyCreated, setIspropertyCreated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formRef = useRef(null);

  // console.log(photos)

  // Function to filter cities based on the current city
  function filterCitiesByCurrentCity(currentCity) {
    // Find the city object corresponding to the current city
    const cityObject = cities.find(
      (city) => Object.keys(city.cityName)[0] === currentCity.toLowerCase()
    );

    // If city object is found, return its cities array, otherwise return an empty array
    return cityObject ? Object.values(cityObject.cityName)[0] : [];
  }
  // console.log(formData.state)

  const filteredCities = filterCitiesByCurrentCity(state);

  // property details data----
  const [propertyDetails, setPropertyDetails] = useState({});
  // console.log('propertyDetails',propertyDetails);
  const [renatlDetails, setRentalsDetails] = useState({
    tenats: [],
  });
  // console.log(renatlDetails);
  const [localDetails, setLocalDetails] = useState({});
  // console.log(localDetails)
  const [additionalDetails, setAdditionalDetails] = useState({
    availableAmenities: [],
  });
  let [bedroom, setBedroom] = useState(0);
  let [balcony, setbalcony] = useState(0);
  let [guest, setGuest] = useState(0);
  let [bathroom, setBathroom] = useState(0);

  const handleTenetCHeckBox = (e) => {
    const { checked, id, value } = e.target;
    if (checked) {
      // Add the checked amenity to the roomAmenities array

      setRentalsDetails({
        ...renatlDetails,
        tenats: [...renatlDetails.tenats, id],
      });
    } else {
      // Remove the unchecked amenity from the roomAmenities array

      setRentalsDetails((prevData) => ({
        ...prevData,
        tenats: prevData.tenats.filter((amenityId) => amenityId !== id),
      }));
    }
  };

  const handleAmenitiesCheckBox = (e) => {
    const { id, checked, value } = e.target;
    if (checked) {
      setAdditionalDetails({
        ...additionalDetails,
        availableAmenities: [...additionalDetails.availableAmenities, id],
      });
    } else {
      setAdditionalDetails((prevData) => ({
        ...prevData,
        availableAmenities: prevData.availableAmenities.filter(
          (oldAmenity) => oldAmenity !== id
        ),
      }));
    }
  };

  // console.log(additionalDetails);

  // form submittion----
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (
      renatlDetails.monthlyMaintenance &&
      renatlDetails.monthlyMaintenance.trim().toLocaleLowerCase() ===
        "includedMaintenance".trim().toLocaleLowerCase()
    ) {
      renatlDetails.maintenanceAmount = 0;
    }

    if(renatlDetails.rentAmount>renatlDetails.depositAmount){
      setError('deosit amount can not be less than rent amount')
    }
    const rentFormData = new FormData();

    // property details data---------
    rentFormData.append("apartmentName", propertyDetails.apartment_name);
    rentFormData.append("apartmentType", propertyDetails.apartment_type);
    rentFormData.append("BHKType", propertyDetails.bhk_type);
    rentFormData.append("propertyArea", propertyDetails.built_up_area);
    rentFormData.append("propertyFacing", propertyDetails.facing);
    rentFormData.append("propertyFloor", propertyDetails.floor);
    rentFormData.append("propertyAge", propertyDetails.propertyAge);
    rentFormData.append("totalFloor", propertyDetails.totalFloor);

    // rentals details data======
    rentFormData.append("availableFrom", renatlDetails.available_from);
    rentFormData.append("depositAmount", renatlDetails.depositAmount);
    rentFormData.append("description", renatlDetails.description);
    rentFormData.append("furnishing", renatlDetails.furnishing);
    rentFormData.append("maintenanceAmount", renatlDetails.maintenanceAmount);
    rentFormData.append("monthlyMaintenance", renatlDetails.monthlyMaintenance);
    rentFormData.append("parking", renatlDetails.parking);
    rentFormData.append(
      "propertyAvailableFor",
      renatlDetails.propertyAvailableFor
    );
    rentFormData.append("rentAmount", renatlDetails.rentAmount);
    renatlDetails.tenats?.forEach((tenant) => {
      rentFormData.append("preferedTenats", tenant);
    });
    // rentFormData.append("preferedTenats", renatlDetails.tenats);

    // localality details data--
    rentFormData.append("city", localDetails.city);
    rentFormData.append("localAddress", localDetails.localAddress);
    rentFormData.append("state", localDetails.state);

    // other details--------
    // console.log(typeof bedroom,typeof balcony,typeof guest)
    rentFormData.append("bedroom", bedroom);
    rentFormData.append("balcony", balcony);
    rentFormData.append("guest", guest);
    rentFormData.append("bathroom", bathroom);

    additionalDetails.availableAmenities?.forEach((amenity) => {
      rentFormData.append("availableAmenities", amenity);
    });
    rentFormData.append("electricity", additionalDetails.electricity);
    rentFormData.append("waterSupply", additionalDetails.waterSupply);

    /* Append each selected photos to the FormData object */
    photos.forEach((photo) => {
      rentFormData.append("listingPhotos", photo);
    });

    try {
      setError(null);

      setLoading(true);

      const resp = await fetch(`${API_URL}/rent/create`, {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data"// JSON format mein Content-Type header set kiya gaya hai
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: rentFormData,
      });
      // console.log(resp);
      const data = await resp.json();
      // console.log(data);

      if (!resp.ok) {
        if (resp.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            // Retry original request with new token
            await handleSubmitWithToken(newToken,rentFormData);
          } else {
            setError("Failed to refresh access token");
          }

          return;
        }
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      showSuccessMessage("rent property created");
      navigate(`/property/rental/${data.saveProperty._id}`);
    } catch (error) {
      setError('something went wrong,please try agaun later');
      setLoading(false);
      console.log(error.message);
    }
  };

  const handleSubmitWithToken=async(newToken,rentFormData)=>{
    try {
      setError(null);

      setLoading(true);

      const resp = await fetch(`${API_URL}/rent/create`, {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data"// JSON format mein Content-Type header set kiya gaya hai
          Authorization: `Bearer ${newToken}`,
        },
        credentials: "include",
        body: rentFormData,
      });
      // console.log(resp);
      const data = await resp.json();
      // console.log(data);

      if (!resp.ok) {
        
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      showSuccessMessage("rent property created");
      navigate(`/property/rental/${data.saveProperty._id}`);
    } catch (error) {
      setError('something went wrong,please try agaun later');
      setLoading(false);
      console.log(error.message);
    }

  }

  return (
    <div className=" rent_container ">
      <form ref={formRef} onSubmit={handleSubmitForm} className=" w-full">
        <section className="rent_section_1 ">
          <div className="mb-5">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-raleway  font-extrabold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-600">
              Property Details
            </h2>
          </div>
          <div className=" px-2 md:px-4 lg:px-8 py-6 md:py-5 lg:py-7 bg-white  ">
            <div className=" flex  flex-wrap justify-start items-center gap-4 md:gap-3 lg:gap-5  ">
              {roomDetailsOptions?.map((data, index) => (
                <SelectTag
                  key={index}
                  id={data.id}
                  name={data.id}
                  optionName={data.optionName}
                  optionValues={data.optionValues}
                  formData={propertyDetails}
                  setFormData={setPropertyDetails}
                ></SelectTag>
              ))}
            </div>
          </div>
          <div className=" bg-white px-1 sm:px-2 lg:px-3 xl:px-4  py-2 xl:py-4flex sm:flex-row flex-col sm:gap-4 gap-1 flex-wrap  ">
            <Input
              label={"built_up_area"}
              type="number"
              placeholder={"built up area in sqr feet."}
              id={"built_up_area"}
              formData={propertyDetails}
              setFormData={setPropertyDetails}
            />
            {propertyDetails.apartment_type === "apartment" && (
              <Input
                label={"apartment name"}
                type="text"
                placeholder={"ex- royal apartment.."}
                id={"apartment_name"}
                formData={propertyDetails}
                setFormData={setPropertyDetails}
              />
            )}
          </div>
        </section>
        <section className="rent_section_2 mt-5 ">
          <div className="mb-5">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-raleway  font-extrabold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-600">
              Provide rental details about your property
            </h2>
          </div>
          <div className=" bg-white px-2 md:px-4 lg:px-8 py-3 md:py-5 lg:py-7 flex   flex-wrap lg:flex-row flex-col lg:items-start lg:justify-start lg:gap-16 gap-4 items-start">
            <div className=" flex  flex-col gap-1  items-   lg:w-1/4">
              <p className=" font-roboto md:text-xl text-xl  font-extrabold capitalize text-gray-950">
                property available for
              </p>
              <div className=" flex gap-3">
                <RadioInput
                  name="propertyAvailableFor"
                  id="propertyAvailableFor"
                  lable="rent"
                  value="rent"
                  setFormData={setRentalsDetails}
                  formData={renatlDetails}
                />
                <RadioInput
                  name="propertyAvailableFor"
                  id="propertyAvailableFor"
                  lable="lease"
                  value="lease"
                  setFormData={setRentalsDetails}
                  formData={renatlDetails}
                />
              </div>
            </div>
            <div className=" bg-white flex  flex-col gap-1    prefered_tenats">
              <p className=" font-raleway font-bold text-sm sm:my-0 mt-2 sm:text-xl capitalize text-gray-950">
                prefered tenats
              </p>
              <div className=" flex items-center justify-start gap-3  flex-wrap">
                {preferedTenats?.map((tenetOption, index) => (
                  <div
                    key={index}
                    className=" flex items-center justify-start gap-2 "
                  >
                    <input
                      className=" w-5 h-5 md:h-7 md:w-7 xl:h-8 xl:w-8 focus:border-none focus:outline-none focus:ring-0 checked:text-green-500 "
                      type="checkbox"
                      name={tenetOption.value}
                      id={tenetOption.value}
                      onChange={handleTenetCHeckBox}
                    />
                    <label
                      htmlFor={tenetOption.value}
                      className=" flex items-center gap-1  text-xl md:text-2xl font-raleway font-bold text-gray-500"
                    >
                      {" "}
                      <span>{tenetOption.icon}</span> {tenetOption.label}
                    </label>
                  </div>
                ))}
              </div>

              {/* <CustomCheckbox options={preferedTenats} formData={renatlDetails} setFormData={setRentalsDetails} /> */}
            </div>
          </div>
          <div className="retn_section_2_selct_container flex items-center gap-5 xl:gap-16 flex-wrap bg-white py-8 px-2 md:px-4 lg:px-6 ">
            <SelectTag
              id={"monthlyMaintenance"}
              name={"monthlyMaintenance"}
              optionName={"monthly maintenance"}
              optionValues={monthlyMaintenance}
              formData={renatlDetails}
              setFormData={setRentalsDetails}
            ></SelectTag>
            <SelectTag
              id={"furnishing"}
              name={"furnished"}
              optionName={"furnishing"}
              optionValues={furnishing}
              formData={renatlDetails}
              setFormData={setRentalsDetails}
            ></SelectTag>
            <SelectTag
              id={"parking"}
              name={"parking"}
              optionName={"furnishing"}
              optionValues={parking}
              formData={renatlDetails}
              setFormData={setRentalsDetails}
            ></SelectTag>
            <Input
              label={"expected rent"}
              type="number"
              placeholder={"enter amount"}
              id={"rentAmount"}
              formData={renatlDetails}
              setFormData={setRentalsDetails}
            />
            <Input
              label={"expected deposit"}
              type="number"
              placeholder={"enter amount"}
              id={"depositAmount"}
              formData={renatlDetails}
              setFormData={setRentalsDetails}
            />
            {renatlDetails.monthlyMaintenance?.trim().toLocaleLowerCase() ===
              "extraMaintenance".trim().toLocaleLowerCase() && (
              <Input
                label={"maintenance amount"}
                type="number"
                placeholder={"enter amount"}
                id={"maintenanceAmount"}
                formData={renatlDetails}
                setFormData={setRentalsDetails}
              />
            )}
            <div className="flex w-full flex-col gap-2 md:w-80  md:min-w-72">
              <p className=" text-xl xl:text-2xl  font-raleway font-bold capitalize  inline-block">
                available from
              </p>
              <CalenderInput
                formData={renatlDetails}
                setFormData={setRentalsDetails}
                date="available_from"
              />
            </div>
          </div>
          <p className=" font-raleway text-xl py-3 text-red-500   capitalize font-bold">
            {renatlDetails.depositAmount < renatlDetails.rentAmount &&
              "deosit amount can not be less than rent amount"}
          </p>
         
          <div className=" bg-white px-1 md:px-2 lg:px-4 py-1 md:py-2 xl:py-3">
            
            
            <DescriptionInput
              label={"description"}
              id="description"
              placeholder={"write few lines about your property"}
              formData={renatlDetails}
              setFormData={setRentalsDetails}
            />
          </div>

          
        </section>
        <section className=" my-5">
          <div className="mb-5">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-raleway  font-extrabold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-600">
              locality Details
            </h2>
          </div>

          <div className="flex items-center gap-5 xl:gap-16 flex-wrap bg-white py-8 px-2 md:px-4 lg:px-6">
            
              <SelectTag
                id={"state"}
                name={"state"}
                optionName={"state"}
                optionValues={AllStates}
                formData={localDetails}
                setFormData={setLocalDetails}
               
                setState={setState}
                state={true}
              ></SelectTag>
           
              <SelectTag
                id={"city"}
                name={"city"}
                optionName={"city"}
                optionValues={filteredCities}
                formData={localDetails}
                setFormData={setLocalDetails}
               
              ></SelectTag>
               <Input
              label={"local/street address"}
              type="text"
              placeholder={"ex- hauz rani gao..."}
              id={"localAddress"}
              formData={localDetails}
              setFormData={setLocalDetails}
            />
           
          </div>
         
        </section>
        <section className="rent_section_4">
          <div className="mb-5">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-raleway  font-extrabold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-600">
              provide additional details about your property to get maximum
              visibility
            </h2>
          </div>

          <div className=" flex sm:flex-row gap-3 sm:gap-10 flex-wrap items-center bg-white px-2 md:px-4 lg:px-8 py-3 md:py-5 lg:py-7">
            <div className=" w-2/5 min-w-36 sm:w-56">
              <p className=" text-sm md:text-xl   font-raleway font-bold capitalize  inline-block mb-1">
                bedroom
              </p>
              <div className=" flex border-2 border-gray-400 justify-between py-2 px-3 sm:w-56 rounded-sm items-center ">
                <AiOutlinePlus
                  onClick={() => {
                    if (bedroom < 10) {
                      setBedroom(bedroom + 1);
                    } else {
                      setBedroom(10);
                    }
                  }}
                  className=" p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800 transition-all ease-out duration-75 hover:text-white"
                />
                <p className=" font-raleway capitalize font-semibold text-xl">
                  {bedroom}
                </p>
                <AiOutlineMinus
                  onClick={() => {
                    if (bedroom > 1) {
                      setBedroom(bedroom - 1);
                    } else {
                      setBedroom(1);
                    }
                  }}
                  className=" hover:text-white p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800"
                />
              </div>
            </div>
            <div className="  w-2/5 min-w-36 sm:w-56">
              <p className=" text-sm md:text-xl font-raleway font-bold capitalize  inline-block mb-1">
                bathroom
              </p>
              <div className=" flex border-2 border-gray-400 justify-between py-2 px-3 sm:w-56 rounded-sm items-center ">
                <AiOutlinePlus
                  onClick={() => {
                    if (bathroom < 10) {
                      setBathroom(bathroom + 1);
                    } else {
                      setBathroom(10);
                    }
                  }}
                  className=" p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800 transition-all ease-out duration-75 hover:text-white"
                />
                <p className=" font-raleway capitalize font-semibold text-xl">
                  {bathroom}
                </p>
                <AiOutlineMinus
                  onClick={() => {
                    if (bathroom > 1) {
                      setBathroom(bathroom - 1);
                    } else {
                      setBathroom(1);
                    }
                  }}
                  className=" hover:text-white p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800"
                />
              </div>
            </div>
            <div className="w-2/5 min-w-36   sm:w-56">
              <p className=" text-sm md:text-xl  font-raleway font-bold capitalize  inline-block mb-1">
                balcony
              </p>
              <div className=" flex border-2 border-gray-400 justify-between py-2 px-3 sm:w-56 rounded-sm items-center ">
                <AiOutlinePlus
                  onClick={() => {
                    if (balcony < 10) {
                      setbalcony(balcony + 1);
                    } else {
                      setbalcony(10);
                    }
                  }}
                  className=" p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800 transition-all ease-out duration-75 hover:text-white"
                />
                <p className=" font-raleway capitalize font-semibold text-xl">
                  {balcony}
                </p>
                <AiOutlineMinus
                  onClick={() => {
                    if (balcony > 1) {
                      setbalcony(balcony - 1);
                    } else {
                      setbalcony(1);
                    }
                  }}
                  className=" hover:text-white p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800"
                />
              </div>
            </div>
            <div className="w-2/5  min-w-36 sm:w-56">
              <p className=" text-sm md:text-xl  font-raleway font-bold capitalize  inline-block mb-1">
                guest
              </p>
              <div className=" flex border-2 border-gray-400 justify-between py-2 px-3 sm:w-56 rounded-sm items-center ">
                <AiOutlinePlus
                  onClick={() => {
                    if (guest < 10) {
                      setGuest(guest + 1);
                    } else {
                      setGuest(10);
                    }
                  }}
                  className=" p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800 transition-all ease-out duration-75 hover:text-white"
                />
                <p className=" font-raleway capitalize font-semibold text-xl">
                  {guest}
                </p>
                <AiOutlineMinus
                  onClick={() => {
                    if (guest > 1) {
                      setGuest(guest - 1);
                    } else {
                      setGuest(1);
                    }
                  }}
                  className=" hover:text-white p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800"
                />
              </div>
            </div>
          </div>

          <div className=" flex sm:flex-row flex-col items-start sm:justify-start sm:items-center gap-4 sm:gap-4 md:gap-7 lg:gap-10  bg-white px-2 md:px-4 lg:px-8 py-3 md:py-5 lg:py-7">
            <div className=" sm:w-1/3 w-3/4  ">
              <SelectTag
                id={"waterSupply"}
                name={"water-supply"}
                optionName={"water supply"}
                optionValues={waterSupply}
                formData={additionalDetails}
                setFormData={setAdditionalDetails}
                width={true}
              ></SelectTag>
            </div>
            <div className=" sm:w-1/3 w-3/4 ">
              <SelectTag
                id={"electricity"}
                name={"electricity"}
                optionName={"electricity"}
                optionValues={electricity}
                formData={additionalDetails}
                setFormData={setAdditionalDetails}
                width={true}
              ></SelectTag>
            </div>
          </div>

          <div className=" py-3 bg-white px-2 md:px-4 lg:px-8 py-3 md:py-5 lg:py-7">
            <p className=" py-4 border-t-2 font-roboto capitalize text-xl xl:text-2xl font-bold space-x-0 text-black">
              select the available amenities
            </p>
            <div className=" flex items-center justify-start gap-5  flex-wrap">
              {roomAmenitiesList?.map((tenetOption, index) => (
                <div
                  key={index}
                  className=" flex items-center justify-start gap-2 "
                >
                  <input
                    className=" w-5 h-5 md:h-7 md:w-7 xl:h-9 xl:w-9  focus:border-none focus:outline-none focus:ring-0 checked:text-blue-600 "
                    type="checkbox"
                    name={tenetOption.label}
                    id={tenetOption.label}
                    onChange={handleAmenitiesCheckBox}
                  />
                  <label
                    htmlFor={tenetOption.label}
                    className=" flex items-center gap-1  text-xl lg:text-2xl font-raleway font-bold text-gray-700"
                  >
                    {" "}
                    <span>{tenetOption.icon}</span> {tenetOption.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className=" rent_section_5">
          <div className="mb-5">
            <h2 className="text-sm sm:text-xl font-raleway font-bold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-500">
              upload your porperty photos to get maximum result
            </h2>
          </div>
          <div>
            <UploadPhotos
              photos={photos}
              setPhotos={setPhotos}
              propertyCreated={isPropertyCreated}
            />
          </div>
        </section>
        {error && (
          <div className=" w-full flex justify-center items-center">
            <Alert
              className=" w-full sm:w-1/2 md:w-1/3 text-xl"
              color="failure"
              onDismiss={() => setError(null)}
            >
              {error}
            </Alert>
          </div>
        )}

        <div className=" flex justify-end items-center my-10 ">
          <button
            type="submit"
            className=" capitalize  px-10 py-3  font-roboto font-semibold sm:text-xl text-sm border-none outline-none focus:border-none focus:outline-none focus:ring-0 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all duration-1000 ease-in-out"
          >
            {loading ? (
              <>
                <Spinner color="failure" aria-label="Failure spinner example" />{" "}
                creating property..
              </>
            ) : (
              "create property"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RentPage;
{
  /* <div className="  ">
                
              </div> */
}
// <div className="  mt-3 flex flex-col gap-2 items-start sm:flex-row sm:gap-4 md:gap-7 sm:items-center sm:my-4 ">

// </div>
