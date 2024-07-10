// import React from 'react'
import React, { useEffect, useState } from "react";
import { Modal, Button,Spinner } from "flowbite-react";
import { useSelector,useDispatch } from "react-redux";
import { API_URL } from "../configue";

function OwnerDetailsModal({ isOpen, onClose,id, dataCategory }) {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1 for email and mobile, Step 2 for OTP
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const{user}=useSelector(state=>state.user)
  const[propertyId,setPropertyId]=useState(id)
  const[category,setCategory]=useState(dataCategory)
  const [matchOTP,setMatchOTP]=useState(null)
  const[successMsg,setSuccessMsg]=useState('')
  
  useEffect(()=>{
    setPropertyId(id)
    setCategory(dataCategory)
  })

  const handleNext = async() => {
    // console.log(email)
    // console.log(mobile)
    if(!email || !mobile) return setError('fill required fileds.')
        // console.log(propertyId,category)
    try {
        setError(null)
        setLoading(true)
        const resp = await fetch(`${API_URL}/guest/sendMailVerificationOtp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set the correct content type
                // Authorization: `Bearer ${token}`, // Uncomment if you need to send a token
              },
              // credentials: "include",
              body: JSON.stringify({ email }), // Convert email to JSON string
          });

          const result=await resp.json()

          console.log(result)

          if(!resp.ok){
            setError(result.message)
            setLoading(false)
            return
          }

          setMatchOTP(result.otp)
           setStep(2);
           

        
    } catch (error) {
        console.log('email verification failed',error)
        setError(error.message)
    }
   
  };

 async function getRentalPropertyOwnerDetails(){
    try {
      setError(null)
      setLoading(true)


      const resp=await fetch(`${API_URL}/guest/getOwnerDetails/${propertyId}/${category}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Set the correct content type
            // Authorization: `Bearer ${token}`, // Uncomment if you need to send a token
          },
          // credentials: "include",
          body: JSON.stringify({ email }), 
      })

      const result=await resp.json()

      if(!resp.ok){
        setError(result.message)
        setLoading(false)
        return
      }

      setError(null)
      setLoading(false)
      console.log(result)

      
    } catch (error) {
      console.log('get rental property owner details failed',error.message)
      setError(error.message)
      setLoading(false)
    }
  }

  async function getPgPropertyOwnerDetails(){
    try {
      setError(null)
      setLoading(true)


      const resp=await fetch(`${API_URL}/guest/getOwnerDetails/${propertyId}/${category}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Set the correct content type
            // Authorization: `Bearer ${token}`, // Uncomment if you need to send a token
          },
          // credentials: "include",
          body: JSON.stringify({ email }), 
      })

      const result=await resp.json()

      if(!resp.ok){
        setError(result.message)
        setLoading(false)
        return
      }

      setError(null)
      setLoading(false)
      console.log(result)

      
    } catch (error) {
      console.log('get pg property owner details failed',error.message)
      setError(error.message)
      setLoading(false)
    }
  }

  const handleOTPSubmit = () => {
    console.log('ye chal rha yaha')
    // e.preventDefault();
    setError(null)
  console.log(otp)
  console.log(matchOTP)
  
  if(category==='rental'){
    getRentalPropertyOwnerDetails()
  }else{
    getPgPropertyOwnerDetails()
  }


  };

  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
      <Modal.Header className="text-green-800">
        Please fill your details for getting owner details
      </Modal.Header>
      <Modal.Body>
        <form  className="space-y-4">
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
          <Button color="blue" onClick={handleOTPSubmit}>
            Submit
          </Button>
        )}
        {error && <p className="text-red-600 mt-2">{error}</p>}
        {successMsg && <p className="text-green-600 mt-2">{error}</p>}
      </Modal.Footer>
    </Modal>
  );
}

export default OwnerDetailsModal;
