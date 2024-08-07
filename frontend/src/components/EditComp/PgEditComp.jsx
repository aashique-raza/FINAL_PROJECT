import React, { useState, useEffect, useRef } from "react";
import "../../styles/Pg.css";
import {
  rentAmountOptions,
  roomAmenities,
  pgSelectOptions,
  roomDetailsOptions,
  pgRules,
} from "../../utils";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { API_URL } from "../../configue";
import CheckBoxInput from "../CheckBoxInput";
import LocalityDetails from "../LocalityDetails";
import { Alert, Spinner } from "flowbite-react";
import { getTokenFromLocalStorage,refreshAccessToken ,removeRefreshTokenFromLocalStorage,removeTokenFromLocalStorage} from "../../token";
import { clearStateOfUser } from "../../features/userProperty.slice";
import { logOutSuccess } from "../../features/user.slice";
import { useNavigate } from "react-router-dom";

// component import for edit purpose-------
import EditSelectComp from "./EditSelectComp/EditSelectComp";
import EditInputComp from "./EditInputComp";
import EditRadioInput from "./EditRadioInput";

// pg available amenities----
import {
  Tv,
  Fastfood,
  PowerSettingsNew,
  ArrowUpward,
} from "@mui/icons-material";
import TvIcon from "@mui/icons-material/Tv";
import FastfoodIcon from "@mui/icons-material/Fastfood";
const pgAvailableAmenities = [
  { label: "commonTv", value: "tv", icon: <TvIcon /> },
  { label: "mess", value: "mess", icon: <FastfoodIcon /> },

  { label: "power backup", value: "power", icon: <PowerSettingsNew /> },
  { label: "lift", value: "lift", icon: <ArrowUpward /> },
];

// update room details option function
const roomUpdated = (options, formData) => {
  return options.map((option) => {
    let defaultValue = formData[option.id];
    if (defaultValue === true) {
      defaultValue = "yes";
    } else if (defaultValue === false) {
      defaultValue = "no";
    }
    return {
      ...option,
      defaultValue: defaultValue !== undefined ? defaultValue : "",
    };
  });
};

// update pg option function
const pgUpdated = (options, formData) => {
  return options.map((option) => {
    let defaultValue = formData[option.id];
    if (defaultValue === 'true') {
      defaultValue = true;
    } else if (defaultValue === 'false') {
      defaultValue = false;
    }
    return {
      ...option,
      defaultValue: defaultValue ,
    };
  });
};

const rentOptionFunc = (options, formData) => {
  return options.map((option) => {
    let defaultValue = formData[option.id];
    return {
      ...option,
      defaultValue: defaultValue !== undefined ? defaultValue : "",
    };
  });
};

function PgEditComp({ editData, showSuccessMessage }) {
  // set initial state for edit form data-------------------------
  const [editFormData, setEditFormData] = useState({});
  const [updatedRoomOptions, setUpdatedRoomOptions] = useState([]);
  const [updatedPgOPtions, setUpdatedPgOPtions] = useState([]);
  const [updatedRentOptions, setUpdatedRentOptions] = useState([]);
  // console.log(editFormData);
  // console.log(updatedPgOPtions)
  useEffect(() => {
    setEditFormData(editData);
  }, [editData]);
  useEffect(() => {
    const newOptions = roomUpdated(roomDetailsOptions, editFormData);
    setUpdatedRoomOptions(newOptions);
    const updatedOptions = pgUpdated(pgSelectOptions, editFormData);
    setUpdatedPgOPtions(updatedOptions);
    const updatedRentOptions = rentOptionFunc(rentAmountOptions, editFormData);
    setUpdatedRentOptions(updatedRentOptions);
  }, [editFormData]);

  // console.log(updatedRentOptions);
  const dispatch=useDispatch()

  const { category, id } = useParams();
  // const navigate=useNavigate()
  const token = getTokenFromLocalStorage();
  const [state, setState] = useState("");
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  // images set--------------------
  const formRef = useRef(null);
  const [newPhotos, setNewPhotos] = useState([]);
  const [newImages, setNewImages] = useState([]);
  // console.log(newPhotos)
  const inputRef = useRef(null);
  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const filesArray = Array.from(event.target.files);
    setNewImages(filesArray);
    const newPhotos = filesArray.map((file) => URL.createObjectURL(file));
    setNewPhotos(newPhotos);
  };

  const handleDeletePhoto = (index) => {
    setEditFormData(
      {
        ...editFormData,
        images : editFormData.images?.filter((_, i) => i !== index)
      }
      );
  };
  const handleDeleteNewPhotos = (index) => {
    console.log('index ',index)
    setNewPhotos((prevPhotos) => prevPhotos.filter((_, i) => index !== i));
  };


  // room amenity handle changes
  const handleRoomAmenity = (event) => {
    const { id, checked } = event.target;
    let updatedAmenities;

    if (checked) {
      updatedAmenities = [...editFormData.roomFacilities, id];
    } else {
      updatedAmenities = editFormData.roomFacilities.filter(
        (amenity) => amenity !== id
      );
    }

    setEditFormData((prevState) => ({
      ...prevState,
      roomFacilities: updatedAmenities,
    }));
  };

  const handlePgRulesChange = (event) => {
    const { id, checked } = event.target;
    let updatedPgRules;
    if (checked) {
      updatedPgRules = [...editFormData.pgRules, id];
    } else {
      updatedPgRules = editFormData.pgRules.filter((amenity) => amenity !== id);
    }

    setEditFormData((prevState) => ({
      ...prevState,
      pgRules: updatedPgRules,
    }));
  };

  const handlePgAvaibaleAmenities=(event)=>{
    const { id, checked } = event.target;
    let updatedPgAvailableAmenities;
    if (checked) {
      updatedPgAvailableAmenities = [...editFormData.ameinites
        , id];
    } else {
      updatedPgAvailableAmenities = editFormData.ameinites
      .filter((amenity) => amenity !== id);
    }

    setEditFormData((prevState) => ({
      ...prevState,
      ameinites: updatedPgAvailableAmenities,
    }));
  };


  // submit details after edited
  const handleSubmit=async(e)=>{
    e.preventDefault()

    const formData = new FormData();

    if(editFormData.rentAmount>editFormData.depositAmount){
      return setError('deposit amount can not be less than rent amount')
    }
  

const formDataEntries = {
  availableFor: editFormData.availableFor,
  balcony: editFormData.balcony,
  depositAmount: editFormData.depositAmount,
  description: editFormData.description,
  doorClosingTime: editFormData.doorClosingTime,
  foodAvaibility: editFormData.foodAvaibility,
  foodType: editFormData.foodType,
  kitchen: editFormData.kitchen,
  laundary: editFormData.laundary,
  city: editFormData.location.city,
  localAddress: editFormData.location.localAddress,
  state: editFormData.location.state,
  pgOrHostelName: editFormData.pgOrHostelName,
  placeAvaibility: editFormData.placeAvaibility,
  rentAmount: editFormData.rentAmount,
  roomCleaning: editFormData.roomCleaning,
  roomSharing: editFormData.roomSharing,
  warden: editFormData.warden,
  
};


// Append simple key-value pairs
Object.entries(formDataEntries).forEach(([key, value]) => {
  formData.append(key, value);
});

// Append arrays
(editFormData.ameinites
  || []).forEach(amenity => {
  formData.append("pgAmenities", amenity);
});

(editFormData.pgRules || []).forEach(rule => {
  formData.append("rulesForPg", rule);
});

(editFormData.roomFacilities|| []).forEach(facility=>{
  formData.append('facility',facility)
})

// Append photos
newImages.forEach(photo => {
  formData.append("editPhotos", photo);
});

// apend images
editFormData.images.forEach(img=>{
  formData.append('images',img)
})


    try {
      setError(null)
      setLoading(true)

      const resp=await fetch(`${API_URL}/pg/propertyUpdate/${id}/${user._id}`,{
        method:'PUT',
        headers: {
          // "Content-Type": "multipart/form-data"// JSON format mein Content-Type header set kiya gaya hai
          "Authorization": `Bearer ${token}`
        },
        credentials:'include',
        body:formData
      })

      // console.log(resp)

      const data=await resp.json()
      
      // console.log('data',data)

      if(!resp.ok){
        if (resp.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            // Retry original request with new token
            await handleSubmitWithToken(newToken,formData);
          } else {
            removeTokenFromLocalStorage();
            removeRefreshTokenFromLocalStorage();
            dispatch(logOutSuccess());
      
            dispatch(clearStateOfUser());
            alert("session expired! please login");
          }

          return;
        }
        setError(data.message)
        setLoading(false)
        return
      }
      
      setError(null)
      setLoading(false)
      showSuccessMessage('changes saved')
      
      navigate(`/property/${category}/${data.property._id}`)
      
      
      
    } catch (error) {
      console.log('updating failed',error)
      setError('updating failed please try again later')
      setLoading(false)
    }
  }

  const handleSubmitWithToken=async(newToken,formData)=>{
    try {
      setError(null)
      setLoading(true)

      const resp=await fetch(`${API_URL}/pg/propertyUpdate/${id}/${user._id}`,{
        method:'PUT',
        headers: {
          // "Content-Type": "multipart/form-data"// JSON format mein Content-Type header set kiya gaya hai
          "Authorization": `Bearer ${newToken}`
        },
        credentials:'include',
        body:formData
      })

      // console.log(resp)

      const data=await resp.json()
      
      // console.log('data',data)

      if(!resp.ok){
        
        setError(data.message)
        setLoading(false)
        return
      }
      
      setError(null)
      setLoading(false)
      showSuccessMessage('changes saved')
      
      navigate(`/property/${category}/${data.property._id}`)
      
      
      
    } catch (error) {
      console.log('updating failed',error)
      setError('updating failed please try again later')
      setLoading(false)
    }

  }


  return (
    <main className="pg-container">
      <form action="" onSubmit={handleSubmit}>
        <section className="pg-section-1">
          <div className="pg-section-heading mb-5">
            <h1>Living Space Details: </h1>
            <p>Delve into Comfort, Your Living Space Unraveled!</p>
          </div>

          <div className="room-basic-details bg-white py-3 px-2 md:px-4 lg:px-6 rounded-md">
            {updatedRoomOptions.map((data, index) => (
              <EditSelectComp
                key={index}
                id={data.id}
                name={data.id}
                optionName={data.optionName}
                optionValues={data.optionValues}
                defaultValue={data.defaultValue}
                formData={editFormData}
                setFormData={setEditFormData}
              />
            ))}

<p className=" py-3  font-raleway sm:text-xl text-sm text-red-500   capitalize font-bold">
            {editFormData?.rentAmount > editFormData?.depositAmount &&
              "deosit amount can not be less than rent amount"}
          </p>
            {updatedRentOptions?.map((amountOpt, index) => (
              <EditInputComp
                key={index}
                label={amountOpt.label}
                type="number"
                placeholder={amountOpt.placeholder}
                id={amountOpt.id}
                defaultValue={amountOpt.defaultValue}
                formData={editFormData}
                setFormData={setEditFormData}
              />
            ))}
          </div>
         
          <div className="room-details-3 bg-white py-3 px-2 md:px-4 md:py-4 lg:px-6 lg:py-6 ">
            <h3 className="text-xl md:text-2xl  pt-10 font-bold text-red-500 font-roboto tracking-tighter capitalize">
              room facillities:
            </h3>
            <div className="amenities-wrapper">
              {roomAmenities.map((amenity, index) => (
                <div className="room-amenities" key={index}>
                  <label htmlFor={amenity.name}>{amenity.name}: </label>
                  <input
                    type="checkbox"
                    id={amenity.name}
                    className="focus:ring-0"
                    checked={editFormData?.roomFacilities?.includes(
                      amenity.name
                    )}
                    onChange={handleRoomAmenity}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pg-section-2">
          <div className="pg-section-heading">
            <h1> Showcase Your PG Details!: </h1>
            <p>Seamless Listing Experience</p>
          </div>
          <div className="pg-select-category  bg-white py-5 px-2 md:px-4 lg:px-6 rounded-md">
            {updatedPgOPtions.slice(0, 4).map((data, index) => (
              <EditSelectComp
                key={index}
                id={data.id}
                name={data.id}
                optionName={data.optionName}
                optionValues={data.optionValues}
                defaultValue={data.defaultValue}
                formData={editFormData}
                setFormData={setEditFormData}
              ></EditSelectComp>
            ))}

            {editFormData.foodAvaibility === true || editFormData.foodAvaibility==='true'&&
              updatedPgOPtions
                .slice(4)
                .map((data, index) => (
                  <EditSelectComp
                    key={index}
                    id={data.id}
                    name={data.id}
                    optionName={data.optionName}
                    optionValues={data.optionValues}
                    defaultValue={data.defaultValue}
                    formData={editFormData}
                    setFormData={setEditFormData}
                    food={true}
                  ></EditSelectComp>
                ))}

            <EditInputComp
              id="pgOrHostelName"
              label="pg/hostel name"
              type="text"
              name="pg-name"
              placeholder="ex-royal pg..."
              defaultValue={editFormData.pgOrHostelName}
              formData={editFormData}
              setFormData={setEditFormData}
            />
            <div className="py-4  lg:py-5 xl:py-7 px-3  lg:px-7 xl:px-10 bg-white ">
              <p className=" py-8 border-t-2 font-roboto font-bold capitalize text-xl md:text-2xl  ">
                seletct pg rules
              </p>
              <div className=" flex items-center justify-start gap-7 md:gap-7 xl:gap-12  flex-wrap text-xl ">
                {pgRules?.map((item, index) => (
                  <div
                    key={index}
                    className=" flex items-center justify-start gap-2 "
                  >
                    <input
                      className=" focus:border-none w-5 h-5   focus:outline-none focus:ring-0 checked:text-green-500 "
                      type="checkbox"
                      name={item}
                      id={item}
                      onChange={handlePgRulesChange}
                      checked={editFormData.pgRules?.includes(item)}
                    />
                    <label
                      htmlFor={item}
                      className=" flex items-center gap-1 capitalize  text-xl md:text-2xl  font-bold text-gray-500"
                    >
                      {" "}
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="textArea ">
              <label htmlFor="" className="">
                pg description
              </label>
              <textarea
                name={"description"}
                id={"description"}
                placeholder={"describe your pg..."}
                defaultValue={editFormData.description}
                value={editFormData.description}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>
        </section>
        <section className="pg-section-3">
          <LocalityDetails
            formData={editFormData}
            setFormData={setEditFormData}
          />
        </section>
        <section className="pg-section-4">
          <div className="pg-section-heading">
            <h1>Amenities: </h1>
            <p>Provide additional details about your place</p>
          </div>
          <div className=" bg-white py-3 px-2 md:px-4 lg:px-6 rounded-md">
            <h3 className=" capitalize text-xl text-gray-700 font-semibold font-roboto tracking-wider sm:text-2xl lg:text-3xl">
              availabel service
            </h3>
            <div className=" flex flex-wrap mt-5 items-center justify-between">
              <div className="">
                <p className="capitalize text-sm font-extrabold font-sans text-black sm:text-xl">
                  laundary
                </p>
                <div className="flex gap-4 items-center mt-3">
                  <EditRadioInput
                    name="laundary"
                    id="laundary-yes"
                    label="yes"
                    value="yes"
                    isChecked={editFormData.laundary === true}
                    formData={editFormData}
                    setFormData={setEditFormData}
                    pgedit={true}
                  />
                  <EditRadioInput
                    name="laundary"
                    id="laundary-no"
                    label="no"
                    value="no"
                    isChecked={editFormData.laundary === false}
                    formData={editFormData}
                    setFormData={setEditFormData}
                    pgedit={true}
                  />
                </div>
              </div>

              <div className="">
                <p className="capitalize text-sm font-extrabold font-sans text-black sm:text-xl">
                  room cleaning
                </p>
                <div className="flex gap-4 items-center mt-3">
                  <EditRadioInput
                    name="roomCleaning"
                    id="roomCleaning-yes"
                    label="yes"
                    value="yes"
                    isChecked={editFormData.roomCleaning === true}
                    formData={editFormData}
                    setFormData={setEditFormData}
                    pgedit={true}
                  />
                  <EditRadioInput
                    name="roomCleaning"
                    id="roomCleaning-no"
                    label="no"
                    value="no"
                    isChecked={editFormData.roomCleaning === false}
                    formData={editFormData}
                    setFormData={setEditFormData}
                    pgedit={true}
                  />
                </div>
              </div>

              <div className="">
                <p className="capitalize text-sm font-extrabold font-sans text-black sm:text-xl">
                  warden facility
                </p>
                <div className="flex gap-4 items-center mt-3">
                  <EditRadioInput
                    name="warden"
                    id="warden-yes"
                    label="yes"
                    value="yes"
                    isChecked={editFormData.warden === true}
                    formData={editFormData}
                    setFormData={setEditFormData}
                    pgedit={true}
                  />
                  <EditRadioInput
                    name="warden"
                    id="warden-no"
                    label="no"
                    value="no"
                    isChecked={editFormData.warden === false}
                    formData={editFormData}
                    setFormData={setEditFormData}
                    pgedit={true}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <p className=" py-8 border-t-2 font-roboto font-bold capitalize text-xl md:text-2xl  ">
                select the available amenities
              </p>
              <div className=" flex items-center justify-start gap-7 md:gap-7 xl:gap-12  flex-wrap text-xl ">
                {pgAvailableAmenities?.map((ameniti, index) => (
                  <div
                    key={index}
                    className=" flex items-center justify-start gap-1 "
                  >
                    <input
                      className=" focus:border-none w-5 h-5   focus:outline-none focus:ring-0 checked:text-green-500 "
                      type="checkbox"
                      name={ameniti.label}
                      id={ameniti.value}
                      onChange={handlePgAvaibaleAmenities}
                      checked={editFormData.ameinites
                        ?.includes(ameniti.value)}
                    />
                    <label
                      htmlFor={ameniti.label}
                      className=" flex items-center gap-1  text-xl md:text-2xl  font-bold text-gray-500"
                    >
                      {" "}
                      <span>{ameniti.icon}</span> {ameniti.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className=" rent_section_5 mt-4 md:mt-8 lg:mt-14">
          <div className="mb-5">
            <h2 className="text-xl md:text-2xl xl:text-3xl  font-roboto font-bold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-500">
              edit or upload new photos your property
            </h2>
          </div>
          <div className=" bg-white py-7 rounded-md">
            {editFormData.images?.length > 0 && (
                  <div className="existing-photos-wrapper mt-4 md:mt-8 lg:mt-14">
                    {editFormData.images.map((url, index) => (
                      <div
                        className="w-full sm:w-1/3 min-h-64 rounded-sm relative"
                        key={index}
                      >
                        <img
                          src={url}
                          alt={`photo-${index}`}
                          className="w-full h-full object-cover"
                        />
                        <MdDelete
                          className="cursor-pointer p-1 w-12 h-12 top-2 right-3 text-red-500 text-xl sm:text-2xl font-bold border-2 absolute bg-white shadow-2xl rounded-full flex justify-center items-center"
                          onClick={() => handleDeletePhoto(index)}
                        />
                      </div>
                    ))}
                  </div>
                )}
            {newPhotos?.length > 0 && (
              <div className="existing-photos-wrapper mt-4 md:mt-8 lg:mt-14">
                {newPhotos.map((url, index) => (
                  <div
                    className="w-full sm:w-1/3 min-h-64 rounded-sm relative"
                    key={index}
                  >
                    <img
                      src={url}
                      alt={`photo-${index}`}
                      className="w-full h-full object-cover"
                    />
                    <MdDelete
                      className="cursor-pointer p-1 w-12 h-12 top-2 right-3 text-red-500 text-xl sm:text-2xl font-bold border-2 absolute bg-white shadow-2xl rounded-full flex justify-center items-center"
                      onClick={() => handleDeleteNewPhotos(index)}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="  w-full mt-10 xl:mt-14 flex items-center justify-center">
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                ref={inputRef}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="px-6 py-3 text-xl lg:px-8 lg:py-5 lg:text-2xl  cursor-pointer hover:bg-teal-900 transition-all ease-in-out duration-100 bg-teal-800 capitalize font-raleway outline-none border-none text-white font-semibold"
                onClick={handleButtonClick}
              >
                add new photos
              </button>
            </div>
          </div>
        </section>
        {error && (
          <div className=" w-full flex justify-center items-center">
            <Alert
              className=" w-full sm:w-1/2 md:w-1/3 text-xl"
              color="failure"
              onDismiss={() => setError(null)}
            >
              {error}
            </Alert>
          </div>
        )}
        <div className=" flex  justify-center items-center  bg-white py-5 mt-10 rounded-md w-full ">
          <button
            type="submit"
            className=" py-4 capitalize text-xl lg:text-2xl font-raleway font-semibold min-w-52 w-full  max-w-96 border-none outline-none focus:border-none focus:outline-none focus:ring-0 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all duration-1000 ease-in-out"
          >
            {loading ? (
              <>
                <Spinner color="failure" aria-label="Failure spinner example" />{" "}
                saving..
              </>
            ) : (
              "save changes"
            )}
          </button>
        </div>
      </form>
    </main>
  );

  }

  


export default PgEditComp;

{
  /* {roomAmenities.map((ament, index) => (
                <CheckBoxInput
                  key={index}
                  label={ament.name}
                  htmlFor={ament.name}
                  type="checkbox"
                  id={ament.name}
                />
              ))} */
}

{
  /* <EditRadioInput
                    name="propertyAvailableForrr"
                    id="propertyAvailableForLease"
                    label="Lease"
                    value="lease"
                    isChecked={editFormData.propertyAvailableFor === "lease"}
                    formData={editFormData}
                    setFormData={setEditFormData}
                  /> */
}
