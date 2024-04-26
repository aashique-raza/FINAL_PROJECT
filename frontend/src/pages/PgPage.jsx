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



function PgPage() {
  const [formData, setFormData] = useState({
    roomAmenities: [],
  });

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
        roomAmenities: [...prevData.roomAmenities, id],
      }));
    } else {
      // Remove the unchecked amenity from the roomAmenities array
      setFormData((prevData) => ({
        ...prevData,
        roomAmenities: prevData.roomAmenities.filter(
          (amenityId) => amenityId !== id
        ),
      }));
    }
  };
  // console.log(formData);
  // console.log(amenities)

  return (
    <main className="pg-container">
      <form action="">
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
              ></SelectTag>
            ))}
            {
              pgSelectOptions.slice(4).map((data,index)=>(
                <SelectTag
                key={index}
                id={data.id}
                name={data.id}
                optionName={data.optionName}
                optionValues={data.optionValues}
              ></SelectTag>

              ))
            }
          </div>
          <div className="other-pg-details">
            <Input
              label="pg/hostel name"
              type="text"
              name="pg-name"
              placeholder="ex-royal pg..."
              setFormData={setFormData}
              formData={formData}
            />
           
            <div  className="pg-rules">
              <h3 className="required">pg/hostel rules:</h3>
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
                />
                ))
            }
                </div>
            

            </div>
            <TextArea label="pg/hostel description" name="description" placeholder="describe your pg..." />
           
          </div>
        </section>
        <section className="pg-section-3">
          <LocalityDetails/>
        </section>
        <section className="pg-section-4">
        <div className="pg-section-heading">
            <h1>Amenities: </h1>
            <p>Provide additional details about your place</p>
          </div>
              <PgAmenities/>
        </section>
        <section className="pg-section-5">
        <div className="pg-section-heading">
            <h1>upload your pg pictures: </h1>
           
          </div>
        </section>
      </form>
    </main>
  );
}

export default PgPage;

{
  
}