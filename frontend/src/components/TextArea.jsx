import React from 'react'

function TextArea({label='',name='',placeholder=''}) {
  return (
    <div className='textArea '>
        <label htmlFor="" className='required'>{label}</label>
        <textarea name={name} id={name} placeholder={placeholder}></textarea>
    </div>
  )
}

export default TextArea