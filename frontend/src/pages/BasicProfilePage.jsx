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
import { json } from "react-router-dom";
import { updateSucceFully } from "../features/user.slice";

function BasicProfilePage() {
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const [imageFile, setImageFile] = useState(null);

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const refEl = useRef();

  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
        });
      }
    );
  };

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

    try {
      setError(null);
      setloading(true);

      const resp = await fetch(`/api/user/update-account/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
        },
        body: JSON.stringify(formData),
      });
      const data = await resp.json();
      // console.log(data);

      if (!resp.ok) {
        // console.log(result)
        // console.log(data.message);
        setError(data.message);
        setloading(false);
        return;
      }
      setSuccess(data.msg);
      setError(null);
      setloading(false);
      dispatch(updateSucceFully(data.updatedUser));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEmailVerification = async () => {
    try {
      setError(null);
      setVerificationLOading(true);

      const resp = await fetch(
        `/api/user//send-verification-mail/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
          },
          body: JSON.stringify({ email: user.email }),
        }
      );

      const data = await resp.json();
      console.log(data);

      if (!resp.ok) {
        // console.log(result)
        // console.log(data.message);
        setError(data.message);
        setVerificationLOading(false);
        return;
      }

      setError(null);
      setVerificationLOading(false);
      setSuccess(data.msg);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="basic_profile_container">
      <p>edit profile</p>
      <div className="profile_edit_box">
        <form action="" onSubmit={handeSubmit}>
          <div className="user_profile_image ">
            <div
              className="relative  w-20 h-20 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
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
                className={`rounded-full w-full h-full object-cover border-4 border-[lightgray] `}
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
          <div className="  md:flex md:flex-wrap md:gap-6 user_profile_edit_inputs">
            <div className="edit_input_wrapper  ">
              <label htmlFor="">first Name:</label>
              <input
                type="text"
                id="firstName"
                defaultValue={user && user.firstName}
                onChange={handleChangeInput}
              />
            </div>
            <div className="edit_input_wrapper">
              <label htmlFor="">last Name:</label>
              <input
                type="text"
                id="lastName"
                defaultValue={user && user.lastName}
                onChange={handleChangeInput}
              />
            </div>
            <div className="edit_input_wrapper">
              <label htmlFor="">mobile:</label>
              <input
                type="number"
                id="phoneNumber"
                defaultValue={user && user.phoneNumber}
                className="appearance-none   "
                onChange={handleChangeInput}
              />
            </div>
            <div className=" email_input_wrapper ">
              <label
                htmlFor=""
                className=" font-raleway text-xs capitalize font-semibold"
              >
                email:
              </label>
              <input
                type="email"
                defaultValue={user && user.email}
                className=" font-raleway"
                id="email"
                onChange={handleChangeInput}
              />

              <div className=" w-3 h-3  email_verified email border-2 border-gray-200 bg-slate-200 flex items-center justify-center px-2 cursor-pointer ">
                 { user && user.isEmailVerified ? (
                  <CheckCircle style={{ color: "green" }} />
                ) : (
                  <Warning style={{ color: "red" }} className="" />
                )}
                <p className="show bg-black text-white text-xs capitalize font-mono font-medium px-3 rounded-sm py-2">
                  { user && user.isEmailVerified
                    ? "email verified"
                    : " Email not verified"}
                </p>
              </div>
            </div>
          </div>
          <div className="edit_btn">
            <button type="submit" disabled={imageFileUploading}>
              {loading ? (
                <Spinner color="failure" aria-label="Failure spinner example" />
              ) : (
                "save"
              )}
            </button>
          </div>
        </form>
        {!user.isEmailVerified && (
          <div className="verification_link">
            <button
              onClick={handleEmailVerification}
              className="email_verification_link font-raleway underline text-xs font-semibold capitalize text-red-500 "
            >
              sent link to verify email
              {verificatioLoading && (
                <p>
                  <Spinner
                    color="failure"
                    aria-label="Failure spinner example"
                  />
                </p>
              )}
            </button>
          </div>
        )}

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
    </div>
  );
}

export default BasicProfilePage;
