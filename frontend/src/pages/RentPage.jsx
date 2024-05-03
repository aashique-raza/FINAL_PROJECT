import React from "react";
import "../styles/Rent.css";
import SelectINput from "../components/SelectINput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AttachMoney } from "@mui/icons-material";

import {
  apartMentType,
  BHKType,
  propertyAge,
  facing,
  floor,
  totalFloor,
  propertyAvailableFor,
  preferedTenats,
} from "../rentUtils";
import TextInput from "../components/TextInput";
import CustomRadio from "../components/CustomRadio";
import RadioInput from "../components/RadioInput";
import CustomCheckbox from "../components/CustomCheckbox";
import NumberInput from "../components/NumberInput";
// import { IndianRupeeIcon } from "@mui/icons-material";

function RentPage() {
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
          <p>expected rent (permonth) </p>
          <div>
          <NumberInput
        icon={<AttachMoney />}
        iconColor="black"
        padding="10px"
        textTransform="uppercase"
        fontSize="1.5rem"
      />
          </div>
        </div>
      </section>
    </div>
  );
}

export default RentPage;

{
  /* <FormControl sx={{ minWidth: 300, marginBottom: 2 }}>
        <InputLabel>Select 1</InputLabel>
        <Select defaultValue="">
          <MenuItem value="">None</MenuItem>
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
      </FormControl> */
}
