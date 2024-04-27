import React, { useState } from "react";
import "../styles/Pg.css";
import {
  sharingOptions,
  kitchenOptions,
  balconyOptions,
  rentAmountOptions,
  roomAmenities,
  pgSelectOptions,
  roomDetailsOptions,
  pgRules
} from "../utils";
import Input from "../components/Input";
import OptionInput from "../components/OptionInput";
import CheckBoxInput from "../components/CheckBoxInput";
import SelectTag from "../components/SelectTag";
import TextArea from "../components/TextArea";
import LocalityDetails from "../components/LocalityDetails";
import PgAmenities from "../components/PgAmenities";
import UploadPhotos from "../components/UploadPhotos";
import { Balcony } from "@mui/icons-material";
import pgFormDataValidation from "../formError";
import { Alert } from "flowbite-react";
import { formErrorHandler } from "../formError";




function PgPage() {
  const [formData, setFormData] = useState({
    roomFacilities: [],
    rentAmount:0,
  depositAmount:0,
    
    roomSharing:'',
    kitchen:'',
    balcony:'',
    availableFor:'',
    placeAvaibility:'',
    foodAvaibility:'',
    doorClosingTime:'',
    foodType:'',
    pgRules:[],
    pgOrHostelName:"",
    description:"",
    state:'',
    city:'',
    localAddress:"",
    laundary:"",
    roomCleaning:"",
    warden:"",
    ameinites:[],
    images:[]
    
  });

  const[error,setError]=useState('')

  const [formError,setFormError]=useState({
    roomFacilities: [],
    roomSharing:'',
    kitchen:'',
    balcony:'',
    availableFor:'',
    placeAvaibility:'',
    foodAvaibility:'',
    doorClosingTime:'',
    foodType:'',
    pgRules:[],
    pgOrHostelName:"",
    description:"",
    state:'',
    city:'',
    localAddress:"",
    laundary:"",
    roomCleaning:"",
    warden:"",
    ameinites:[],
    images:[]
    
  })

  const [amenities, setAmenities] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

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
  console.log(formData);
  // console.log(amenities)

  const handleSubmit=(e)=>{
    e.preventDefault();
    
    const result=formErrorHandler(formData)
    console.log(result)
    setError('')

    if(!result){
      setError('fill all required fields(*)')
      return
    }

    setError('')

    // console.log(formData)
    // console.log('sb thik hai')
   

  }

  return (
    <main className="pg-container">
      <form action="" onSubmit={handleSubmit}  >
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
            {pgSelectOptions.slice(0,4).map((data, index) => (
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
            
            {
             formData.foodAvaibility==='true' && pgSelectOptions.slice(4).map((data,index)=>(
                <SelectTag
                key={index}
                id={data.id}
                name={data.id}
                optionName={data.optionName}
                optionValues={data.optionValues}
                formData={formData}
                setFormData={setFormData}
              ></SelectTag>

              ))
            }
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
           
            <div  className="pg-rules">
              <h3 >pg/hostel rules:</h3>
              <div className="rules-wrapper">
              {
                pgRules.map((data,index)=>(
                  <CheckBoxInput
                  key={index}
                  label={data}
                  htmlFor={data}
                  type="checkbox"
                  id={data}
                  setFormData={setFormData}
                  pgRuleSet={true}
                />
                ))
            }
                </div>
            

            </div>
            <TextArea value={formData.description} label="pg/hostel description" name="description" placeholder="describe your pg..." formData={formData} setFormData={setFormData} />
           
          </div>
        </section>
        <section className="pg-section-3">
          <LocalityDetails formData={formData} setFormData={setFormData}/>
        </section>
        <section className="pg-section-4">
        <div className="pg-section-heading">
            <h1>Amenities: </h1>
            <p>Provide additional details about your place</p>
          </div>
              <PgAmenities formData={formData} setFormData={setFormData}/>
        </section>
        <section className="pg-section-5">
        <div className="pg-section-heading">
            <h1>upload your pg pictures: </h1>
           <UploadPhotos setFormData={setFormData} formData={formData} />
          </div>
        </section>
        {
          error && (
            <Alert color="failure" onDismiss={() => setError('')} className=" sm:px-4 sm:text-1xl font-raleway  sm:w-1/2 sm:my-3 sm:mx-auto">
             {error}
          </Alert>
          )
        }
        <div className="submit_button">
          <button  type="submit">create listing</button>
        </div>
      </form>
    </main>
  );
}

export default PgPage;

{
  
}