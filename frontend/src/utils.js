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
  {
    label: "expected rent on per person",
    placeholder: "00.00",
    id: "rentAmount",
  },
  {
    label: "deposit amount  on per person",
    placeholder: "00.00",
    id: "depositAmount",
  },
];

export const roomAmenities = [
  { name: "cupboard" },
  { name: "ac" },
  { name: "attached bathroom" },
  { name: "fan" },
  { name: "TV" },
  { name: "bedding" },
  { name: "geyser " },
  { name: "room heater" },
  { name: "study table" },
  { name: "WiFi" },
  { name: "locker" },
];

// pg details

export const pgSelectOptions = [
  {
    optionName: "place is vailable for: ",
    id: "availableFor",

    optionValues: [
      { label: "select", value: "" },
      { label: "girls", value: "girls" },
      { label: "boys", value: "boys" },
      { label: "anyone", value: "anyone" },
    ],
  },
  {
    optionName: "place available from: ",
    id: "placeAvaibility",
    optionValues: [
      { label: "select", value: "" },
      { label: "immidiate", value: "immidiate" },
      { label: "within one week", value: "oneWeek" },
      { label: "within 15 days", value: "halfMonth" },
      { label: "within 30 days", value: "oneMonth" },
    ],
  },
  {
    optionName: "food/meals: ",
    id: "foodAvaibility",
    optionValues: [
      { label: "select", value: "" },
      { label: "with food/meal", value: "1" },
      { label: "without food/meal", value: "0" },
    ],
  },
  {
    optionName: "closing: ",
    id: "doorClosingTime",
    optionValues: [
      { label: "select", value: "" },
      { label: "24 hours open", value: "alwaysOpen" },
      { label: "9:pm closing time", value: "9pm" },
      { label: "10:pm closing time", value: "10pm" },
      { label: "11:pm closing time", value: "11pm" },
    ],
  },
  {
    optionName: "food type: ",
    id: "foodType",
    optionValues: [
      { label: "select", value: "" },
      { label: "veg food/meal", value: "veg-food" },
      { label: "non-veg food/meal ", value: "non-veg-food" },
      
    ],
  },
];

export const pgRules=['no girls entry','no smoking','no pets','guest allowed']

export const roomDetailsOptions = [
  {
    optionName: "sharing: ",
    id: "roomSharing",

    optionValues: [
      { label: "select", value: "" },
      { label: "single", value: "single" },
      { label: "double", value: "double" },
      { label: "three", value: "three" },
      { label: "four", value: "four" },
    ],
  },
  {
    optionName: "kitchen: ",
    id: "kitchen",
    optionValues: [
      {
        label: "select",
        value: "",
      },
      { label: "with kitchen", value: "yes kitchen" },
      { label: "without kitchen", value: "no kitchen" },
    ],
  },
  {
    optionName: "balcony: ",
    id: "balcony",
    optionValues: [
      { label: "select", value: "" },
      { label: "yes", value: "yes" },
      { label: "no", value: "no" },
    ],
  },
  
];

export const AllStates=[
  {label:'select',value:''},
  {label:'kolkata',value:'kolkata'},
  {label:'mumbai',value:'maharashtra'},
  {label:'delhi',value:'delhi'},
  {label:'assam',value:'assam'},
  {label:'Uttar pradesh',value:'up'},
  {label:'Goa',value:'goa'},

  {label:'Gujrat',value:'gujrat'},

]




export const cities=[
 {
  cityName:{delhi:[
    {label:'New Delhi',value:'newDelhi'},
    {label:'Gurgaon',value:'gurgaon'},
    {label:'Lajpat Nagar',value:'lajpatNagar'},
    {label:'Saket',value:'saket'},
    {label:'Malviya Nagar',value:'malviyaNagar'},
    
  ]}
 },
{
  cityName:{
    gujrat:[
      {label:"Ahmedabad",value:'ahmedabad'},
      {label:"Surat",value:'surat'},
      {label:"Vadodara",value:'vadodara'},
    ]
  }
},{
  cityName:{
    maharashtra:[
      {label:'Pune',value:'pune'},
      {label:'Nagpur',value:'nagpur'},
      {label:'Nashik',value:'nashik'},
    ]
  }
}
 
 
]



