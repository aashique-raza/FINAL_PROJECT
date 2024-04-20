import React from 'react'

function OptionInput({value='',label=''}) {
  return (
   <option value={value}>{label}</option>
  )
}

export default OptionInput