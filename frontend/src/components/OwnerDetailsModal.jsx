// import React from 'react'
import React, { useState } from "react";
import { Modal, Button,Spinner } from "flowbite-react";
import { useSelector,useDispatch } from "react-redux";

function OwnerDetailsModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1 for email and mobile, Step 2 for OTP
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const{user}=useSelector(state=>state.user)

  const handleNext = () => {
    
    // setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic here
    console.log({ email, mobile, otp });
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
      <Modal.Header className="text-green-800">
        Please fill your details for getting owner details
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
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
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
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
      <Modal.Footer className="flex flex-col items-center">
        {step === 1 ? (
          <Button color="blue" onClick={handleNext} disabled={loading}>
            {loading ? (
              <div className="flex items-center">
                <Spinner className="mr-3" size="sm" />
                Loading...
              </div>
            ) : (
              "Next"
            )}
          </Button>
        ) : (
          <Button color="blue" onClick={handleSubmit}>
            Submit
          </Button>
        )}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </Modal.Footer>
    </Modal>
  );
}

export default OwnerDetailsModal;
