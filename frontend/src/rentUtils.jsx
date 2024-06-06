// Material UI Icons
import ElevatorIcon from "@mui/icons-material/Elevator";
import WifiIcon from "@mui/icons-material/Wifi";
import PoolIcon from "@mui/icons-material/Pool";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import HouseIcon from "@mui/icons-material/House";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import FireExtinguisherIcon from "@mui/icons-material/FireExtinguisher";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ParkIcon from "@mui/icons-material/Park";
import WavesIcon from "@mui/icons-material/Waves"; // Rain water harvesting
import PowerIcon from "@mui/icons-material/Power";
import LocalParkingOutlinedIcon from "@mui/icons-material/LocalParkingOutlined"; // Visitor parking
// If any icon is not found in Material UI, we'll use React Icons
// import {  GiHomeGarage, GiParkingGarage, GiPlayground, GiSafetyPin } from 'react-icons/gi';
// import { BiWater } from 'react-icons/bi';

import {
  FaUsers,
  FaUserFriends,
  FaMale,
  FaFemale,
  FaBuilding,
  FaSuitcase,
} from "react-icons/fa";
import { MdPeople } from "react-icons/md"; // Material UI se koi suitable icon nahi mila

export const roomDetailsOptions = [
  {
    optionName: "apartment Type: ",
    id: "apartment_type",

    optionValues: [
      { label: "select", value: "" },
      { label: "independent house/villa", value: "independentHouse" },
      { label: "gated community villa", value: "gatedVilla" },
      { label: "apartment", value: "apartment" },
    ],
  },
  {
    optionName: "BHK type: ",
    id: "bhk_type",
    optionValues: [
      {
        label: "select",
        value: "",
      },
      { label: "1 RK", value: "1rk" },
      { label: "1 BHK", value: "1bhk" },
      { label: "2 BHK", value: "2bhk" },
      { label: "3 BHK", value: "3bhkk" },
      { label: "4 BHK", value: "4bhk" },
      { label: "4+ BHK", value: "4bhk+" },
    ],
  },
  {
    optionName: "propertyAge: ",
    id: "propertyAge",
    optionValues: [
      { label: "select", value: "" },
      { label: "less than one year", value: "lessOneYear" },
      { label: "1 to 3 year", value: "above1Year" },
      { label: "3 to 5 year", value: "above3Year" },
      { label: "5 to 10 year", value: "above5Year" },
      { label: "above 10 year", value: "above10Year" },
    ],
  },
  {
    optionName: "facing: ",
    id: "facing",
    optionValues: [
      { label: "select", value: "" },
      { label: "west", value: "west" },
      { label: "east", value: "east" },
      { label: "north", value: "north" },
      { label: "south", value: "south" },
      { label: "don't know ", value: "none" },
    ],
  },
  {
    optionName: "floor: ",
    id: "floor",
    optionValues: [
      { label: "select", value: "" },
      { label: "ground", value: 0 },
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
      { label: 5, value: 5 },
      { label: 6, value: 6 },
      { label: 7, value: 7 },
      { label: 8, value: 8 },
      { label: 9, value: 9 },
      { label: 10, value: 10 },
      { label: 11, value: 11 },
    ],
  },
  {
    optionName: "totalFloor: ",
    id: "totalFloor",
    optionValues: [
      { label: "select", value: "" },
      { label: "only ground", value: 0 },
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
      { label: 5, value: 5 },
      { label: 6, value: 6 },
      { label: 7, value: 7 },
      { label: 8, value: 8 },
      { label: 9, value: 9 },
      { label: 10, value: 10 },
      { label: 11, value: 11 },
    ],
  },
];

export const preferedTenats = [
  { label: "Family", value: "family", icon: <FaUsers /> },
  { label: "Anyone", value: "anyone", icon: <MdPeople /> },
  { label: "Bachelor (Male)", value: "bachelor male", icon: <FaMale /> },
  { label: "Bachelor (Female)", value: "bachelor female", icon: <FaFemale /> },
  { label: "Company", value: "company", icon: <FaBuilding /> },
  { label: "Office", value: "office", icon: <FaSuitcase /> },
  // { label: 'Couple', value: 'couple', icon: FaUserCouple }
];

export const propertyAvailableFor = [
  { label: "only rent", value: "rent" },
  { label: "only lease", value: "lease" },
];

export const monthlyMaintenance = [
  { label: "select", value: "" },
  { label: "maintenance extra", value: "extraMaintenance" },
  { label: "maintenance included", value: "includedMaintenance" },
];

export const parking = [
  { label: "select", value: "" },
  { label: "car parking", value: "car" },
  { label: "bike parking", value: "bike" },
  { label: "both parking", value: "both" },
  { label: "none", value: "none" },
];

export const furnishing = [
  { label: "select", value: "" },
  { label: "furnished", value: "full furnished" },
  { label: "unfurnished", value: "furnishedNone" },
  { label: " semi furnished", value: "semifurnished" },
];

export const electricity = [
  { label: "select", value: "" },
  { label: "electricity included", value: "included" },
  { label: "electricity extra", value: "notIncluded" },
];

export const waterSupply = [
  { label: "select", value: "" },
  { label: "corporation", value: "corporation" },
  { label: "borewell", value: "borewell" },
  { label: "both", value: "both" },
];

// Array of objects containing labels and corresponding icon components
export const roomAmenitiesList = [
  { label: "Lift", icon: <ElevatorIcon /> },
  { label: "Wifi", icon: <WifiIcon /> },
  { label: "Swimming Pool", icon: <PoolIcon /> },
  { label: "AC", icon: <AcUnitIcon /> },
  { label: "Club House", icon: <HouseIcon /> },
  { label: "Children Play Area", icon: <ChildFriendlyIcon /> },
  { label: "Fire Safety", icon: <FireExtinguisherIcon /> },
  { label: "Parking", icon: <LocalParkingIcon /> },
  { label: "Gym", icon: <FitnessCenterIcon /> },
  { label: "Sports Area", icon: <SportsBaseballIcon /> },
  { label: "Gas Pipeline", icon: <LocalGasStationIcon /> },
  { label: "Park", icon: <ParkIcon /> },
  { label: "Rain Water Harvesting", icon: <WavesIcon /> },
  { label: "Power Backup", icon: <PowerIcon /> },
  { label: "Visitor Parking", icon: <LocalParkingOutlinedIcon /> },
];

export const bhkTypes = [
  {label:'select BHK type',value:""},
  { label: "1 RK", value: "1rk" },
  { label: "1 BHK", value: "1bhk" },
  { label: "2 BHK", value: "2bhk" },
  { label: "3 BHK", value: "3bhkk" },
  { label: "4 BHK", value: "4bhk" },
  { label: "4+ BHK", value: "4bhk+" },
];


export const roomAmenitiesitems = [
  { label: "Lift", icon: <ElevatorIcon  /> },
  { label: "Wifi", icon: <WifiIcon /> },
  { label: "Swimming Pool", icon: <PoolIcon /> },
  { label: "AC", icon: <AcUnitIcon /> },
  { label: "Club House", icon: <HouseIcon /> },
  { label: "Children Play Area", icon: <ChildFriendlyIcon /> },
  { label: "Fire Safety", icon: <FireExtinguisherIcon /> },
  { label: "Parking", icon: <LocalParkingIcon /> },
  { label: "Gym", icon: <FitnessCenterIcon /> },
  { label: "Sports Area", icon: <SportsBaseballIcon /> },
  { label: "Gas Pipeline", icon: <LocalGasStationIcon /> },
  { label: "Park", icon: <ParkIcon /> },
  { label: "Rain Water Harvesting", icon: <WavesIcon /> },
  { label: "Power Backup", icon: <PowerIcon /> },
  { label: "Visitor Parking", icon: <LocalParkingOutlinedIcon /> },
];


// for edit page 
export const roomDetailsOptionsEdit = [
  {
    optionName: "apartment Type: ",
    id: "apartmentType",

    optionValues: [
      { label: "select", value: "" },
      { label: "independent house/villa", value: "independentHouse" },
      { label: "gated community villa", value: "gatedVilla" },
      { label: "apartment", value: "apartment" },
    ],
  },
  {
    optionName: "BHK type: ",
    id: "bhkType",
    optionValues: [
      {
        label: "select",
        value: "",
      },
      { label: "1 RK", value: "1rk" },
      { label: "1 BHK", value: "1bhk" },
      { label: "2 BHK", value: "2bhk" },
      { label: "3 BHK", value: "3bhkk" },
      { label: "4 BHK", value: "4bhk" },
      { label: "4+ BHK", value: "4bhk+" },
    ],
  },
  {
    optionName: "propertyAge: ",
    id: "propertyAge",
    optionValues: [
      { label: "select", value: "" },
      { label: "less than one year", value: "lessOneYear" },
      { label: "1 to 3 year", value: "above1Year" },
      { label: "3 to 5 year", value: "above3Year" },
      { label: "5 to 10 year", value: "above5Year" },
      { label: "above 10 year", value: "above10Year" },
    ],
  },
  {
    optionName: "facing: ",
    id: "facing",
    optionValues: [
      { label: "select", value: "" },
      { label: "west", value: "west" },
      { label: "east", value: "east" },
      { label: "north", value: "north" },
      { label: "south", value: "south" },
      { label: "don't know ", value: "none" },
    ],
  },
  {
    optionName: "floor: ",
    id: "floor",
    optionValues: [
      { label: "select", value: "" },
      { label: "ground", value: 0 },
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
      { label: 5, value: 5 },
      { label: 6, value: 6 },
      { label: 7, value: 7 },
      { label: 8, value: 8 },
      { label: 9, value: 9 },
      { label: 10, value: 10 },
      { label: 11, value: 11 },
    ],
  },
  {
    optionName: "totalFloor: ",
    id: "totalFloor",
    optionValues: [
      { label: "select", value: "" },
      { label: "only ground", value: 0 },
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
      { label: 5, value: 5 },
      { label: 6, value: 6 },
      { label: 7, value: 7 },
      { label: 8, value: 8 },
      { label: 9, value: 9 },
      { label: 10, value: 10 },
      { label: 11, value: 11 },
    ],
  },
];