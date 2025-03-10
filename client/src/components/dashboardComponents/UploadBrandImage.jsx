import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import fileUpload from "/assets/file-upload.svg";

const UploadBrandImage = ({ setBrandData }) => {
  const [imageUri, setImageUri] = useState(""); // State to store the uploaded image URL
  const [imageFile, setImageFile] = useState(''); // State to store the uploaded image file

  const onDrop = useCallback((acceptedFiles) => {
    // Accept only the first file if multiple files are uploaded
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUri(imageUrl); // Set the image URL
      setImageFile(file); // Set the image file
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/svg+xml": [] },
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