import React,{useState} from "react";
import ImageGallery from "react-image-gallery";
import Modal from "react-modal";
import "../../styles/SingleProperty.css";
import "react-image-gallery/styles/css/image-gallery.css";

function ImageGalleryComp({ images }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
  
    const remainingImages = images.slice(3);
  return (
    <>
      <div className="image-preview">
        {images.slice(0, 3).map((image, index) => (
          <img
            key={index}
            src={image.original}
            alt={`Property Image ${index + 1}`}
            style={{ width: "100%", height: "100%" }}
            onClick={() => {
              setSelectedImageIndex(index);
              openModal();
            }}
          />
        ))}
        {remainingImages.length > 0 && (
          <div className="remaining-images" onClick={openModal}>
            <span>+{remainingImages.length}</span>
          </div>
        )}
      </div>
      {modalIsOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img
              src={images[selectedImageIndex].original}
              alt={`Property Image ${selectedImageIndex + 1}`}
              className="modal-image"
            />
            {/* Add slider component here */}
            {/* <ImageGallery items={remainingImages} /> */}
          </div>
        </div>
      )}
    </>
  );
}

export default ImageGalleryComp;
