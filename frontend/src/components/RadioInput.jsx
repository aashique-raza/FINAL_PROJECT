import React from "react";

function RadioInput({id='',name='' ,lable=''}) {
  return (
    <div className="radio_input_container">
      <label htmlFor={id} >{lable}</label>
      <input type="radio" name={name} />
    </div>
  );
}

export default RadioInput;
