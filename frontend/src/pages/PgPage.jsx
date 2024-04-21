import React, { useState } from "react";
import "../styles/Pg.css";
import {
  sharingOptions,
  kitchenOptions,
  balconyOptions,
  rentAmountOptions,
  roomAmenities,
  pgSelectOptions,
  roomDetailsOptions
} from "../utils";
import Input from "../components/Input";
import OptionInput from "../components/OptionInput";
import CheckBoxInput from "../components/CheckBoxInput";
import SelectTag from "../components/SelectTag";


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
  console.log(formData);
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
              {
                roomDetailsOptions?.map((data,index)=>(
                  <SelectTag key={index} id={data.id} name={data.id} optionName={data.optionName} optionValues={data.optionValues}  ></SelectTag>
                ))
              }
            
            </div>
            <div className="room-details-2">
              {rentAmountOptions?.map((amountOpt, index) => (

                <Input key={index} label={amountOpt.label} type='number' placeholder={amountOpt.placeholder} id={amountOpt.id} formData={formData} setFormData={setFormData} />
                // <div key={index} className="amount-details">
                //   <label htmlFor="">{amountOpt.label}</label>
                //   <Input
                //     type="number"
                //     id={amountOpt.id}
                //     placeholder={amountOpt.placeholder}
                //     setFormData={setFormData}
                //     formData={formData}
                //   />
                // </div>
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
             {
                pgSelectOptions?.map((data,index)=>(
                  <SelectTag key={index} id={data.id} name={data.id} optionName={data.optionName} optionValues={data.optionValues} >
                   
                  </SelectTag>
                ))
              }
             </div>
        </section>
      </form>
    </main>
  );
}

export default PgPage;
