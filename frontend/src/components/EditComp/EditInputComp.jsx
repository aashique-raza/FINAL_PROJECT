import React,{useState,useEffect} from "react";

function EditInputComp({
    label = '',
    type = 'text',
    placeholder = '',
    id = '',
    formData,
    setFormData,
    defaultValue ,
    editFormData,
    setEditFormData,
    locationField=false
  }) {

    // console.log('defaul value',defaultValue)
    const [defaultSelected, setDefaultSelected] = useState(defaultValue || '');
  
    useEffect(() => {
      setDefaultSelected(defaultValue || '');
    }, [defaultValue]);
  
    const handleChange = (e) => {
      const { value, id } = e.target;
      setDefaultSelected(value);
      locationField ? setFormData({
        ...formData,
        location:{
          ...formData.location,
          [id]:value
        }
      }):
      setFormData({
        ...formData,
        [id]: id==='builtUpArea' || id==='depositAmount' || id==='maintenanceAmount' || id==='rentAmount' ?parseInt(value) : value
      });
    };
  
    return (
      <div className="edit-input-wrapper">
       
        <input
          placeholder={placeholder}
          className="input-field focus:ring-0"
          type={type}
          id={id}
          value={defaultSelected}
          onChange={handleChange}
        />
        <label htmlFor="input-field" className="input-label">
          {label}
        </label>
        <span className="input-highlight text-xl lg:text-2xl capitalize tracking-wider font-sans font-bold"></span>
      </div>
    );
  }
  

export default EditInputComp;
