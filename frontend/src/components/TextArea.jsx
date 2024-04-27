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
        <textarea value={value} name={name} id={name} placeholder={placeholder} onChange={handleChange}></textarea>
    </div>
  )
}

export default TextArea