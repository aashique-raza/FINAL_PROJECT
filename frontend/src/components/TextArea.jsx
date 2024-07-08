import React from 'react'

function TextArea({label='',name='',placeholder='',setFormData,formData,value}) {

const handleChange=(e)=>{
  const{id,value,name}=e.target;

  setFormData({
    ...formData,
    [id]:value
  })

}

  return (
    <div className='textArea '>
        <label htmlFor="" className='required'>{label}</label>
        <textarea className='text-sm capitalize text-gray-600 md:text-xl font-bold tracking-wider font-roboto' value={value} name={name} id={name} placeholder={placeholder} onChange={handleChange}></textarea>
    </div>
  )
}

export default TextArea