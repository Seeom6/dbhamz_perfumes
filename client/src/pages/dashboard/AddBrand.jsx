import React, { useState } from "react";
import UploadBrandImage from "./../../components/dashboardComponents/UploadBrandImage";
import { useCreateBrand } from "../../utils/Api/BrandEndPoint";
import Loading from "../../components/Loading";

const AddBrand = () => {
  const [brandData, setBrandData] = useState({
    name: "",
    image: '',
  });
  const getData = (e) => {
    setBrandData((prevState) => ({
      ...prevState,
      [e?.target.name]: e?.target.value,
    }));
  };
  const { mutate: createBrand, isPending } = useCreateBrand();

  const applyFormData = (data)=>{
    const form = new FormData()
    form.append("name" , data?.name)
    form.append("image" , data?.image)

    return form
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = await applyFormData(brandData);
    createBrand(formData);
  };
  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="max-w-full w-full flex flex-col p-6 bg-white shadow-third rounded-xl"
      >
        <p className="font-bold text-2xl ">إضافة علامة تجارية</p>
        <div className="w-full flex relative justify-center items-center mb-5">
          <UploadBrandImage setBrandData={setBrandData} />
        </div>
        <div className="max-w-[1260px]">
          <div>
            <label htmlFor="">اسم العلامة التجارية</label>
            <input
              type="text"
              className="inputClass shadow-input"
              onChange={(e) => getData(e)}
              name="name"
              id=""
            />
          </div>
        </div>
        <div className="w-full flex justify-center mt-5">
          <button className="w-72 h-14 text-large bg-dashboard rounded-lg text-white font-bold">
            {isPending ? <Loading width="24" height="24" /> : "حفظ"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBrand;
