import React, { useState, useEffect } from "react";
import "../../styles/EditPage.css";

// import React, { useState, useEffect } from 'react';

function EditRadioInput({
  name,
  id,
  label,
  value,
  // setEditedFormData,
  // editFormData,
  isChecked,
  setAvailablePropertyData
}) {


  const handleChange = (e) => {
    const { value } = e.target;
    // console.log(value)
    setAvailablePropertyData(value)
    // setEditedFormData({ ...editFormData, [name]: value });
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
