import React, { useState } from "react";
import "../styles/ContactPage.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Importing icons
import {API_URL} from '../configue'
import {Spinner,Alert} from 'flowbite-react'

function ContactPage({showSuccessMessage}) {
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState('')

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handlePhoneChange = (value) => {
        setFormData({
          ...formData,
          phone: value
        });
      };

    //   console.log('formdata',formData)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
      
        try {
          setError(null);
          setLoading(true);
      
          const resp = await fetch(`${API_URL}/contactus/sendmessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData) // Make sure formData is JSON-stringified
          });
      
          const result = await resp.json();
          if (!resp.ok) {
            setError(result.message);
            setLoading(false);
            return;
          }
      
          setError('');
          setLoading(false);
          showSuccessMessage(result.msg);
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
          })
        } catch (error) {
          setError('Something went wrong. Please try again later!');
          setLoading(false);
          console.log('Message send failed', error);
        }
      };
      

  return (
    <main className=" contact-container">
      <aside>
        <div>
          <h1>contact us</h1>
          <p>
            Have a question or need assistance? Fill out the form below, and <br />
            we'll get back to you shortly.
          </p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-label">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter your name..."
            value={formData.name}
            onChange={handleChange}
            className=" focus:ring-0"
          />
        </div>
        <div className="form-label">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email..."
            value={formData.email}
            onChange={handleChange}
            className=" focus:ring-0"
          />
        </div>
        <div className="form-label">
          <label htmlFor="phone">Mobile</label>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="IN"
            placeholder="976854390"
            value={formData.phone}
            onChange={handlePhoneChange}
            className=" focus:ring-0" 
          />
        </div>
        <div className="form-label">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Type message..."
            maxLength="1000"
            value={formData.message}
            onChange={handleChange}
            className=" focus:ring-0"
          />
          <span className="char-count"> {formData.message==''?'Max chars:':'Remaining Chars:'} <b>{1000- formData.message.length} </b></span>
        </div>
        <button type="submit">
            {
                loading ? (
                    <>  <Spinner color="failure"/> 'sending' </>
                ) : 'send message'
            }

        </button>
        {
            error && <Alert color="success" onDismiss={() =>setError('')}>
            <span className="font-medium">{error}</span> 
          </Alert>
        }
      </form>
      </aside>
      <address className="address">
        <div>
            <h2 className="  "> <b> <FaMapMarkerAlt className="  icon inline-block"/> </b> malviya nagar,new delhi 110017 </h2>
            <h2> <b><FaEnvelope className="icon inline-block"/> </b> farhanraza2239@gmail.com </h2>
            <h2> <b> <FaPhone className="icon inline-block"/> +91 7389571975 </b> </h2>
        </div>
        <div className="map-image">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14020.648141307964!2d77.19942994791408!3d28.534848962753305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce21e7d306d03%3A0x94b8ccb323d7648!2sMalviya%20Nagar%2C%20New%20Delhi%2C%20Delhi%20110017!5e0!3m2!1sen!2sin!4v1721132568328!5m2!1sen!2sin"
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        </div>
      </address>
    </main>
  );
}

export default ContactPage;
