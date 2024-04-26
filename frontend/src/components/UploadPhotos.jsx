import React,{useState,useEffect} from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

function UploadPhotos() {
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      urls.push(url);
    }
    setPhotos(prevPhotos => [...prevPhotos, ...urls]);
  };

  
    const handleDeletePhoto = (index) => {
      const updatedPhotos = [...photos];
      updatedPhotos.splice(index, 1);
      setPhotos(updatedPhotos);
    };
  

  return (
    <div className="upload-photos-container">
      <section className="photos-section-1">
        <h1>
          <CameraAltIcon />
        </h1>
        <h3>Add photos to get 5X more responses.</h3>
        <p>90% tenants contact on properties with photos.</p>
        <div className="uplodImageButton">
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
          </Button>
        </div>
      </section>
      {photos && (
        <section className="photos-section-2">
          {photos.map((url, index) => (
            <div className="photos-wrapper relative" key={index}>
              <img
                src={url}
                alt={`url ${index}`}
              />
              <DeleteIcon className="deleteIcon absolute top-3 right-3" onClick={() => handleDeletePhoto(index)} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default UploadPhotos;
