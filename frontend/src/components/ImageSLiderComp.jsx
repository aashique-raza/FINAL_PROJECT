import React from "react";
import { Carousel } from "flowbite-react";

function ImageSliderComp({ imagesUrl }) {
  return (
    <div className="h-56 xl:h-80 2xl:h-96 border-red-800">
      <Carousel>
        {imagesUrl && imagesUrl.length > 0 ? 
          imagesUrl.map((url, index) => (
            <img key={index} src={url} alt={`img-${index}`} className="carousel-img" />
          )) : (
          <>
            <img
              src="https://images.pexels.com/photos/932095/pexels-photo-932095.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="img-1"
              className="carousel-img"
            />
            <img
              src="https://images.pexels.com/photos/2459/stairs-home-loft-lifestyle.jpg?auto=compress&cs=tinysrgb&w=600"
              alt="img-2"
              className="carousel-img"
            />
            <img
              src="https://images.pexels.com/photos/3965513/pexels-photo-3965513.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="img-3"
              className="carousel-img"
            />
            <img
              src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="img-4"
              className="carousel-img"
            />
          </>
        )}
      </Carousel>
    </div>
  );
}

export default ImageSliderComp;
