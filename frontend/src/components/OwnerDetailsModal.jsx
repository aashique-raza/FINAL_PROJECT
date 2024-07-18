// import React from 'react'
import React, { useEffect, useState } from "react";
import { Modal, Button,Spinner } from "flowbite-react";
import { useSelector,useDispatch } from "react-redux";
import { API_URL } from "../configue";

function OwnerDetailsModal({ isOpen, onClose,id, dataCategory,setModalOPen }) {
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
 
  const handleMobileChange = (e) => {
    let input = e.target.value;

    // Remove non-numeric characters
    input = input.replace(/\D/g, '');

    // Limit to 10 digits
    if (input.length > 10) {
      input = input.slice(0, 10);
    }

    // Update state
    setMobile(input);
  };
  // console.log( mobile)
  const handleNext = async() => {
   

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
          setError(null)
          setLoading(false)
          setMatchOTP(result.otp)
           setStep(2);
           

        
    } catch (error) {
        console.log('email verification failed',error)
        setError(error.message)
        setLoading(false)
    }
   
  };

 async function getRentalPropertyOwnerDetails(){
    try {
      setError(null)
      setLoading(true)


      const resp = await fetch(`${API_URL}/guest/getOwnerDetails/${propertyId}/${category}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email,mobile }),
    });

      const result=await resp.json()
      console.log(result)
      if(!resp.ok){
        setError(result.message)
        setLoading(false)
        return
      }

      setError(null)
      setLoading(false)
      console.log(result)
      // setModalOPen(!isOpen)
      setSuccessMsg(result.msg)

      
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
          body: JSON.stringify({ email ,mobile}), 
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
      setSuccessMsg(result.msg)
      // setModalOPen(!isOpen)

      
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

  if(otp!==matchOTP) return setError('OTP Missmatched!')
  
  if(category==='rental'){
    console.log('rental function call hua')
    getRentalPropertyOwnerDetails()
    setMatchOTP('')
  }else{
    console.log('pg function call hua')
    getPgPropertyOwnerDetails()
    setMatchOTP('')
  }


  };

  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
      <Modal.Header className="text-red-500 text-center text-4xl font-bold font-raleway pt-6 pb-4">
  Please fill your details for getting owner details
</Modal.Header>
<Modal.Body>
  <form className="space-y-4">
    {step === 1 && (
      <>
        <div>
          <label
            htmlFor="email"
            className="block text-xl font-bold font-raleway text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 py-4 px-4 text-3xl font-bold font-raleway block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="mobile"
            className="block text-xl font-bold font-raleway text-gray-700"
          >
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            className="mt-1 py-4 px-4 text-3xl font-bold font-raleway block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={mobile}
            onChange={ handleMobileChange}
            required
          />
        </div>
      </>
    )}
    {step === 2 && (
      <div>
        <label
          htmlFor="otp"
          className="block text-xl font-bold font-raleway text-gray-700"
        >
          Enter OTP
        </label>
        <input
          type="text"
          id="otp"
          className="mt-1 py-4 px-4  text-3xl font-bold font-raleway block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
      </div>
    )}
  </form>
  <button className=" p-1 bg-black rounded-full  absolute top-4 right-4 text-4xl text-white font-bold focus:outline-none" onClick={onClose}>
    &times;
  </button>
</Modal.Body>

      <Modal.Footer className="flex flex-col items-center">
  {step === 1 ? (
    <Button
      color="red"
      size="xl"
      onClick={handleNext}
      disabled={loading}
      className="w-32 bg-red-500 text-white hover:bg-red-700"
    >
      {loading ? (
        <div className="flex items-center">
          <Spinner className="mr-3" size="xl" />
          Loading...
        </div>
      ) : (
        "Next"
      )}
    </Button>
  ) : (
    <Button
      size="xl"
      color="red"
      onClick={handleOTPSubmit}
      className="w-32 bg-red-500 text-white hover:bg-red-700"
    >
      {loading ? (
        <div className="flex items-center">
          <Spinner className="mr-3" size="xl" />
          Loading...
        </div>
      ) : (
        "Submit"
      )}
    </Button>
  )}
  {error && <p className="text-red-600 mt-2">{error}</p>}
  {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}
</Modal.Footer>

    </Modal>
  );
}

export default OwnerDetailsModal;
