import React, { useState, useEffect } from "react";
import "../styles/Home.css";

function SearchItemButton({ name, htmlFor, id, isChecked, onCheckedChange }) {
  return (
    <div className="radio-group">
      <input
        type="radio"
        name={name}
        value={id}
        id={id}
        className="hidden"
        checked={isChecked}
        onChange={() => onCheckedChange(id)}
        
      />
      <label htmlFor={htmlFor} className="font-roboto">
        {htmlFor}
      </label>
    </div>
  );
}

export default SearchItemButton;
