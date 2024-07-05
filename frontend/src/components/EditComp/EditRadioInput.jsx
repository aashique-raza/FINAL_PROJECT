import React, { useState, useEffect } from "react";
import "../../styles/EditPage.css";

// import React, { useState, useEffect } from 'react';

function EditRadioInput({
  name,
  id,
  label,
  value,
  setFormData,
  formData,
  isChecked,
  setAvailablePropertyData,
  pgedit=false
}) {


  const handleChange = (e) => {
    // alert('hii')
    const { value,id,name } = e.target;
    // console.log(value)
    // console.log(id)
    if(pgedit){
      setFormData({
        ...formData,
        // [id==='propertyAvailableForRent' || id==='propertyAvailableForLease'?'propertyAvailableFor':id]:value
        [name]: value==='yes'
         
      })
    }else{
      setFormData({
      ...formData,
      [id==='propertyAvailableForRent' || id==='propertyAvailableForLease'?'propertyAvailableFor':id]:value
      // [name]: value === 'yes'
       
    })

    }
    
  };

  return (
    <div className="edit-radio-button">
      <input
        type="radio"
        className="edit-radio-button__input"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
      />
      <label className="edit-radio-button__label" htmlFor={id}>
        <span className="edit-radio-button__custom"></span>
        {label}
      </label>
    </div>
  );
}

export default EditRadioInput;
