import React from "react";
import "../styles/Rent.css";
import SelectINput from "../components/SelectINput";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  apartMentType,
  BHKType,
  propertyAge,
  facing,
  floor,
  totalFloor,
} from "../rentUtils";
import TextInput from "../components/TextInput";

function RentPage() {
  return (
    <main className=" rent_container lg:px-28">
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
                <SelectINput optionItems={totalFloor} />
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
    </main>
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
