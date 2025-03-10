import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import fileUpload from "/assets/file-upload.svg";
import heic2any from "heic2any"; // Library to convert HEIC to JPEG/PNG

const UploadBrandImage = ({ setBrandData }) => {
  const [imageUri, setImageUri] = useState(""); // State to store the uploaded image URL
  const [imageFile, setImageFile] = useState(null); // State to store the uploaded image file

  const onDrop = useCallback(async (acceptedFiles) => {
    // Accept only the first file if multiple files are uploaded
    const file = acceptedFiles[0];
    if (file) {
      let convertedFile = file;

      // Check if the file is in HEIC format
      if (file.type === "image/heic" || file.type === "image/heif") {
        // Convert HEIC to JPEG using heic2any
        convertedFile = await heic2any({
          blob: file,
          toType: "image/jpeg", // Convert to JPEG
          quality: 0.8, // Adjust quality if needed
        });
      }

      const imageUrl = URL.createObjectURL(convertedFile);
      setImageUri(imageUrl); // Set the image URL
      setImageFile(convertedFile); // Set the converted image file
    }
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
    maxFiles: 1, // Allow only one file to be uploaded
  });

  // Update the product data when the image changes
  useEffect(() => {
    if (imageFile) {
      setBrandData({ image: imageFile });
    }
  }, [imageFile, setBrandData]);

  return (
    <div className="w-full flex rounded-lg flex-col justify-center items-center">
      <div className="w-1/2 flex relative p-2 bg-fifed justify-center items-center rounded-bl-lg">
        <div {...getRootProps()} className="">
          {imageUri ? (
            <div className="h-64 w-full relative overflow-hidden">
              <img
                src={imageUri}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center">
              <img className="w-full object-cover" src={fileUpload} alt="" />
              <p>أجلب و ارمي هنا</p>
            </div>
          )}

          <input
            {...getInputProps()}
            required
            type="file"
            accept="image/*"
            className="cursor-pointer absolute h-full outline-0 border-0 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadBrandImage;