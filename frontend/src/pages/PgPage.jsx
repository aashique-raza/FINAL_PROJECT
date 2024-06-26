import React, { useState,useEffect } from "react";
import "../styles/Pg.css";
import {
 
  rentAmountOptions,
  roomAmenities,
  pgSelectOptions,
  roomDetailsOptions,
  pgRules,
} from "../utils";
import Input from "../components/Input";
import { API_URL } from "../configue";
import CheckBoxInput from "../components/CheckBoxInput";
import SelectTag from "../components/SelectTag";
import TextArea from "../components/TextArea";
import LocalityDetails from "../components/LocalityDetails";
import PgAmenities from "../components/PgAmenities";
import UploadPhotos from "../components/UploadPhotos";
import { pgListingClearError,pgListingFailed,pgListingStart,pgListingSuccess } from "../features/pg.slice";
import { useDispatch,useSelector } from "react-redux";

import { Alert,Spinner } from "flowbite-react";
import { formErrorHandler } from "../formError";
import { getTokenFromLocalStorage } from "../token";
import { useNavigate } from "react-router-dom";

function PgPage({showSuccessMessage}) {

  const navigate=useNavigate()
  const [isPgCreated,setIsPgCreated]=useState(false)
  const [formData, setFormData] = useState({
    roomFacilities: [],
    rentAmount: 0,
    depositAmount: 0,

    roomSharing: "",
    kitchen: "",
    balcony: "",
    availableFor: "",
    placeAvaibility: "",
    foodAvaibility: "",
    doorClosingTime: "",
    foodType: "",
    pgRules: [],
    pgOrHostelName: "",
    description: "",
    state: "",
    city: "",
    localAddress: "",
    laundary: "",
    roomCleaning: "",
    warden: "",
    ameinites: [],
   
  });
  const token=getTokenFromLocalStorage()

  const {loading,error}=useSelector((state)=>state.pgLIsting)
  const dispatch=useDispatch()

  const[photos,setPhotos]=useState([])
  // console.log(photos)

  useEffect(()=>{
    dispatch(pgListingClearError())
    
  },[])

 



  const handleCheckboxChange = (event, id) => {
    const { checked } = event.target;

    if (checked) {
      // Add the checked amenity to the roomAmenities array
      setFormData((prevData) => ({
        ...prevData,
        roomFacilities: [...prevData.roomFacilities, id],
      }));
    } else {
      // Remove the unchecked amenity from the roomAmenities array
      setFormData((prevData) => ({
        ...prevData,
        roomFacilities: prevData.roomFacilities.filter(
          (amenityId) => amenityId !== id
        ),
      }));
    }
  };
  // console.log(formData);
  // console.log(amenities)
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(pgListingClearError())
    if(formData.foodAvaibility?.trim().toLocaleLowerCase()==='veg-food'.trim().toLocaleLowerCase() && !formData.foodType){
      return dispatch(pgListingFailed('food type is required field'))
    }
    
    
    const pgFormData= new FormData();
   
    pgFormData.append("availableFor", formData.availableFor);
    pgFormData.append("balcony", formData.balcony);
    pgFormData.append("city", formData.city);
    pgFormData.append("depositAmount", formData.depositAmount);
    pgFormData.append("description", formData.description);
    pgFormData.append("doorClosingTime", formData.doorClosingTime);
    pgFormData.append("foodAvaibility", formData.foodAvaibility);
    pgFormData.append("foodType", formData.foodType);
    pgFormData.append("kitchen", formData.kitchen);
    pgFormData.append("laundary", formData.laundary);
    pgFormData.append("localAddress", formData.localAddress);
    pgFormData.append("pgOrHostelName", formData.pgOrHostelName);
 
    pgFormData.append("placeAvaibility", formData.placeAvaibility);
    pgFormData.append("rentAmount", formData.rentAmount);
    pgFormData.append("roomCleaning", formData.roomCleaning);
   
    pgFormData.append("roomSharing", formData.roomSharing);
    pgFormData.append("state", formData.state);
    pgFormData.append("warden", formData.warden);
   
    formData.ameinites?.forEach((amenity) => {
      pgFormData.append("ameinites", amenity);
    });
    formData.roomFacilities?.forEach((facility)=>{
      pgFormData.append('roomFacilities',facility)
    })
    formData.pgRules?.forEach((rule)=>{
      pgFormData.append('pgRules',rule)
    })

      /* Append each selected photos to the FormData object */
      photos.forEach((photo) => {
        pgFormData.append("listingPhotos", photo);
      });


    try {
      dispatch(pgListingStart())

      const resp = await fetch(`${API_URL}/pg/create-listing`, {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data"
          "Authorization": `Bearer ${token}`
        },
        credentials: "include",
        body: pgFormData
      });
      const data = await resp.json();
      // console.log(data)
      
      

      if(!resp.ok){
        dispatch(pgListingFailed(data.message))
        
        return

      }
      showSuccessMessage('listing successfull')
      
      dispatch(pgListingClearError())
      dispatch(pgListingSuccess(data.lsiting))  
      navigate(`/property/pg/${data.lsiting._id}`)    
    } catch (error) {
      console.log(error.message);
      dispatch(pgListingFailed(error.message))
    }
  };



  return (
    <main className="pg-container">
      <form action="" onSubmit={handleSubmit}>
        <section className="pg-section-1">
          <div className="pg-section-heading">
            <h1>Living Space Details: </h1>
            <p>Delve into Comfort, Your Living Space Unraveled!</p>
          </div>

          <div className="room-basic-details">
            <div className="room-details-1">
              {roomDetailsOptions?.map((data, index) => (
                <SelectTag
                  key={index}
                  id={data.id}
                  name={data.id}
                  optionName={data.optionName}
                  optionValues={data.optionValues}
                  formData={formData}
                  setFormData={setFormData}
                ></SelectTag>
              ))}
            </div>
            <div className="room-details-2">
              {rentAmountOptions?.map((amountOpt, index) => (
                <Input
                  key={index}
                  label={amountOpt.label}
                  type="number"
                  placeholder={amountOpt.placeholder}
                  id={amountOpt.id}
                  formData={formData}
                  setFormData={setFormData}
                />
              ))}
            </div>
            <p className=" -mt-20 font-raleway sm:text-xl text-sm text-red-500   capitalize font-bold">
              {formData?.depositAmount < formData?.rentAmount &&
                "deosit amount can not be less than rent amount" }
            </p>
            <div className="room-details-3">
              <h3>room facillities:</h3>
              <div className="amenities-wrapper">
                {roomAmenities.map((ament, index) => (
                  <CheckBoxInput
                    key={index}
                    label={ament.name}
                    htmlFor={ament.name}
                    type="checkbox"
                    id={ament.name}
                    setFormData={setFormData}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="pg-section-2">
          <div className="pg-section-heading">
            <h1> Showcase Your PG Details!: </h1>
            <p>Seamless Listing Experience</p>
          </div>
          <div className="pg-select-category">
            {pgSelectOptions.slice(0, 4).map((data, index) => (
              <SelectTag
                key={index}
                id={data.id}
                name={data.id}
                optionName={data.optionName}
                optionValues={data.optionValues}
                formData={formData}
                setFormData={setFormData}
              ></SelectTag>
            ))}

            {formData.foodAvaibility === "true" &&
              pgSelectOptions
                .slice(4)
                .map((data, index) => (
                  <SelectTag
                    key={index}
                    id={data.id}
                    name={data.id}
                    optionName={data.optionName}
                    optionValues={data.optionValues}
                    formData={formData}
                    setFormData={setFormData}
                  ></SelectTag>
                ))}
          </div>
          <div className="other-pg-details">
            <Input
              id="pgOrHostelName"
              label="pg/hostel name"
              type="text"
              name="pg-name"
              placeholder="ex-royal pg..."
              setFormData={setFormData}
              formData={formData}
              value={formData.pgOrHostelName}
            />

            <div className="pg-rules">
              <h3>pg/hostel rules:</h3>
              <div className="rules-wrapper">
                {pgRules.map((data, index) => (
                  <CheckBoxInput
                    key={index}
                    label={data}
                    htmlFor={data}
                    type="checkbox"
                    id={data}
                    setFormData={setFormData}
                    pgRuleSet={true}
                  />
                ))}
              </div>
            </div>
            <TextArea
              value={formData.description}
              label="pg/hostel description"
              name="description"
              placeholder="describe your pg..."
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </section>
        <section className="pg-section-3">
          <LocalityDetails formData={formData} setFormData={setFormData} />
        </section>
        <section className="pg-section-4">
          <div className="pg-section-heading">
            <h1>Amenities: </h1>
            <p>Provide additional details about your place</p>
          </div>
          <PgAmenities formData={formData} setFormData={setFormData} />
        </section>
        <section className="pg-section-5">
          <div className="pg-section-heading">
            <h1>upload your pg pictures: </h1>
            <UploadPhotos setPhotos={setPhotos} photos={photos} propertyCreated={isPgCreated} />
          </div>
        </section>
        {error && (
          <div className=" w-full flex justify-center items-center">
          <Alert
            className=" w-full sm:w-1/2 md:w-1/3 text-xl"
            color="failure"
            onDismiss={() => dispatch(pgListingClearError())}
          >
            {error}
          </Alert>
        </div>
        )}
        <div className="submit_button">
          <button type="submit">
          {
            loading ? (<>
              <Spinner
                color="failure"
                aria-label="Failure spinner example"
              />{" "}
              listing...
            </>) : 'create listing'
          }
            </button>
        </div>
      </form>
    </main>
  );
}

export default PgPage;
