import React,{useEffect,useState} from 'react';
import { Table } from 'flowbite-react';
import { NavLink,Link } from 'react-router-dom';
import { getTokenFromLocalStorage,refreshAccessToken } from '../token';
import { API_URL } from '../configue';

function PropertyYouContacted() {
  // Example data, replace this with your actual data
  const data = [
    {
      serialNo: 1,
      propertyType: "Apartment",
      propertyName: "Luxury Apt",
      city: "New York",
      address: "123 Main St",
      contactDate: "2024-07-15",
      postedDate: "2024-07-01"
    },
    // Add more data as needed
  ];

  return (
    <div className="mt-20 p-4 w-full">
      <Table striped={true} responsive={true}>
        <Table.Head className=" font-bold text-xl md:text-2xl  font-roboto capitalize tracking-wider text-black">
          <Table.HeadCell>Serial No</Table.HeadCell>
          <Table.HeadCell>Property Type</Table.HeadCell>
          <Table.HeadCell>Property Name</Table.HeadCell>
          <Table.HeadCell>City</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Contact Date</Table.HeadCell>
          <Table.HeadCell>Posted Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className=' text-xl md:text-2xl  font-roboto capitalize tracking-wider  text-gray-600'>
          {data.map((item) => (
            <Table.Row key={item.serialNo}>
              <Table.Cell>{item.serialNo}</Table.Cell>
              <Table.Cell>{item.propertyType}</Table.Cell>
              <Table.Cell>
                <Link to="#" className=" text-red-500 hover:underline">
                  {item.propertyName}
                </Link>
              </Table.Cell>
              <Table.Cell>{item.city}</Table.Cell>
              <Table.Cell>{item.address}</Table.Cell>
              <Table.Cell>{item.contactDate}</Table.Cell>
              <Table.Cell>{item.postedDate}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default PropertyYouContacted;
