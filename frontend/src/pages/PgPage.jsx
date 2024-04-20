import React from 'react'
import '../styles/Pg.css'

function PgPage() {
  return (
   <main className='pg-container'>
    <section className='pg-section-1'>
       <div className='pg-section-heading'>
       <h1>Living Space Details:  </h1>
       <p>Delve into Comfort, Your Living Space Unraveled!</p>
       </div>
       <div className='room-basic-details'>
          <div className='room-items'>
            <p>sharing:</p>
            <select name="select-item " id="">
              <option value="" disabled  selected>choose sharing</option>
              <option value="single"> single</option>
              <option value="double"> double</option>
              <option value="three"> three</option>
              <option value="four"> four</option>
            </select>
          </div>
          <div className='room-items'>
            <p>kitchen:</p>
            <select name="kitchen-details" id="" >
              <option value="" disabled selected>select</option>
              <option value="with-kitchen">with kitchen</option>
              <option value="without-kitchen"> without kitchen</option>
              
            </select>
          </div>
          <div className='room-items'>
            <p>balcony:</p>
            <select name="balcony-details" id="" >
              <option value="" disabled selected >select</option>
              <option value="with-balcony"> with balcony</option>
              <option value="without-balcony"> without balcony</option>
              
            </select>
          </div>
       </div>
    </section>
   </main>
  )
}

export default PgPage