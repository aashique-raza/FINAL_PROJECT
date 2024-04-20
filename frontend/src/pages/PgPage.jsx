import React, { useState } from "react";
import "../styles/Pg.css";
import {
  sharingOptions,
  kitchenOptions,
  balconyOptions,
  rentAmountOptions,
  roomAmenities,
} from "../utils";

function PgPage() {
  const [formData, setFormData] = useState({
    roomAmenities:[]
  });

  const[amenities,setAmenities]=useState([])

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
        roomAmenities: prevData.roomAmenities.filter((amenityId) => amenityId !== id),
      }));
    }
  };
  // console.log(formData)
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
                    <option value={opt.value} key={index}>
                      {opt.label}
                    </option>
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
                  <input type="number"  id={amountOpt.id} placeholder={amountOpt.placeholder}  onChange={handleChange} />
                </div>
              ))}
            </div>
            <div className="room-details-3">
              <h3>room amenities:</h3>
              <div className="amenities-wrapper">
                {roomAmenities.map((ament, index) => (
                  <div className="room-amenities" key={index}>
                    <label htmlFor={ament.name}>{ament.name}: </label>
                    <input
                      type="checkbox"
                      id={ament.name}
                      
                      onChange={(e) => handleCheckboxChange(e, ament.name)}
                    />
                  </div>
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
