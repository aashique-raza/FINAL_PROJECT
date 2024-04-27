import React from "react";

function SelectTag({id='', name='',optionName='',optionValues=[],setFormData,formData,setState}) {
    // console.log(optionValues)

    const handleChange=(e)=>{
      const{value,name,id}=e.target;
        // setState(id)
      setFormData({
        ...formData,
        [id]:value
      })
    }


  return (
    <div className="select_container">
      <p className="required">{optionName}</p>
      <select id={id} name={name} onChange={handleChange}   >
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
