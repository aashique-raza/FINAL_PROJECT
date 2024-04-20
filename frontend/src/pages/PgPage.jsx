import React, { useState } from "react";
import "../styles/Pg.css";
import {
  sharingOptions,
  kitchenOptions,
  balconyOptions,
  rentAmountOptions,
  roomAmenities,
} from "../utils";
import Input from "../components/Input";
import OptionInput from "../components/OptionInput";
import CheckBoxInput from "../components/CheckBoxInput";

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
              <div className="room-items">
                <p>sharing:</p>

                <select
                  name="select-item"
                  id="roomSharing"
                  className="sharing-items"
                  value={formData.roomSharing}
                  onChange={handleChange}
                >
                  {sharingOptions?.map((option, index) => (
                    <option value={option.value} key={index}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="room-items">
                <p>kitchen:</p>
                <select
                  name="kitchen-details"
                  id="kitchen"
                  onChange={handleChange}
                  value={formData.kitchen}
                >
                  {kitchenOptions?.map((opt, index) => (
                    <OptionInput
                      value={opt.value}
                      key={index}
                      label={opt.label}
                    />
                  ))}
                </select>
              </div>
              <div className="room-items">
                <p>balcony:</p>
                <select
                  name="balcony-details"
                  id="balcony"
                  onChange={handleChange}
                  value={formData.balcony}
                >
                  {balconyOptions?.map((opt, index) => (
                    <option value={opt.value} key={index}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="room-details-2">
              {rentAmountOptions?.map((amountOpt, index) => (
                <div key={index} className="amount-details">
                  <label htmlFor="">{amountOpt.label}</label>
                  <Input
                    type="number"
                    id={amountOpt.id}
                    placeholder={amountOpt.placeholder}
                    setFormData={setFormData}
                    formData={formData}
                  />
                </div>
              ))}
            </div>
            <div className="room-details-3">
              <h3>room amenities:</h3>
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
      </form>
    </main>
  );
}

export default PgPage;
