import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import fileUpload from "../../assets/file-upload.svg";

const UploadImage = ({ setProductData, reset }) => {
  const [imagesUri, setImagesUri] = useState([]);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    const files = acceptedFiles.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    });
    setImages((prev) => [...prev, ...files.map((f) => f.file)]);
    setImagesUri((prev) => [...prev, ...files.map((f) => f.preview)]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/svg+xml": [] },
    onDrop,
  });

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imagesUri.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? imagesUri.length - 1 : prev - 1));
  };

  useEffect(() => {
    setProductData((prev) => ({
      ...prev,
      imageCover: images[0],
      images: images,
    }));
  }, [images]);

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
          <input {...getInputProps()} required type="file" accept="image/*" />
        </div>
        {imagesUri.length > 0 && (
          <>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-[-25px] md:right-28 lg:right-4 transform -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-lg"
            >
              &lt;
            </button>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-[-25px] md:left-28 lg:left-4 transform -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-lg"
            >
              &gt;
            </button>
          </>
        )}
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