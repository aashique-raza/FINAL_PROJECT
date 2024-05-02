import React, { useEffect, useState } from "react";
import { Alert, Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MailVerificationPage() {
  const [id, setId] = useState("");
  const [reset, setResetToken] = useState("");
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    // URL se query parameters ko extract karna
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user");
    const resetToken = urlParams.get("verificationToken");
    setResetToken(resetToken);
    setId(userId);
  }, []);

  const handleVerify = async () => {
    try {
      setError(null);
      setLoading(true);
      const resp = await fetch(
        `/api/user/verify-mail/?user=${id}&&verificationToken=${reset}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
          },
          
        }
      );

      const data = await resp.json();
      console.log(data);

      if (!resp.ok) {
        // console.log(result)
        // console.log(data.message);
        setError(data.message);
        setLoading(false);
        return;
      }

      setError(null);
      setLoading(false);
      setSuccess(data.msg);
      setTimeout(() => {
        navigate('/profile/myProfile');
    }, 1000)
    } catch (error) {}
  };

  return (
    <div className=" flex  justify-start flex-col items-center mt-16 gap-3">
      <div className="w-full flex flex-col gap-4 items-center md:w-80 px-3 py-3 rounded-sm shadow-lg bg-slate-200">
        <h3 className=" md:text-xl font-raleway uppercase font-bold">
          verify your email here
        </h3>
        <button
          onClick={handleVerify}
          className=" px-6 py-4 border-none outline-none text-white bg-green-600 text-xs font-raleway font-semibold capitalize cursor-pointer"
        >
          {loading ? (
            <Spinner color="success" aria-label="Failure spinner example" />
          ) : (
            "click to verify email"
          )}
        </button>
      </div>
      <div className="w-full md:w-80 ">
        {error && (
          <Alert
            color="failure"
            onDismiss={() => setError(null)}
            className=" sm:px-4 sm:text-1xl font-raleway  sm:w-1/2 sm:my-3 sm:mx-auto"
          >
            {error}
          </Alert>
        )}
        {success && (
          <Alert
            color="success"
            onDismiss={() => setSuccess(null)}
            className=" sm:px-4 sm:text-1xl font-raleway  sm:w-1/2 sm:my-3 sm:mx-auto"
          >
            {success}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default MailVerificationPage;
