import React, { useRef, useState } from "react";
import UploadImage from "../../components/dashboardComponents/UploadImage";
import AddProductFrom from "../../components/dashboardComponents/AddProductFrom";
import Loading from "./../../components/Loading";
import { useCreateProduct } from "../../utils/Api/ApiEndPoint";
import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";

const AddProduct = () => {
  const formRef = useRef();
  const [resetUpload, setResetUpload] = useState(false);
  const [isLike, setIsLike] = useState(false); 

  const [productData, setProductData] = useState({
    name: "",
    englishName: "",
    description: "",
    quantity: 0,
    sold: 20,
    price: 0,
    priceAfterDiscount: 0,
    imageCover: null,
    images: [],
    packageSize: [],
    brand: "",
    isLike: false, 
  });

  const sendData = (product) => {
    const Form = new FormData();
    Form.append("name", product?.name);
    Form.append("englishName", product?.englishName);
    Form.append("description", product?.description);
    Form.append("sold", product?.sold);
    Form.append("price", product?.price);
    Form.append("quantity", product?.quantity);
    Form.append("priceAfterDiscount", product?.priceAfterDiscount);
    Form.append("imageCover", product?.imageCover);
    Form.append("isLike", product?.isLike); // Append isLike to FormData

    // Append each image individually
    product?.images.forEach((img) => {
      Form.append("images", img);
    });

    // Append each package size individually
    if (product?.packageSize && Array.isArray(product.packageSize)) {
      product.packageSize.forEach((size) => {
        Form.append("packageSize", size);
      });
    }

    Form.append("brand", product?.brand);
    return Form;
  };

  const { mutate: createProduct, isPending } = useCreateProduct();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = sendData(productData);
    createProduct(formData, {
      onSuccess: () => {
        formRef.current.reset();
        setResetUpload(true);
        setIsLike(false); 
      },
    });
  };

  const handleLike = (e) => {
    e.preventDefault();
    console.log(isLike)
    setIsLike((prev) => !prev); // Toggle isLike state
    setProductData((prevData) => ({
      ...prevData,
      isLike: !prevData.isLike, // Update isLike in productData
    }));
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-full w-full flex flex-col p-6 bg-white shadow-third rounded-xl"
    >
      <p className="font-bold text-2xl ">إضافة منتج</p>
      <div className="w-full flex relative justify-center items-center mb-5">
        <UploadImage setProductData={setProductData} reset={resetUpload} />
      </div>
      <div className="max-w-[1260px]">
        <AddProductFrom setProductData={setProductData} />
      </div>
      <div className="w-full flex mt-2.5 gap-4">
        <button
          type="button"
          className="text-2xl"
          onClick={handleLike} // Fixed onClick handler
        >
          {isLike ? <FaCheckCircle className="text-dashboard"/> : <FaRegCheckCircle />}
        </button>
        <p>هذا المنتج مميز</p>
      </div>

      <div className="w-full flex justify-center mt-5">
        <button className="w-72 h-14 text-large bg-dashboard rounded-lg text-white font-bold">
          {isPending ? <Loading width="24" height="24" /> : "حفظ"}
        </button>
      </div>
    </form>
  );
};

export default AddProduct;