import React, { useState, useEffect, useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { Warning, CheckCircle } from "@mui/icons-material";
import { Alert, Spinner } from "flowbite-react";
import { validateEmail, validateMobileNumber } from "../formError";

import { updateSucceFully } from "../features/user.slice";
import { API_URL } from "../configue";
import { getTokenFromLocalStorage,removeRefreshTokenFromLocalStorage,refreshAccessToken } from "../token";

function BasicProfilePage({ showSuccessMessage }) {
  // token extarct--
  const token = getTokenFromLocalStorage();
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const [imageFile, setImageFile] = useState(null);

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const refEl = useRef();

  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  // create stae for verification email-----

  const [verificatioLoading, setVerificationLOading] = useState(false);

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const hanldeImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        // console.log(error);
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        console.log(error);

        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);

        setImageFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log(downloadURL)
          setImageFileUrl(downloadURL);
          // console.log(downloadURL);
          setFormData({
            ...formData,
            profileImage: downloadURL,
          });
          setImageFileUploading(false);

          setImageFile(null);
        });
      }
    );
  };

  // console.log(imageFileUploading)

  const handleChangeInput = (e) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: id === "mobile" ? parseInt(value) : value,
    });
  };

  // console.log(formData)

  const handeSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData?.email && !validateEmail(formData.email)) {
      return setError("Invalid email ");
    }

    if (formData?.mobile && !validateMobileNumber(formData.mobile)) {
      return setError("Invalid mobile number ");
    }

    try {
      setError(null);
      setloading(true);

      const resp = await fetch(`${API_URL}/user/update-account/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await resp.json();
      // console.log(data);

      if (!resp.ok) {
        if (resp.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            // Retry original request with new token
            await handleSubmitWithToken(newToken);
          } else {
            setError("Failed to refresh access token");
          }

          return;
        }

        setError(data.message);
        setloading(false);
        return;
      }

      setError(null);
      setloading(false);
      dispatch(updateSucceFully(data.updatedUser));
      showSuccessMessage("updated successfully!");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const handleSubmitWithToken = async (newtoken) => {
    try {
      setError(null);
      setloading(true);

      const resp = await fetch(`${API_URL}/user/update-account/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
          Authorization: `Bearer ${newtoken}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await resp.json();
      // console.log(data);

      if (!resp.ok) {
        setError(data.message);
        setloading(false);
        return;
      }

      setError(null);
      setloading(false);
      dispatch(updateSucceFully(data.updatedUser));
      showSuccessMessage("updated successfully!");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const handleEmailVerification = async () => {
    try {
      setError(null);
      setVerificationLOading(true);
      showSuccessMessage(null);

      const resp = await fetch(
        `${API_URL}/user/send-verification-mail/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: user.email }),
        }
      );

      const data = await resp.json();
      // console.log(data);

      if (!resp.ok) {
        if (resp.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            // Retry original request with new token
            await handleEmailVerificationWithToken(newToken);
          } else {
            setError("please login again");
          }

          return;
        }

        setError(data.message);
        setVerificationLOading(false);
        return;
      }

      setError(null);
      setVerificationLOading(false);
      showSuccessMessage("link sent successfully!");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setVerificationLOading(false)
    }
  };

  const handleEmailVerificationWithToken = async (newtoken) => {
    try {
      setError(null);
      setVerificationLOading(true);
      showSuccessMessage(null);

      const resp = await fetch(
        `${API_URL}/user/send-verification-mail/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
            Authorization: `Bearer ${newtoken}`,
          },
          body: JSON.stringify({ email: user.email }),
        }
      );

      const data = await resp.json();
      // console.log(data);

      if (!resp.ok) {
        setError(data.message);
        setVerificationLOading(false);
        return;
      }

      setError(null);
      setVerificationLOading(false);
      showSuccessMessage("link sent successfully!");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setVerificationLOading(false)
    }
  };

  return (
    <div className="basic_profile_container">
      <p>edit profile</p>
      <div className="profile_edit_box">
        <form action="" onSubmit={handeSubmit}>
          <div className=" flex  flex-col items-center justify-center md:py-8 py-5 gap-2 ">
            <div
              className="relative  w-32 h-32 self-center p-2 cursor-pointer shadow-md overflow-hidden rounded-full"
              onClick={() => refEl.current.click()}
            >
              <input
                type="file"
                accept="image/*"
                ref={refEl}
                hidden
                onChange={hanldeImageFileChange}
              />

              <img
                src={imageFileUrl || (user && user.profileImage)}
                alt="user"
                className={`rounded-full w-full h-full object-cover  border-[lightgray] `}
              />
            </div>
            {imageFileUploading && (
              <div className="user_profile_uploading_progress">
                <div className="relative h-3 bg-gray-200 rounded-lg">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg"
                    style={{ width: `${imageFileUploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-center  text-sm text-gray-500">
                  {imageFileUploadProgress}% complete
                </p>
              </div>
            )}
            {imageFileUploadError && <p>{imageFileUploadError}</p>}
          </div>
          <div className=" flex   items-center gap-6 flex-wrap">
            <div className=" flex sm:flex-row flex-col gap-3 sm:gap-2 items-start sm:items-center flex-grow ">
              <label
                htmlFor=""
                className="  font-serif capitalize font-semibold md:text-xl text-sm "
              >
                first Name:
              </label>
              <input
                type="text"
                id="firstName"
                defaultValue={user && user.firstName}
                onChange={handleChangeInput}
                className="focus:ring-0   focus:border-black  px-6  py-5 font-roboto capitalize text-sm md:text-xl rounded-sm w-full  sm:w-auto md:w-3/5"
              />
            </div>
            <div className=" flex sm:flex-row flex-col gap-3 sm:gap-2 items-start sm:items-center flex-grow ">
              <label
                htmlFor=""
                className="  font-serif capitalize font-semibold md:text-xl text-sm "
              >
                last Name:
              </label>
              <input
                type="text"
                id="lastName"
                defaultValue={user && user.lastName}
                onChange={handleChangeInput}
                className="focus:ring-0   focus:border-black px-6 py-5 font-roboto capitalize text-sm md:text-xl rounded-sm w-full  sm:w-auto md:w-3/5"
              />
            </div>
            <div className=" flex sm:flex-row flex-col gap-3 sm:gap-2 items-start sm:items-center flex-grow ">
              <label
                htmlFor=""
                className="  font-serif capitalize font-semibold md:text-xl text-sm "
              >
                mobile:
              </label>
              <input
                type="number"
                id="phoneNumber"
                defaultValue={user && user.phoneNumber}
                onChange={handleChangeInput}
                className=" focus:ring-0   focus:border-black  appearance-none px-6 py-5 font-roboto capitalize text-sm md:text-xl rounded-sm w-full  sm:w-auto md:w-3/5"
              />
            </div>
          </div>
          <div className="  ">
            <div className=" mt-8 flex sm:flex-row flex-col gap-2 sm:items-center">
              <label
                htmlFor=""
                className="  font-serif capitalize font-semibold md:text-xl text-sm "
              >
                email:
              </label>
              <div className="w-full  flex justify-between ">
                <input
                  type="email"
                  defaultValue={user && user.email}
                  id="email"
                  onChange={handleChangeInput}
                  className=" flex-grow sm:basis-1/5 basis-full md:basis-1/5  focus:ring-0   focus:border-black   px-6 py-5 font-roboto  lowercase text-sm md:text-xl  rounded-sm"
                />
                <div className=" w-4 h-4 flex-grow flex  items-start mt-3 ">
                  {user && user.isEmailVerified ? (
                    <div onMouseEnter={handleHover} onMouseLeave={handleHover}>
                      <CheckCircle
                        style={{ color: "green", cursor: "pointer" }}
                        onClick={handleHover}
                      />
                    </div>
                  ) : (
                    <div
                      onMouseEnter={handleHover}
                      onMouseLeave={handleHover}
                      onClick={handleHover}
                    >
                      <Warning style={{ color: "red", cursor: "pointer" }} />
                    </div>
                  )}
                  {isHovered && (
                    <p className="bg-black text-white text-xs capitalize font-mono font-medium px-3 rounded-sm py-2">
                      {user && user.isEmailVerified
                        ? "Email verified"
                        : "Email not verified"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {!user?.isEmailVerified && (
            <div className=" sm:px-20 mt-4">
              <div
                onClick={handleEmailVerification}
                className=" cursor-pointer font-roboto underline text-sm sm:text-xl  capitalize text-gray-500 flex items-center gap-3 "
              >
                {verificatioLoading ? (
                  <>
                    <Spinner
                      color="failure"
                      aria-label="Failure spinner example"
                    />{" "}
                    sending link...
                  </>
                ) : (
                  "sent link to verify email"
                )}
              </div>
            </div>
          )}
          <div className="edit_btn">
            <button
              type="submit"
              disabled={imageFileUploading}
              className=" disabled:cursor-wait "
            >
              {loading ? (
                <>
                  <Spinner
                    color="success"
                    aria-label="Failure spinner example"
                  />{" "}
                  saving...
                </>
              ) : (
                "save"
              )}
            </button>
          </div>
        </form>

        <div>
          {error && (
            <Alert
              color="failure"
              onDismiss={() => setError(null)}
              className=" sm:px-4 sm:text-1xl font-raleway  sm:w-1/2 sm:my-3 sm:mx-auto"
            >
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default BasicProfilePage;
