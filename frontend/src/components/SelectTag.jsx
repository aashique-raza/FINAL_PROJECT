import React from "react";

function SelectTag({id='', name='',optionName='',optionValues=[]}) {
    // console.log(optionValues)
  return (
    <div className="select_container">
      <p className="required">{optionName}</p>
      <select id={id} name={name} >
        {
            optionValues?.map((value,index)=>(
                <option key={index} value={value.value}> {value.label}</option>
            ))
        }
      </select>
    </div>
  );
}

export default SelectTag;
