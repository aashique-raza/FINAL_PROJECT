import React, { useState } from "react";
import "../styles/Rent.css";
import SelectINput from "../components/SelectINput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AttachMoney } from "@mui/icons-material";
import LocalityDetails from "../components/LocalityDetails";

import {
  apartMentType,
  BHKType,
  propertyAge,
  facing,
  floor,
  totalFloor,
  propertyAvailableFor,
  preferedTenats,
  monthlyMaintenance,
  furnishing,
  parking,
} from "../rentUtils";
import TextInput from "../components/TextInput";
import CustomRadio from "../components/CustomRadio";
import RadioInput from "../components/RadioInput";
import CustomCheckbox from "../components/CustomCheckbox";
import NumberInput from "../components/NumberInput";
import CalenderInput from "../components/CalenderInput";
import CustomTextArea from "../components/CustomTextArea";
import { Textarea } from "flowbite-react";
// import { IndianRupeeIcon } from "@mui/icons-material";
import DescriptionInput from "../components/DescriptionInput";
import { AllStates, cities } from "../utils";

function RentPage() {
  const [state, setState] = useState("delhi");

  // Function to filter cities based on the current city
  function filterCitiesByCurrentCity(currentCity) {
    // Find the city object corresponding to the current city
    const cityObject = cities.find(
      (city) => Object.keys(city.cityName)[0] === currentCity.toLowerCase()
    );

    // If city object is found, return its cities array, otherwise return an empty array
    return cityObject ? Object.values(cityObject.cityName)[0] : [];
  }
  // console.log(formData.state)

  const filteredCities = filterCitiesByCurrentCity(state);

  return (
    <div className=" rent_container lg:px-28">
      <section className="rent_section_1">
        <div className="mb-5">
          <h2 className="text-xs md:text-xl font-raleway font-bold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-500">
            Property Details
          </h2>
        </div>
        <div className="flex flex-col gap-7">
          <div className=" flex flex-col md:flex-wrap md:gap-6 gap-2 md:flex-row  items-center ">
            <div className="flex w-full flex-col gap-2 md:w-80  md:min-w-72">
              <p className=" text-xs  font-raleway font-bold capitalize  inline-block">
                Apartment Type
              </p>
              <SelectINput optionItems={apartMentType} capitalize={true} />
            </div>
            <div className="flex w-full flex-col gap-2 md:w-80   md:min-w-72">
              <p className="text-xs  font-raleway font-bold capitalize  inline-block">
                BHK Type
              </p>
              <SelectINput optionItems={BHKType} />
            </div>
            <div className="flex w-full flex-col gap-2 md:w-80  md:min-w-72">
              <p className="text-xs  font-raleway font-bold capitalize  inline-block">
                Apartment Name
              </p>
              <TextInput capitalize={true} label="apartment name" />
            </div>
          </div>
          <div className=" flex flex-col md:flex-wrap md:gap-6 gap-2 md:flex-row items-center ">
            <div className="flex w-full flex-col gap-2 md:w-80  md:min-w-72">
              <p className=" text-xs  font-raleway font-bold capitalize  inline-block">
                Property Age
              </p>
              <SelectINput optionItems={propertyAge} />
            </div>
            <div className="flex w-full flex-col gap-2 md:w-80  md:min-w-72">
              <p className=" text-xs  font-raleway font-bold capitalize  inline-block">
                facing
              </p>
              <SelectINput optionItems={facing} />
            </div>
            <div className="flex w-full flex-col gap-2 md:w-80  md:min-w-72">
              <p className=" text-xs  font-raleway font-bold capitalize  inline-block">
                Built Up Area
              </p>
              <TextInput
                capitalize={true}
                label="built up arean in sqr feet."
              />
            </div>
          </div>
          <div className=" flex flex-col md:flex-wrap  gap-2 md:flex-row md:gap-6 items-center ">
            <div className="flex w-full flex-col gap-2 md:w-80  md:min-w-72">
              <p className=" text-xs  font-raleway font-bold capitalize  inline-block">
                total floor
              </p>
              <SelectINput
                optionItems={totalFloor}
                menuItemProps={{
                  capitalize: true,
                  fontSize: "14px",
                  color: "blue",
                  paadingY: "10px",
                }}
              />
            </div>
            <div className="flex w-full flex-col gap-2 md:w-80  md:min-w-72">
              <p className=" text-xs  font-raleway font-bold capitalize  inline-block">
                floor
              </p>
              <SelectINput optionItems={floor} />
            </div>
          </div>
        </div>
      </section>
      <section className="rent_section_2 mt-5 ">
        <div className="mb-5">
          <h2 className="text-xs md:text-xl font-raleway font-bold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-500">
            Provide rental details about your property
          </h2>
        </div>

        <div className=" flex  flex-wrap lg:flex-row flex-col lg:items-start lg:justify-start lg:gap-16 gap-4 items-start">
          <div className=" flex  flex-col gap-1  items-   lg:w-1/4">
            <p className=" font-raleway font-bold text-xs capitalize text-gray-950">
              property available for
            </p>
            <CustomRadio
              options={propertyAvailableFor}
              color="gray"
              font=" font-raleway"
              padding="0px"
              margin="0px"
              textTransform="capitalize"
              optionName={"place available for"}
              fontSize="14px"
            />
          </div>
          <div className=" flex  flex-col gap-1    prefered_tenats">
            <p className=" font-raleway font-bold text-xs capitalize text-gray-950">
              prefered tenats
            </p>
            <CustomCheckbox options={preferedTenats} />
          </div>
        </div>
        <div>
          <div className=" flex flex-col gap-4 items-start sm:flex-row sm:gap-4 md:gap-7 sm:items-center sm:my-4 ">
            <NumberInput
              label="expected rent"
              placeholder={"enter amount"}
              permonth={true}
            />
            <NumberInput
              label=" expected deposit "
              placeholder={"enter amount"}
              permonth={false}
            />
          </div>
          <div className=" flex sm:flex-row flex-col gap-4 sm:gap-3 md:gap-6 sm:items-center  my-4 py-2">
            <div className=" sm:w-1/2 w-full md:w-1/3 ">
              <p className=" text-xs  font-raleway font-bold capitalize  inline-block">
                monthly maintenance
              </p>
              <SelectINput optionItems={monthlyMaintenance} />
            </div>
            <NumberInput
              label={"maintenace amount"}
              placeholder={"enter amount"}
            />
          </div>
        </div>

        <div className=" flex flex-wrap calender_div lg:gap-5 sm:gap-3 md:gap-4 sm:items-center  ">
          <div className="flex w-full flex-col gap-2 md:w-80  md:min-w-72">
            <p className=" text-xs  font-raleway font-bold capitalize  inline-block">
              available from
            </p>
            <CalenderInput />
          </div>
          <div className="flex w-full flex-col gap-2 md:w-80  md:min-w-72">
            <p className=" text-xs  font-raleway font-bold capitalize  inline-block">
              furnishing
            </p>
            <SelectINput optionItems={furnishing} />
          </div>
          <div className="flex w-full flex-col gap-2 md:w-80  md:min-w-72">
            <p className=" text-xs  font-raleway font-bold capitalize  inline-block">
              parking
            </p>
            <SelectINput optionItems={parking} />
          </div>
        </div>

        <div>
          <DescriptionInput
            label={"description"}
            placeholder={"write few lines about your property"}
          />
        </div>
      </section>
      <section className="rent_section_3 my-5">
      <div className="mb-5">
          <h2 className="text-xs md:text-xl font-raleway font-bold capitalize px-4 py-6 border-b-2 border-gray-200 text-red-500">
            locality Details
          </h2>
        </div>
        <div className=" flex flex-col md:flex-wrap  gap-2 md:flex-row md:gap-6 items-center ">
          <div className="flex w-full flex-col gap-2 md:w-80  md:min-w-72">
            <p className=" text-xs  font-raleway font-bold capitalize  inline-block">
              state
            </p>
            <SelectINput
              className=" w-full"
              optionItems={AllStates}
              setState={setState}
            />
          </div>
          <div className="flex w-full flex-col gap-2 md:w-80  md:min-w-72">
            <p className=" text-xs  font-raleway font-bold capitalize  inline-block">
              city
            </p>
            <SelectINput optionItems={filteredCities} />
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 md:w-80  md:min-w-72 my-2">
              <p className=" text-xs  font-raleway font-bold capitalize  inline-block">
                loact/street address
              </p>
              <TextInput
                capitalize={true}
                label="hauz kahs gao...."
              />
            </div>
      </section>
    </div>
  );
}

export default RentPage;
