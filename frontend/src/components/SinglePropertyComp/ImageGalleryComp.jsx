import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import Modal from 'react-modal';

// Set the app element
Modal.setAppElement('#root');
import "../../styles/SingleProperty.css";
import "react-image-gallery/styles/css/image-gallery.css";

function ImageGalleryComp({ images }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const firstThree = images.slice(0, 3); // Get the first three objects
  const remainingCount = images.length - firstThree.length; // Calculate the remaining count
  return (
    <div className="image-gallery-wrapper">
    <div className="image-preview image-preview-large">
      <div className="image-preview-header">
        <button className="photos-button" onClick={openModal}>Photos</button>
        <button className="favorite-button" onClick={toggleFavorite}>
          <span className={`heart-icon ${isFavorite ? 'favorite' : ''}`}>&#x2764;</span> Add to favorite
        </button>
      </div>
      <img src={firstThree[0]} alt="" />
    </div>
    <div className="image-preview">
      <img src={firstThree[1]} alt="" />
    </div>
    <div className="image-preview relative">
      <img src={firstThree[2]} alt="" />
      {remainingCount > 0 && (
        <div className="overlay cursor-pointer" onClick={openModal}>
          <span className="overlay-text sm:text-2xl text-xl">{`+${remainingCount} more`}</span>
        </div>
      )}
    </div>
    {/* Modal for Image Gallery */}
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
    >
      <button onClick={closeModal}>Close</button>
      <div
        style={{ maxWidth: "100%", maxHeight: "100%", overflow: "hidden" }}
      >
        <ImageGallery
          items={images.map(image => ({ original: image, originalClass: "modal-image" }))}
          showPlayButton={false} // Optional: Hide play button
          showThumbnails={false} // Optional: Hide thumbnail navigation
        />
      </div>
    </Modal>
  </div>
  );
}

export default ImageGalleryComp;
