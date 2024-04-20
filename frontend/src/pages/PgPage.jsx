import React, { useState } from "react";
import "../styles/Pg.css";
import { sharingOptions,kitchenOptions,balconyOptions } from "../utils";

function PgPage() {

  const[formData,setFormData]=useState({})

  const handleChange=(e)=>{
    const {id,value}=e.target;
    setFormData({
      ...formData,
      [id]:value
    }
    )
  }

  // console.log(formData)


  return (
    <main className="pg-container">
      <section className="pg-section-1">
        <div className="pg-section-heading">
          <h1>Living Space Details: </h1>
          <p>Delve into Comfort, Your Living Space Unraveled!</p>
        </div>
        <div className="room-basic-details">
          <form action="" className="room-form">
          <div className="room-items">
            <p>sharing:</p>

            <select
              name="select-item"
              id="roomSharing"
              className="sharing-items"
              value={formData.roomSharing}
              onChange={handleChange}
            >
              {sharingOptions?.map((option,index) => (
                <option value={option.value} key={index} >{option.label}</option>
              ))}
            </select>
          </div>
          <div className="room-items">
            <p>kitchen:</p>
            <select name="kitchen-details" id="kitchen" onChange={handleChange} value={formData.kitchen}>
              {
                kitchenOptions?.map((opt,index)=>(
                  <option value={opt.value} key={index} >{opt.label}</option>
                ))
              }
            </select>
          </div>
          <div className="room-items">
            <p>balcony:</p>
            <select name="balcony-details" id="balcony" onChange={handleChange} value={formData.balcony}>
              {
                balconyOptions?.map((opt,index)=>(
                  <option value={opt.value} key={index}>{opt.label}</option>
                ))
              }
             
            </select>
          </div>
          </form>
         
        </div>
      </section>
    </main>
  );
}

export default PgPage;
