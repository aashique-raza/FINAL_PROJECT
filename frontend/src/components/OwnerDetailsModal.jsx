// import React from 'react'
import React, { useState } from 'react';
import { Modal, Button } from 'flowbite-react';

function OwnerDetailsModal({ isOpen, onClose }) {

    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // Step 1 for email and mobile, Step 2 for OTP
  
    const handleNext = () => {
      setStep(2);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle submit logic here
      console.log({ email, mobile, otp });
    };
  

  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
      <Modal.Header>
        Please fill your details for getting owner details
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          {step === 2 && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
        </form>
      </Modal.Body>
      <Modal.Footer>
        {step === 1 ? (
          <Button color="blue" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button color="blue" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default OwnerDetailsModal