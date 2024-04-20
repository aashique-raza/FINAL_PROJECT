import {
  FaCouch,
  FaTv,
  FaBed,
  FaFire,
  FaSnowflake,
  FaBath,
  FaFan,
  FaRegLightbulb,
  FaLock,
  FaDeskpro,
  FaWifi,
} from "react-icons/fa";

export const sharingOptions = [
  { label: "select", value: "" },
  { label: "single", value: "single" },
  { label: "double", value: "double" },
  { label: "three", value: "three" },
  { label: "four", value: "four" },
];

export const kitchenOptions = [
  {
    label: "select",
    value: "",
  },
  { label: "with kitchen", value: "yes kitchen" },
  { label: "without kitchen", value: "no kitchen" },
];

export const balconyOptions = [
  { label: "select", value: "" },
  { label: "yes", value: "yes" },
  { label: "no", value: "no" },
];

export const rentAmountOptions = [
  { label: "expected rentAmount on per person", placeholder: "00.00",id:'rentAmount' },
  { label: "deposit amount  on per person", placeholder: "00.00",id:'depositAmount' },
];

export const roomAmenities = [
  { name: "cupboard",  },
  { name: "ac"},
  { name: "attached bathroom" },
  { name: "fan"  },
  { name: "TV" },
  { name: "bedding"  },
  { name: "geyser ",  },
  { name: "room heater"},
  { name: "study table" },
  { name: "WiFi" },
  { name: "locker"},
];
