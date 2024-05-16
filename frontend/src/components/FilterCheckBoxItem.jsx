import React, { useState } from "react";
import "../styles/SearchPage.css";
function FilterCheckBoxItem({
  option,
  type,
  name = "radioGroup",
  isChecked = "",
  setValue,
  value,
}) {
  return (
    <div className="filter_checkbox_item">
      <input
        type={type}
        id={option}
        value={value}
        name={name ? name : "radio-group"}
        checked={isChecked}
        onChange={(e) => setValue(e.target.value)}
      />
      <label htmlFor={option}>{option}</label>
    </div>
  );
}

export default FilterCheckBoxItem;
