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

function BasicProfilePage() {
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const [imageFile, setImageFile] = useState(null);

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const refEl = useRef();

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
      setSaveButton(true);
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
        console.log(error)

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

  return (
    <div className="basic_profile_container">
      <p>edit profile</p>
      <div className="profile_edit_box">
        <form action="">
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
                src={imageFileUrl || user.profileImage}
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
                defaultValue={user.firstName}
                onChange={handleChangeInput}
              />
            </div>
            <div className="edit_input_wrapper">
              <label htmlFor="">last Name:</label>
              <input
                type="text"
                id="lastName"
                defaultValue={user.lastName}
                onChange={handleChangeInput}
              />
            </div>
            <div className="edit_input_wrapper">
              <label htmlFor="">mobile:</label>
              <input
                type="number"
                id="mobile"
                defaultValue={user.phoneNumber}
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
                defaultValue={user.email}
                className=" font-raleway"
                id="email"
                onChange={handleChangeInput}
              />

              <div className=" w-3 h-3  email_verified email border-2 border-gray-200 bg-slate-200 flex items-center justify-center px-2 cursor-pointer ">
                {user.isEmailVerified ? (
                  <CheckCircle style={{ color: "green" }} />
                ) : (
                  <Warning style={{ color: "red" }} className="" />
                )}
                <p className="show bg-black text-white text-xs capitalize font-mono font-medium px-3 rounded-sm py-2">
                  {user.isEmailVerified
                    ? "email verified"
                    : " Email not verified"}
                </p>
              </div>
            </div>
          </div>
          <div className="edit_btn">
            <button type="submit" disabled={imageFileUploading} >save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BasicProfilePage;
