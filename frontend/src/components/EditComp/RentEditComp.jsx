// import React from 'react'
// alll import copy from rent page----
import React, { useState, useRef, useEffect } from "react";

// import "../styles/Rent.css";
import "../../styles/Rent.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import UploadPhotos from "../UploadPhotos";
import SelectTag from "../SelectTag";
import Input from "../Input";
import {
  roomAmenitiesList,
  preferedTenats,
  monthlyMaintenance,
  furnishing,
  parking,
  waterSupply,
  electricity,
  roomDetailsOptionsEdit,
  addDefaultValues,
  extractDefaults,
  toCamelCase,
} from "../../rentUtils";
import { getTokenFromLocalStorage } from "../../token";
import { API_URL } from "../../configue";
import RadioInput from "../RadioInput";
import CalenderInput from "../CalenderInput";
import { Alert, Spinner } from "flowbite-react";
// import { IndianRupeeIcon } from "@mui/icons-material";
import DescriptionInput from "../DescriptionInput";
import { AllStates, cities } from "../../utils";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

// edit coponent-------------------
import EditSelectComp from "./EditSelectComp/EditSelectComp";
import EditInputComp from "./EditInputComp";
import EditRadioInput from "./EditRadioInput";
import EditUploadPhotos from "./EditUploadPhotos";

// edit code utilyty function---

function RentEditComp({ editData }) {
  
  const token = getTokenFromLocalStorage();
  const [state, setState] = useState("");


  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formRef = useRef(null);
  const [newPhotos,setNewPhotos]=useState([])


  const inputRef = useRef(null);

  // set initial state for edit form data-------------------------
  const [editFormData, setEditFormData] = useState({}); 
  useEffect(()=>{
    setEditFormData(editData)
  },[editData])

  // console.log("edit form data", editFormData);
  

  // set initial default value of section 1 ----------------------------------------------------------
  const defaultValues = extractDefaults(editData);

  // console.log('default values',defaultValues)
  const updatedRoomDetailsOptions = addDefaultValues(
    roomDetailsOptionsEdit,
    defaultValues
  );

  // console.log('update room options',updatedRoomDetailsOptions)


  

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const filesArray = Array.from(event.target.files);
    const newPhotos = filesArray.map((file) => URL.createObjectURL(file));
    setNewPhotos(newPhotos);
  };

  const handleDeletePhoto = (index) => {
    setEditFormData(
      {
        ...editFormData,
        images : editFormData.images?.filter((_, i) => i !== index)
      }
      );
  };
  const handleDeleteNewPhotos=(index)=>{
    setNewPhotos((prevPhotos)=>prevPhotos.filter((_,i)=>index!==i))
  }

  // console.log('new photos',newPhotos)
  // Handle change for room amenities checkboxes
  const handleAmenitiesCheckBox = (event) => {
    // const { name, checked } = event.target;
    const { id, checked, name } = event.target;
    setSelectedAmenities((prev) =>
      checked ? [...prev, id] : prev.filter((amenity) => amenity !== id)
    );
    let updatedAmenities;

    if (checked) {
      updatedAmenities = [...editFormData.availableAmenities, name];
    } else {
      updatedAmenities = editFormData.availableAmenities.filter(
        (amenity) => amenity !== name
      );
    }

    setEditFormData((prevState) => ({
      ...prevState,
      availableAmenities: updatedAmenities,
    }));
  };

  // edit available amenity code-----------------------------------------------------------------------------------
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  
 

 




  const handleTenetCHeckBox = (event) => {
    const { name, checked } = event.target;
    let updatedTenants;

    if (checked) {
     
      updatedTenants = [...editFormData.preferedTenats, name];
    } else {
      
      updatedTenants = editFormData.preferedTenats.filter(
        (tenant) => tenant !== name
      );
    }

    // Update the edit form data state
    setEditFormData((prevState) => ({
      ...prevState,
      preferedTenats: updatedTenants,
    }));
  };



  function filterCitiesByCurrentState(currentState) {
    // console.log('current state',currentState)
    // Find the city object corresponding to the current city
    const cityObject = cities.find(
      (city) => Object.keys(city.cityName)[0] === currentState?.toLowerCase()
    );

    // If city object is found, return its cities array, otherwise return an empty array
    // console.log('city object',cityObject)
    return cityObject ? Object.values(cityObject.cityName)[0] : [];
  }
  const filteredCities= filterCitiesByCurrentState(editFormData?.location?.state);






 
  return (
    <div className=" rent_container lg:px-28  border-none">
      {editData && (
        <form ref={formRef} className=" w-full">
          <section className="rent_section_1">
            <div className="mb-5">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-raleway font-bold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-500">
                edit: Property Details
              </h2>
            </div>
            <div className=" bg-white px-2 py-4 lg:py-8 lg:px-6  rounded-t-md  ">
              <div className=" flex flex-wrap gap-4    ">
                {updatedRoomDetailsOptions?.map((data, index) => (
                  <EditSelectComp
                    key={index}
                    id={data.id}
                    name={data.id}
                    optionName={data.optionName}
                    optionValues={data.optionValues}
                    formData={editFormData}
                    setFormData={setEditFormData}
                    defaultValue= {editFormData[data.id] || data.defaultValue }
                  ></EditSelectComp>
                ))}
              </div>
            </div>
            <div className="px-2  lg:px-5 rounded-b-md bg-white  flex flex-wrap items-center gap-7 py-7  ">
              <EditInputComp
                label={"built_up_area"}
                type="number"
                placeholder={" In sqr feet."}
                id={"builtUpArea"}
                formData={editFormData}
                setFormData={setEditFormData}
                defaultValue={editData?.builtUpArea}
              />
              
              {editFormData.apartmentType === "apartment" && (
                <EditInputComp
                  label={"apartment name"}
                  type="text"
                  placeholder={"ex- royal apartment.."}
                  id={"apartmentName"}
                  formData={editFormData}
                  setFormData={setEditFormData}
                  defaultValue={editData?.apartmentName}
                />
              )}
            </div>
          </section>
          <section className="rent_section_2  mt-5">
            <div className="mb-5">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-raleway font-bold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-500">
                edit: rental details about your property
              </h2>
            </div>

            <div className="py-2  lg:py-5 xl:py-7 px-3  lg:px-7 xl:px-10 rounded-md bg-white flex  flex-wrap lg:flex-row flex-col lg:items-start lg:justify-start lg:gap-16 gap-4 items-start">
              <div className=" flex  flex-col gap-1  items-   lg:w-1/4">
                <p className=" font-roboto md:text-xl xl:text-2xl text-xl font-bold f capitalize text-gray-950">
                  property available for
                </p>
                <div className=" flex gap-4 items-center mt-3 ">
                  <EditRadioInput
                    name="propertyAvailableFor"
                    id="propertyAvailableForRent"
                    label="Rent"
                    value="rent"
                    isChecked={editFormData.propertyAvailableFor === "rent"}
                    formData={editFormData}
                    setFormData={setEditFormData}
                  />
                  <EditRadioInput
                    name="propertyAvailableForrr"
                    id="propertyAvailableForLease"
                    label="Lease"
                    value="lease"
                    isChecked={editFormData.propertyAvailableFor === "lease"}
                    formData={editFormData}
                    setFormData={setEditFormData}
                  />
                </div>
              </div>
              <div className=" flex  flex-col gap-2    prefered_tenats">
                <p className=" font-raleway font-bold text-xl  md:text-2xl  sm:my-0 pb-3  sm:text-xl capitalize text-gray-950">
                  prefered tenats
                </p>
                <div className="flex items-center justify-start gap-4 md:gap-7 xl:gap-12 flex-wrap ">
                  {preferedTenats.map((tenetOption, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-start gap-1 "
                    >
                      <input
                        className=" w-5 h-5 focus:border-none focus:outline-none focus:ring-0 checked:text-green-500"
                        type="checkbox"
                        name={tenetOption.value}
                        id={tenetOption.value}
                        onChange={handleTenetCHeckBox}
                        checked={editFormData.preferedTenats?.includes(tenetOption.value)}
                      />
                      <label
                        htmlFor={tenetOption.value}
                        className="flex items-center gap-1 text-xl md:text-2xl  font-raleway font-bold text-gray-500"
                      >
                        <span>{tenetOption.icon}</span> {tenetOption.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="py-2  lg:py-5 xl:py-7 px-3 lg:px-7 xl:px-10 bg-white  parking-furnishing-wrapper flex items-center flex-wrap gap-4 md:gap-7 xl:gap-12">
              <EditSelectComp
                id={"furnishing"}
                name={"furnished"}
                optionName={"furnishing"}
                optionValues={furnishing}
                formData={editFormData}
                setFormData={setEditFormData}
                defaultValue={editFormData.furnishing || editData.furnishing}
              ></EditSelectComp>
              <EditSelectComp
                id={"parking"}
                name={"parking"}
                optionName={"prking"}
                optionValues={parking}
                formData={editFormData}
                setFormData={setEditFormData}
                defaultValue={ editFormData.parking || editData.parking}
              ></EditSelectComp>
              <EditSelectComp
                id={"monthlyMaintenance"}
                name={"monthlyMaintenance"}
                optionName={"monthly maintenance"}
                optionValues={monthlyMaintenance}
                formData={editFormData}
                setFormData={setEditFormData}
                defaultValue={editFormData.monthlyMaintenance || editData.monthlyMaintenance}
              ></EditSelectComp>
            </div>

            <div className="py-2  lg:py-5 xl:py-7 px-3 lg:px-7 xl:px-10 bg-white   rounded-md flex-wrap flex items-center gap-4 md:gap-7 xl:gap-12">
              <EditInputComp
                label={"expected rent"}
                type="number"
                placeholder={" rent amount"}
                id={"rentAmount"}
                formData={editFormData}
                setFormData={setEditFormData}
                defaultValue={editFormData?.rentAmount}
              />{" "}
              <EditInputComp
                label={"expected deposit"}
                type="number"
                placeholder={"deposit amount"}
                id={"depositAmount"}
                formData={editFormData}
                setFormData={setEditFormData}
                defaultValue={editFormData?.depositAmount}
              />
              {editFormData.monthlyMaintenance ===
                "extraMaintenance" && (
                <EditInputComp
                  label={"maintenance amount"}
                  type="number"
                  placeholder={"maintenance amount"}
                  id={"maintenanceAmount"}
                  formData={editFormData}
                  setFormData={setEditFormData}
                  defaultValue={editFormData?.maintenanceAmount}
                />
              )}
              <p className=" font-raleway text-xl text-red-500   capitalize font-bold">
                {editFormData.depositAmount < editFormData.rentAmount &&
                  "deosit amount can not be less than rent amount"}
              </p>
            </div>

            <div className="py-2  lg:py-5 xl:py-7 px-3 lg:px-7 xl:px-10  flex flex-wrap items-start gap-4 md:gap-7 xl:gap-12 bg-white   ">
              <div className="calender-div-wrapper ">
                <p className=" text-xl md:text-2xl   font-raleway font-bold capitalize  inline-block">
                  available from
                </p>
                <CalenderInput
                  formData={editFormData}
                  setFormData={setEditFormData}
                  date="available_from"
                  defaultDate={editFormData?.availableFrom}
                />
              </div>
              <DescriptionInput
                label={"description"}
                id="description"
                placeholder={"write few lines about your property"}
                formData={editFormData}
                setFormData={setEditFormData}
                defaultValue={editFormData?.description}
              />
            </div>
          </section>
          <section className="rent_section_3 my-5">
            <div className="mb-5">
              <h2 className="text-xl md:text-2xl font-roboto xl:text-3xl font-bold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-500">
                locality Details
              </h2>
            </div>

            <div className=" bg-white  flex justify-start gap-7 items-center flex-wrap py-2  lg:py-5 xl:py-7 px-3  lg:px-7 xl:px-10">
              <EditSelectComp
                id={"state"}
                name={"state"}
                optionName={"state"}
                optionValues={AllStates}
                formData={editFormData}
                setFormData={setEditFormData}
                defaultValue={editFormData?.location?.state}
                locationField={true}
               
              ></EditSelectComp>

              <EditSelectComp
                id={"city"}
                name={"city"}
                optionName={"city"}
                optionValues={filteredCities}
                formData={editFormData}
                setFormData={setEditFormData}
                defaultValue={editFormData?.location?.city}
                locationField={true}
                
              ></EditSelectComp>

              <EditInputComp
                label={"local/street address"}
                type="text"
                placeholder={"ex- hauz rani gao..."}
                id={"localAddress"}
                formData={editFormData}
                setFormData={setEditFormData}
                defaultValue={editFormData?.location?.localAddress}
                locationField={true}
                
              />
            </div>
          </section>
          <section className="rent_section_4">
            <div className="mb-5">
              <h2 className="text-xl  md:text-2xl xl:text-3xl  font-roboto font-bold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-500">
                provide additional details about your property to get maximum
                visibility
              </h2>
            </div>

            <div className=" flex sm:flex-row gap-3 sm:gap-10 flex-wrap items-center py-2  lg:py-5 xl:py-7 px-3  lg:px-7 xl:px-10 bg-white">
              <div className=" w-2/5 min-w-36 sm:w-56">
                <p className=" text-xl  font-roboto  font-bold capitalize  inline-block mb-1">
                  bedroom
                </p>
                <div className=" flex border-2 border-gray-400 justify-between py-2 px-3 sm:w-56 rounded-sm items-center ">
                  <AiOutlinePlus
                    onClick={() => {
                      if (editFormData.bedroom < 10) {
                        setEditFormData({
                          ...editFormData,
                          bedroom: editFormData.bedroom + 1
                        });
                      } else {
                        setEditFormData({
                          ...editFormData,
                          bedroom: 10
                        });
                      }
                    }}
                    className=" p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800 transition-all ease-out duration-75 hover:text-white"
                  />
                  <p className=" font-raleway capitalize font-semibold text-xl">
                    { editFormData.bedroom}
                  </p>
                  <AiOutlineMinus
                    onClick={() => {
                      if (editFormData.bedroom > 1) {
                        setEditFormData({
                          ...editFormData,
                          bedroom:editFormData.bedroom - 1
                        });
                      } else {
                        setEditFormData({
                          ...editFormData,
                          bedroom:0
                        });
                      }
                    }}
                    className=" hover:text-white p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800"
                  />
                </div>
              </div>
              <div className="  w-2/5 min-w-36 sm:w-56">
                <p className="text-xl  font-roboto font-bold capitalize  inline-block mb-1">
                  bathroom
                </p>
                <div className=" flex border-2 border-gray-400 justify-between py-2 px-3 sm:w-56 rounded-sm items-center ">
                  <AiOutlinePlus
                    onClick={() => {
                      if (editFormData.bathroom < 10) {
                        setEditFormData({
                          ...editFormData,
                          bathroom: editFormData.bathroom + 1
                        });
                      } else {
                        setEditFormData({
                          ...editFormData,
                          bathroom:10
                        });
                      }
                    }}
                    className=" p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800 transition-all ease-out duration-75 hover:text-white"
                  />
                  <p className=" font-raleway capitalize font-semibold text-xl">
                    {editFormData.bathroom}
                  </p>
                  <AiOutlineMinus
                    onClick={() => {
                      if (editFormData.bathroom > 1) {
                        setEditFormData({
                          ...editFormData,
                          bathroom: editFormData.bathroom + 1
                        });
                      } else {
                        setEditFormData({
                          ...editFormData,
                          bathroom:0
                        });
                      }
                    }}
                    className=" hover:text-white p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800"
                  />
                </div>
              </div>
              <div className="w-2/5 min-w-36   sm:w-56">
                <p className="text-xl  font-roboto font-bold capitalize  inline-block mb-1">
                  balcony
                </p>
                <div className=" flex border-2 border-gray-400 justify-between py-2 px-3 sm:w-56 rounded-sm items-center ">
                  <AiOutlinePlus
                    onClick={() => {
                      if (editFormData.balcony < 10) {
                        setEditFormData({
                          ...editFormData,
                          balcony:editFormData.balcony + 1
                        });
                      } else {
                        setEditFormData({
                          ...editFormData,
                          balcony:10
                        });
                      }
                    }}
                    className=" p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800 transition-all ease-out duration-75 hover:text-white"
                  />
                  <p className=" font-raleway capitalize font-semibold text-xl">
                    {editFormData.balcony}
                  </p>
                  <AiOutlineMinus
                    onClick={() => {
                      if (editFormData.balcony > 1) {
                        setEditFormData({
                          ...editFormData,
                          balcony:editFormData.balcony-1
                        });
                      } else {
                        setEditFormData({
                          ...editFormData,
                          balcony:0
                        });
                      }
                    }}
                    className=" hover:text-white p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800"
                  />
                </div>
              </div>
              <div className="w-2/5  min-w-36 sm:w-56">
                <p className=" text-xl  font-roboto font-bold capitalize  inline-block mb-1">
                  guest
                </p>
                <div className=" flex border-2 border-gray-400 justify-between py-2 px-3 sm:w-56 rounded-sm items-center ">
                  <AiOutlinePlus
                    onClick={() => {
                      if (editFormData.guest < 10) {
                        setEditFormData({
                          ...editFormData,
                          guest:editFormData.guest+1
                        });
                      } else {
                        setEditFormData({
                          ...editFormData,
                          guest:10
                        });
                      }
                    }}
                    className=" p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800 transition-all ease-out duration-75 hover:text-white"
                  />
                  <p className=" font-raleway capitalize font-semibold text-xl">
                    {editFormData.guest}
                  </p>
                  <AiOutlineMinus
                    onClick={() => {
                      if (editFormData.guest > 1) {
                        setEditFormData({
                          ...editFormData,
                          guest:editFormData.guest-1
                        });
                      } else {
                        setEditFormData({
                          ...editFormData,
                          guest:0
                        });
                      }
                    }}
                    className=" hover:text-white p-2 bg-slate-300 font-raleway text-3xl text-black font-bold rounded-sm cursor-pointer hover:bg-gray-800"
                  />
                </div>
              </div>
            </div>

            <div className="py-2  lg:py-5 xl:py-7 px-3  lg:px-7 xl:px-10 bg-white flex sm:flex-row flex-col items-start sm:justify-start sm:items-center gap-4 sm:gap-4 md:gap-7 lg:gap-10 ">
              <EditSelectComp
                id={"waterSupply"}
                name={"water-supply"}
                optionName={"water supply"}
                optionValues={waterSupply}
                formData={editFormData}
                setFormData={setEditFormData}
                defaultValue={editFormData?.waterSupply}
              ></EditSelectComp>

              <EditSelectComp
                id={"electricity"}
                name={"electricity"}
                optionName={"electricity"}
                optionValues={electricity}
                formData={editFormData}
                setFormData={setEditFormData}
                defaultValue={editFormData?.electricity}
              ></EditSelectComp>
            </div>

            <div className="py-4  lg:py-5 xl:py-7 px-3  lg:px-7 xl:px-10 bg-white ">
              <p className=" py-8 border-t-2 font-roboto font-bold capitalize text-xl md:text-2xl  ">
                select the available amenities
              </p>
              <div className=" flex items-center justify-start gap-7 md:gap-7 xl:gap-12  flex-wrap text-xl ">
                {roomAmenitiesList?.map((tenetOption, index) => (
                  <div
                    key={index}
                    className=" flex items-center justify-start gap-1 "
                  >
                    <input
                      className=" focus:border-none w-5 h-5   focus:outline-none focus:ring-0 checked:text-green-500 "
                      type="checkbox"
                      name={tenetOption.label}
                      id={tenetOption.label}
                      onChange={handleAmenitiesCheckBox}
                      checked={editFormData.availableAmenities?.includes(tenetOption.label)}
                    />
                    <label
                      htmlFor={tenetOption.label}
                      className=" flex items-center gap-1  text-xl md:text-2xl  font-bold text-gray-500"
                    >
                      {" "}
                      <span>{tenetOption.icon}</span> {tenetOption.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className=" rent_section_5 mt-4 md:mt-8 lg:mt-14">
            <div className="mb-5">
              <h2 className="text-xl md:text-2xl xl:text-3xl  font-roboto font-bold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-500">
                edit or upload new photos your property
              </h2>
            </div>
            <div className=" bg-white py-7 rounded-md">
              {editFormData.images?.length > 0 && (
                <div className="existing-photos-wrapper mt-4 md:mt-8 lg:mt-14">
                  {editFormData.images.map((url, index) => (
                    <div
                      className="w-full sm:w-1/3 min-h-64 rounded-sm relative"
                      key={index}
                    >
                      <img
                        src={url}
                        alt={`photo-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <MdDelete
                        className="cursor-pointer p-1 w-12 h-12 top-2 right-3 text-red-500 text-xl sm:text-2xl font-bold border-2 absolute bg-white shadow-2xl rounded-full flex justify-center items-center"
                        onClick={() => handleDeletePhoto(index)}
                      />
                    </div>
                  ))}
                </div>
              )}
              {newPhotos?.length > 0 && (
                <div className="existing-photos-wrapper mt-4 md:mt-8 lg:mt-14">
                  {newPhotos.map((url, index) => (
                    <div
                      className="w-full sm:w-1/3 min-h-64 rounded-sm relative"
                      key={index}
                    >
                      <img
                        src={url}
                        alt={`photo-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <MdDelete
                        className="cursor-pointer p-1 w-12 h-12 top-2 right-3 text-red-500 text-xl sm:text-2xl font-bold border-2 absolute bg-white shadow-2xl rounded-full flex justify-center items-center"
                        onClick={() => handleDeleteNewPhotos(index)}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="  w-full mt-10 xl:mt-14 flex items-center justify-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  ref={inputRef}
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  className="px-6 py-3 text-xl lg:px-8 lg:py-5 lg:text-2xl  cursor-pointer hover:bg-teal-900 transition-all ease-in-out duration-100 bg-teal-800 capitalize font-raleway outline-none border-none text-white font-semibold"
                  onClick={handleButtonClick}
                >
                  add new photos
                </button>
              </div>
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

          <div className=" flex  justify-center items-center  bg-white py-5 mt-10 rounded-md w-full ">
            <button
              type="submit"
              className=" py-4 capitalize text-xl lg:text-2xl font-raleway font-semibold min-w-52 w-full  max-w-96 border-none outline-none focus:border-none focus:outline-none focus:ring-0 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all duration-1000 ease-in-out"
            >
              {loading ? (
                <>
                  <Spinner
                    color="failure"
                    aria-label="Failure spinner example"
                  />{" "}
                  saving..
                </>
              ) : (
                "save changes"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default RentEditComp;
