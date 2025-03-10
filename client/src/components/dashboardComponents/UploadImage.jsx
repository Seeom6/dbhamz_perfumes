import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import fileUpload from "/assets/file-upload.svg";
import heic2any from "heic2any"; // Library to convert HEIC to JPEG/PNG

const UploadImage = ({ setProductData, reset }) => {
  const [imagesUri, setImagesUri] = useState([]);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onDrop = useCallback(async (acceptedFiles) => {
    const processedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        // Convert HEIC/HEIF files to JPEG
        if (file.type === "image/heic" || file.type === "image/heif") {
          const convertedBlob = await heic2any({
            blob: file,
            toType: "image/jpeg", // Convert to JPEG
            quality: 0.8, // Adjust quality if needed
          });
          file = new File([convertedBlob], file.name.replace(/\.heic$/i, ".jpeg"), {
            type: "image/jpeg",
          });
        }
        return {
          file,
          preview: URL.createObjectURL(file),
        };
      })
    );

    setImages((prev) => [...prev, ...processedFiles.map((f) => f.file)]);
    setImagesUri((prev) => [...prev, ...processedFiles.map((f) => f.preview)]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/svg+xml": [],
      "image/heic": [], // Add HEIC support
      "image/heif": [], // Add HEIF support
    },
    onDrop,
  });

  useEffect(() => {
    setProductData((prev) => ({
      ...prev,
      imageCover: images[0],
      images: images,
    }));
  }, [images, setProductData]);

  useEffect(() => {
    if (reset) {
      setImagesUri([]);
      setImages([]);
      setCurrentIndex(0);
    }
  }, [reset]);

  return (
    <div className="w-full flex rounded-lg flex-col justify-center items-center">
      <div className="w-1/2 flex relative p-2 bg-fifed justify-center items-center rounded-bl-lg">
        <div {...getRootProps()} className="cursor-pointer">
          {imagesUri.length > 0 ? (
            <div className="h-64 w-60 relative overflow-hidden">
              <img
                src={imagesUri[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ) : (
            <div className="w-60 h-69 flex flex-col justify-center items-center">
              <img className="w-32 h-32 object-cover" src={fileUpload} alt="" />
              <p>أجلب و ارمي هنا</p>
            </div>
          )}
          <input {...getInputProps()} type="file" />
        </div>
      </div>
      {imagesUri.length > 0 && (
        <div className="flex flex-wrap justify-center mt-4">
          {imagesUri.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              onClick={() => setCurrentIndex(index)}
              className={`w-16 h-16 object-cover m-1 rounded-lg cursor-pointer ${
                index === currentIndex ? "border-2 border-blue-500" : ""
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImage;