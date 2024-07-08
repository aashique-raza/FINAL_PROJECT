import React,{useState,useEffect} from "react";

function SelectTag({id='', name='',optionName='',optionValues=[],setFormData,formData,setState,width,state=false,defaultValue }) {

    // console.log(optionValues)
    

    // console.log('default value',defaultValue)
    const handleChange=(e)=>{
      const{value,name,id}=e.target;
        // setState(id)
        // setSelectedValue(value);
      setFormData({
        ...formData,
        [id]:value
      })

      if(state){
        setState(value)
      }
     
    }


  return (
    <div className={`select_container ${width ? ' w-full' : '' }`}>
      <p className="required pl-2 mb-2 text-xl lg:text-2xl capitalize tracking-wider font-sans font-bold">{optionName}</p>
      <div className="listing_select">
      <select id={id} name={name}  onChange={handleChange} className=" listing_select_tag focus:ring-0"    >
        {
            optionValues?.map((value,index)=>(
                <option key={index} value={value.value}> {value.label}</option>
            ))
        }
      </select>
      </div>
     
    </div>
  );
}

export default SelectTag;

{/* <div className="edit-select-wrapper ">
<p className=" pl-2 mb-2 text-xl lg:text-2xl capitalize tracking-wider font-sans font-bold ">
  {optionName}
</p>
<div className="edit_select w-full">
  <select
    id={id}
    className="edit_select_tag focus:ring-0"
    value={selectedValue}
    name={name}
    onChange={handleChange}
  >
    {optionValues.map((item, index) => (
      <option key={index} value={item.value}>
        {item.label}
      </option>
    ))}
  </select>
</div>
</div> */}
