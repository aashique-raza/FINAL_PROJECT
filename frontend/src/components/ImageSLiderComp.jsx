import React from "react";
import { Carousel } from "flowbite-react";

function ImageSLiderComp({ imagesUrl }) {
  // console.log(imagesUrl)
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
    <Carousel>
      {imagesUrl && imagesUrl.length > 0 ? 
        imagesUrl.map((url, index) => (
          <img key={index} src={url} alt="img" />
        )) : (
        <>
          <img
            src="https://images.pexels.com/photos/932095/pexels-photo-932095.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="..."
          />
          <img
            src="https://images.pexels.com/photos/2459/stairs-home-loft-lifestyle.jpg?auto=compress&cs=tinysrgb&w=600"
            alt="..."
          />
          <img
            src="https://images.pexels.com/photos/3965513/pexels-photo-3965513.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="..."
          />
          <img
            src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="..."
          />
        </>
      )}
    </Carousel>
  </div>
  );
}

export default ImageSLiderComp;
