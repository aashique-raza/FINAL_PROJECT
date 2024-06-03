import React,{useState,useEffect} from "react";

function SelectTag({id='', name='',optionName='',optionValues=[],setFormData,formData,setState,width,state=false,defaultValue }) {

    // console.log(optionValues)
    

    // console.log('default value',defaultValue)
    const handleChange=(e)=>{
      const{value,name,id}=e.target;
        // setState(id)
        setSelectedValue(value);
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
      <p className="required">{optionName}</p>
      <select id={id} name={name}  onChange={handleChange}    >
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
