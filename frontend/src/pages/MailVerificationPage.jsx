import React, { useEffect, useState } from "react";
import { Alert, Spinner } from "flowbite-react";

import { useNavigate } from "react-router-dom";
import { API_URL } from "../configue";
import { getTokenFromLocalStorage } from "../token";
import {
  emailVeriFicatioFailed,
  emailVeriFicationStart,
  emailVerificationSuccess,
  clearError,
} from "../features/user.slice";
import { useDispatch, useSelector } from "react-redux";

function MailVerificationPage({ showSuccessMessage }) {
  const token = getTokenFromLocalStorage();
  const [id, setId] = useState("");
  const [reset, setResetToken] = useState("");
  const { user } = useSelector((state) => state.user);

  const { loading, errorr } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(clearError());
      dispatch(emailVeriFicationStart());
      const resp = await fetch(
        `${API_URL}/user/verify-mail/?user=${id}&&verificationToken=${reset}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const data = await resp.json();
      console.log(data);

      if (!resp.ok) {
        dispatch(emailVeriFicatioFailed(data.message));

        return;
      }

      dispatch(clearError());
      dispatch(emailVerificationSuccess());
      showSuccessMessage("email verified successfully");

      navigate("/profile/myProfile");
    } catch (error) {
      dispatch(emailVeriFicatioFailed(error.message))
      console.log(error)
    }
  };

  return (
    <div className=" flex  justify-center  items-center  mt-32  border-2 border-red-300 ">
      <div className="w-full flex flex-col gap-4 items-center md:w-96 px-12 py-8 rounded-sm shadow-lg bg-slate-200">
        <h3 className=" md:text-xl font-raleway uppercase font-bold">
          verify your email here
        </h3>
        <button
          onClick={handleVerify}
          className=" px-6 py-4 border-none outline-none text-white bg-red-600 text-sm sm:text-xl  font-roboto  capitalize cursor-pointer"
        >
          {loading ? (
            <>
              <Spinner color="success" aria-label="Failure spinner example" />{" "}
              verifying...
            </>
          ) : (
            "click to verify email"
          )}
        </button>
        {errorr && (
          <div className=" mt-2 w-full ">
            <Alert
              color="failure"
              onDismiss={() => setError(null)}
              className=" sm:px-4 sm:text-1xl font-raleway   sm:mx-auto"
            >
              {errorr}
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}

export default MailVerificationPage;
