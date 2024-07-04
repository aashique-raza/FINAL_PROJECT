import React, { useState, useEffect } from "react";

import "../../styles/Pg.css";

import {
  rentAmountOptions,
  roomAmenities,
  pgSelectOptions,
  roomDetailsOptions,
  pgRules,
} from "../../utils";

import Input from "../Input";
import { API_URL } from "../../configue";
import CheckBoxInput from "../CheckBoxInput";
import SelectTag from "../SelectTag";
import TextArea from "../TextArea";
import LocalityDetails from "../LocalityDetails";
import PgAmenities from "../PgAmenities";
import UploadPhotos from "../UploadPhotos";
import { Alert, Spinner } from "flowbite-react";
import { formErrorHandler } from "../../formError";
import { getTokenFromLocalStorage } from "../../token";
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

function PgEditComp({ editData }) {
  const [formData, setFormData] = useState({
    roomFacilities: [],
    rentAmount: 0,
    depositAmount: 0,

    roomSharing: "",
    kitchen: "",
    balcony: "",
    availableFor: "",
    placeAvaibility: "",
    foodAvaibility: "",
    doorClosingTime: "",
    foodType: "",
    pgRules: [],
    pgOrHostelName: "",
    description: "",
    state: "",
    city: "",
    localAddress: "",
    laundary: "",
    roomCleaning: "",
    warden: "",
    ameinites: [],
  });

  const [photos, setPhotos] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <main className="pg-container">
      <form action="">
        <section className="pg-section-1">
          <div className="pg-section-heading mb-5">
            <h1>Living Space Details: </h1>
            <p>Delve into Comfort, Your Living Space Unraveled!</p>
          </div>

          <div className="room-basic-details bg-white py-3 px-2 md:px-4 lg:px-6 rounded-md">
            {roomDetailsOptions?.map((data, index) => (
              <EditSelectComp
                key={index}
                id={data.id}
                name={data.id}
                optionName={data.optionName}
                optionValues={data.optionValues}
                formData={formData}
                setFormData={setFormData}
              ></EditSelectComp>
            ))}

            {rentAmountOptions?.map((amountOpt, index) => (
              <EditInputComp
                key={index}
                label={amountOpt.label}
                type="number"
                placeholder={amountOpt.placeholder}
                id={amountOpt.id}
                formData={formData}
                setFormData={setFormData}
              />
            ))}
          </div>
          <p className="  font-raleway sm:text-xl text-sm text-red-500   capitalize font-bold">
            {formData?.depositAmount < formData?.rentAmount &&
              "deosit amount can not be less than rent amount"}
          </p>
          <div className="room-details-3 bg-white py-3 px-2 md:px-4 lg:px-6">
            <h3 className="text-xl md:text-2xl  font-bold text-red-500 font-roboto tracking-tighter capitalize">
              room facillities:
            </h3>
            <div className="amenities-wrapper">
              {roomAmenities.map((ament, index) => (
                <CheckBoxInput
                  key={index}
                  label={ament.name}
                  htmlFor={ament.name}
                  type="checkbox"
                  id={ament.name}
                  setFormData={setFormData}
                />
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
            {pgSelectOptions.slice(0, 4).map((data, index) => (
              <EditSelectComp
                key={index}
                id={data.id}
                name={data.id}
                optionName={data.optionName}
                optionValues={data.optionValues}
                formData={formData}
                setFormData={setFormData}
              ></EditSelectComp>
            ))}

            {formData.foodAvaibility === "true" &&
              pgSelectOptions
                .slice(4)
                .map((data, index) => (
                  <EditSelectComp
                    key={index}
                    id={data.id}
                    name={data.id}
                    optionName={data.optionName}
                    optionValues={data.optionValues}
                    formData={formData}
                    setFormData={setFormData}
                  ></EditSelectComp>
                ))}

            <EditInputComp
              id="pgOrHostelName"
              label="pg/hostel name"
              type="text"
              name="pg-name"
              placeholder="ex-royal pg..."
              setFormData={setFormData}
              formData={formData}
              value={formData.pgOrHostelName}
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
                      // onChange={handleAmenitiesCheckBox}
                      // checked={editFormData.availableAmenities?.includes(tenetOption.label)}
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
              ></textarea>
            </div>
          </div>
        </section>
        <section className="pg-section-3">
          <LocalityDetails formData={formData} setFormData={setFormData} />
        </section>
        <section className="pg-section-4">
          <div className="pg-section-heading">
            <h1>Amenities: </h1>
            <p>Provide additional details about your place</p>
          </div>
          <PgAmenities formData={formData} setFormData={setFormData} />
        </section>
        <section className="pg-section-5">
          <div className="pg-section-heading">
            <h1>upload your pg pictures: </h1>
            <UploadPhotos setPhotos={setPhotos} photos={photos} />
          </div>
        </section>
        {error && (
          <div className=" w-full flex justify-center items-center">
            <Alert
              className=" w-full sm:w-1/2 md:w-1/3 text-xl"
              color="failure"
              onDismiss={() => dispatch(pgListingClearError())}
            >
              {error}
            </Alert>
          </div>
        )}
        <div className="submit_button">
          <button type="submit">
            {loading ? (
              <>
                <Spinner color="failure" aria-label="Failure spinner example" />{" "}
                listing...
              </>
            ) : (
              "create listing"
            )}
          </button>
        </div>
      </form>
    </main>
  );
}

export default PgEditComp;

{
  /* <EditSelectComp
                    key={index}
                    id={data.id}
                    name={data.id}
                    optionName={data.optionName}
                    optionValues={data.optionValues}
                    formData={editFormData}
                    setFormData={setEditFormData}
                    defaultValue= {editFormData[data.id] || data.defaultValue }
                  ></EditSelectComp> */
}
