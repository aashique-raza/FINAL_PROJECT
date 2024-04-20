import React from 'react'

function Input({type='text',placeholder='', id='',setFormData,formData}) {

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
          ...formData,
          [id]: value,
        });
      };
  return (
    <input type={type} placeholder={placeholder} id={id} onChange={handleChange} />
  )
}

export default Input