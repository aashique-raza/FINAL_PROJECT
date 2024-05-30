import React from 'react'
import '../../styles/Home.css'

function SearchCategory({ name, label, id, handleFilterCHange, isChecked }) {
    return (
      <div className="search-category">
        <input 
          checked={isChecked} 
          type="radio" 
          id={id} 
          name={name} 
          onChange={(e) => handleFilterCHange(e.target.id)} 
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }
  

export default SearchCategory