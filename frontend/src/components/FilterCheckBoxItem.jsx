import React from 'react'
import '../styles/SearchPage.css'
function FilterCheckBoxItem({option,type,name='radioGroup'}) {
  // console.log(option)
  return (
    <div className='filter_checkbox_item'>
        <input type={type} id={option} name={name?name :"radio-group"}/>
        <label htmlFor={option}>{option}</label>
    </div>
  )
}

export default FilterCheckBoxItem