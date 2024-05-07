import React, { useState } from "react";
import "../styles/Rent.css";
import SelectINput from "../components/SelectINput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AttachMoney } from "@mui/icons-material";
import LocalityDetails from "../components/LocalityDetails";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import AmenitiesFeatures from "../components/AmenitiesFeatures";
import UploadPhotos from "../components/UploadPhotos";
import SelectTag from "../components/SelectTag";
import Input from "../components/Input";
import { roomAmenitiesList } from "../rentUtils";

import {
  propertyAvailableFor,
  preferedTenats,
  monthlyMaintenance,
  furnishing,
  parking,
  waterSupply,
  electricity,
  roomDetailsOptions,
} from "../rentUtils";
import TextInput from "../components/TextInput";
import CustomRadio from "../components/CustomRadio";
import RadioInput from "../components/RadioInput";
import CustomCheckbox from "../components/CustomCheckbox";
import NumberInput from "../components/NumberInput";
import CalenderInput from "../components/CalenderInput";
import CustomTextArea from "../components/CustomTextArea";
import { Textarea } from "flowbite-react";
// import { IndianRupeeIcon } from "@mui/icons-material";
import DescriptionInput from "../components/DescriptionInput";
import { AllStates, cities } from "../utils";

function RentPage() {
  const [state, setState] = useState("");
  const [photos, setPhotos] = useState([]);
  // console.log(photos)
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
  // console.log(propertyDetails);
  const [renatlDetails, setRentalsDetails] = useState({
    tenats: [],
  });
  // console.log(renatlDetails);
  const [localDetails, setLocalDetails] = useState({});
  // console.log(localDetails)
  const [additionalDetails, setAdditionalDetails] = useState({
    availableAmenities:[]
  });
  let [bedroom, setBedroom] = useState(1);
  let [balcony, setbalcony] = useState(1);
  let [guest, setGuest] = useState(1);

  const handleCheckbox = (e) => {
    const { checked, id, value } = e.target;
    if (checked) {
      // Add the checked amenity to the roomAmenities array
      setRentalsDetails({
        ...renatlDetails,
        tenats: [...renatlDetails.tenats, id],
      });

      setAdditionalDetails({
        ...additionalDetails,
        availableAmenities:[...additionalDetails.availableAmenities,id]
      })
    } else {
      // Remove the unchecked amenity from the roomAmenities array
      setRentalsDetails((prevData) => ({
        ...prevData,
        tenats: prevData.tenats.filter((amenityId) => amenityId !== id),
      }));

      setAdditionalDetails((prevData)=>({
        ...prevData,
        availableAmenities:prevData.availableAmenities.filter((oldAmenity)=> oldAmenity !== id)
      }))
    }
  };

  // console.log(additionalDetails)

  return (
    <div className=" rent_container lg:px-28">
      <section className="rent_section_1">
        <div className="mb-5">
          <h2 className="text-xs md:text-xl font-raleway font-bold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-500">
            Property Details
          </h2>
        </div>
        <div className=" ">
          <div className=" flex flex-col md:flex-wrap md:gap-6 gap-2 md:flex-row  items-center  ">
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
        <div className=" flex sm:flex-row flex-col sm:gap-4 gap-1 flex-wrap  mt-4">
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
          <h2 className="text-xs md:text-xl font-raleway font-bold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-500">
            Provide rental details about your property
          </h2>
        </div>

        <div className=" flex  flex-wrap lg:flex-row flex-col lg:items-start lg:justify-start lg:gap-16 gap-4 items-start">
          <div className=" flex  flex-col gap-1  items-   lg:w-1/4">
            <p className=" font-raleway font-bold text-xs capitalize text-gray-950">
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
          <div className=" flex  flex-col gap-1    prefered_tenats">
            <p className=" font-raleway font-bold text-xs capitalize text-gray-950">
              prefered tenats
            </p>
            <div className=" flex items-center justify-start gap-3  flex-wrap">
              {preferedTenats?.map((tenetOption, index) => (
                <div
                  key={index}
                  className=" flex items-center justify-start gap-2 "
                >
                  <input
                    className=" focus:border-none focus:outline-none focus:ring-0 checked:text-green-500 "
                    type="checkbox"
                    name={tenetOption.value}
                    id={tenetOption.value}
                    onChange={handleCheckbox}
                  />
                  <label
                    htmlFor={tenetOption.value}
                    className=" flex items-center gap-1  text-xs md:text-sm font-raleway font-bold text-gray-500"
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
        <div>
          <div className=" flex flex-col gap-4 items-start sm:flex-row sm:gap-4 md:gap-7 sm:items-center sm:my-4 ">
            <Input
              label={"expected rent"}
              type="number"
              placeholder={"enter amount"}
              id={"rentAmount"}
              formData={renatlDetails}
              setFormData={setRentalsDetails}
            />{" "}
            <Input
              label={"expected deposit"}
              type="number"
              placeholder={"enter amount"}
              id={"depositAmount"}
              formData={renatlDetails}
              setFormData={setRentalsDetails}
            />
          </div>
          <p className=" font-raleway text-xs text-red-500   capitalize font-bold">
            {renatlDetails.depositAmount < renatlDetails.rentAmount &&
              "deosit amount can not be less than rent amount"}
          </p>
          <div className=" flex sm:flex-row flex-col justify-start  sm:items-center flex-wrap sm:justify-start sm:gap-3 md:gap-5 lg:gap-10   my-4 py-2">
            <div className=" w-full sm:w-1/2 md:w-1/3 pl-0  ">
              <SelectTag
                id={"monthlyMaintenance"}
                name={"monthlyMaintenance"}
                optionName={"monthly maintenance"}
                optionValues={monthlyMaintenance}
                formData={renatlDetails}
                setFormData={setRentalsDetails}
                width={true}
              ></SelectTag>
            </div>

            {/* <SelectINput optionItems={monthlyMaintenance} /> */}

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
          </div>
        </div>

        <div className=" flex flex-wrap calender_div lg:gap-5 sm:gap-3 md:gap-4 sm:items-center  ">
          <div className="flex w-full flex-col gap-2 md:w-80  md:min-w-72">
            <p className=" text-xs  font-raleway font-bold capitalize  inline-block">
              available from
            </p>
            <CalenderInput
              formData={renatlDetails}
              setFormData={setRentalsDetails}
              date="available from"
            />
          </div>

          {/* <p className=" text-xs  font-raleway font-bold capitalize  inline-block">
              furnishing
            </p>
            <SelectINput optionItems={furnishing} /> */}
          <div className=" w-full sm:w-1/2 md:w-1/3 pl-0  ">
            <SelectTag
              id={"furnishing"}
              name={"furnished"}
              optionName={"furnishing"}
              optionValues={furnishing}
              formData={renatlDetails}
              setFormData={setRentalsDetails}
              width={true}
            ></SelectTag>
          </div>

          <div className=" w-full sm:w-1/2 md:w-1/3 pl-0  ">
            <SelectTag
              id={"parking"}
              name={"parking"}
              optionName={"furnishing"}
              optionValues={parking}
              formData={renatlDetails}
              setFormData={setRentalsDetails}
              width={true}
            ></SelectTag>
          </div>
        </div>

        <div>
          <DescriptionInput
            label={"description"}
            id="description"
            placeholder={"write few lines about your property"}
            formData={renatlDetails}
            setFormData={setRentalsDetails}
          />
        </div>
      </section>
      <section className="rent_section_3 my-5">
        <div className="mb-5">
          <h2 className="text-xs md:text-xl font-raleway font-bold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-500">
            locality Details
          </h2>
        </div>

        <div className=" flex justify-start gap-7 items-center flex-wrap">
          <div className=" flex flex-col md:flex-wrap md:gap-6 gap-2 md:flex-row  items-center w-1/3 ">
            <SelectTag
              id={"state"}
              name={"state"}
              optionName={"state"}
              optionValues={AllStates}
              formData={localDetails}
              setFormData={setLocalDetails}
              width={true}
              setState={setState}
              state={true}
            ></SelectTag>
          </div>
          <div className=" flex flex-col md:flex-wrap md:gap-6 gap-2 md:flex-row  items-center w-1/3 ">
            <SelectTag
              id={"city"}
              name={"city"}
              optionName={"city"}
              optionValues={filteredCities}
              formData={localDetails}
              setFormData={setLocalDetails}
              width={true}
            ></SelectTag>
          </div>
        </div>
        <div className=" flex sm:flex-row flex-col sm:gap-4 gap-1 flex-wrap  mt-4">
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
          <h2 className="text-xs md:text-xl font-raleway font-bold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-500">
            provide additional details about your property to get maximum
            visibility
          </h2>
        </div>

        <div className=" flex sm:flex-row gap-3 sm:gap-10 flex-wrap items-center">
          <div className=" w-2/5 min-w-36 sm:w-56">
            <p className=" text-xs  font-raleway font-bold capitalize  inline-block mb-1">
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
          <div className="w-2/5 min-w-36   sm:w-56">
            <p className=" text-xs  font-raleway font-bold capitalize  inline-block mb-1">
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
            <p className=" text-xs  font-raleway font-bold capitalize  inline-block mb-1">
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

        <div className=" flex sm:flex-row flex-col items-start sm:justify-start sm:items-center gap-4 sm:gap-4 md:gap-7 lg:gap-10 mt-7">
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

        <div className=" mt-4 py-3">
          <p className=" py-4 border-t-2 font-roboto capitalize text-xs font-bold space-x-0 text-gray-700">
            select the available amenities
          </p>
          <div className=" flex items-center justify-start gap-3  flex-wrap">
              {roomAmenitiesList?.map((tenetOption, index) => (
                <div
                  key={index}
                  className=" flex items-center justify-start gap-2 "
                >
                  <input
                    className=" focus:border-none focus:outline-none focus:ring-0 checked:text-green-500 "
                    type="checkbox"
                    name={tenetOption.label}
                    id={tenetOption.label}
                    onChange={handleCheckbox}
                  />
                  <label
                    htmlFor={tenetOption.label}
                    className=" flex items-center gap-1  text-xs md:text-sm font-raleway font-bold text-gray-500"
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
          <h2 className="text-xs md:text-xl font-raleway font-bold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-500">
            upload your porperty photos to get maximum result
          </h2>
        </div>
        <div>
          <UploadPhotos photos={photos} setPhotos={setPhotos} />
        </div>
      </section>
    </div>
  );
}

export default RentPage;
