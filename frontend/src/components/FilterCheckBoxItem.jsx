import React, { useState,useEffect } from "react";
import "../styles/SearchPage.css";
import { useNavigate, useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';

function FilterCheckBoxItem({ option, type, name, value, setValue, isChecked}) {
  const handleChange=(e)=>{
    const{value,checked,id}=e.target
    // console.log('checked',checked)
    setValue(value)
    // setInputChecked(value)
  }
  return (
    <div className="filter_checkbox_item">
      <input
        type={type}
        id={option}
        value={value}
        name={name}
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor={option}>{option}</label>
    </div>
  );
}

export default FilterCheckBoxItem;


// export default FilterCheckBoxItem;
