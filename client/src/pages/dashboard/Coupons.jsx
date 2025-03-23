import React, { useState } from "react";
import {
  useCreateCoupon,
  useGetCoupon,
  useDeleteCoupon,
} from "../../utils/Api/OrderEndPoint";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import CouponForm from "../../components/coupon/CouponForm";
import CouponList from "../../components/coupon/CouponList";
const Coupons = () => {
  const [couponCode, setCouponCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [error, setError] = useState("");
  const [userIdToGift, setUserIdToGift] = useState("");
  const [selectedGiftMethod, setSelectedGiftMethod] = useState(null);

  const couponOpt = ["percentage","delivery"];
  const queryClient = useQueryClient();

  const {
    data: coupons,
    isLoading,
    isError,
    error: getCouponError,
  } = useGetCoupon();
  const { mutate: createCoupon } = useCreateCoupon();
  const { mutate: deleteCoupon } = useDeleteCoupon();

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode || !discountPercentage || !expirationDate) {
      setError("Please fill in all fields.");
      return;
    }
    if (
      isNaN(discountPercentage) ||
      discountPercentage < 1 ||
      discountPercentage > 100
    ) {
      setError("Discount percentage must be a number between 1 and 100.");
      return;
    }

    const formData = {
      name: couponCode,
      discount: parseFloat(discountPercentage),
      expired: expirationDate,
      type: selectedGiftMethod ? selectedGiftMethod.value : null,
    };

    createCoupon(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["coupons"]);
        resetForm();
        toast.success("تم أنشاء الكوبون");
      },
      onError: (error) => {
        setError(error.message || "Failed to create coupon");
      },
    });
  };

  const handlePackageSizeChange = (selectedOption) => {
    setSelectedGiftMethod(selectedOption);
  };

  const handleDeleteCoupon = async (id) => {
    deleteCoupon(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["coupons"]);
        toast.success("تم حذف الكوبون بنجاح");
      },
      onError: (error) => {
        toast.error(error.message || "خطأ اثناء حذف الكوبون");
      },
    });
  };

  const resetForm = () => {
    setCouponCode("");
    setDiscountPercentage("");
    setExpirationDate("");
    setSelectedGiftMethod(null);
    setError("");
  };

  const couponOptions = couponOpt.map((size) => ({
    value: size,
    label: `${size}`,
  }));

  return (
    <div className="p-2 md:p-4 bg-gray-100 min-h-screen">
      <div className="w-full md:max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center"> اُنشاء الكوبون</h1>

        {/* Coupon Form */}
        <CouponForm
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          discountPercentage={discountPercentage}
          setDiscountPercentage={setDiscountPercentage}
          expirationDate={expirationDate}
          setExpirationDate={setExpirationDate}
          selectedGiftMethod={selectedGiftMethod}
          handlePackageSizeChange={handlePackageSizeChange}
          couponOptions={couponOptions}
          error={error}
          handleAddCoupon={handleAddCoupon}
        />

        {/* Coupon List */}
        <CouponList
          coupons={coupons}
          userIdToGift={userIdToGift}
          setUserIdToGift={setUserIdToGift}
          handleDeleteCoupon={handleDeleteCoupon}
        />
      </div>
    </div>
  );
};

export default Coupons;