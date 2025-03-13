import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CustomSingleValue from "../CustomFlag";
import { countries } from "../../utils/data";
import Loading from "../Loading";
import { useLogin } from "../../utils/Api/AuthenticationEndPoint";
import { useQueryClient } from "@tanstack/react-query";

const LoginPopup = ({ onClose, onLoginSuccess, onSignupClick }) => {


  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+966", // Default country code (Saudi Arabia)
    value: "SA", // Default flag (Saudi Arabia)
  });
  const [form, setForm] = useState({
    phone: "",
    password: "",
    code: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

  const handleCountryChange = (country) => {
    setSelectedCountry(country); // Update selected country
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const changing = (event) => {
    let value = event.target.value;

    // Remove leading 0 if the input is for the phone number
    if (event.target.name === "phone" && value.startsWith("0")) {
      value = value.slice(1);
    }

    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: value,
    }));
  };

  const { mutate: LoginMutation, isPending } = useLogin();

  const formSubmitted = (e) => {
    e.preventDefault();

    // Ensure the phone number does not start with 0
    const formattedPhone = form.phone.startsWith("0")
      ? form.phone.slice(1)
      : form.phone;

    // Prepare the data to be sent
    const data = {
      ...form,
      phone: formattedPhone,
      code: selectedCountry.code,
    };

    LoginMutation(data, {
      onSuccess: () => {
        toast.success("مرحباً بك مجدداً");
        onLoginSuccess(); // Trigger the onLoginSuccess callback
        onClose(); // Close the popup after successful login
        navigate("/order");
      },
      onError: (err) => {
        console.log(err)
        toast.error("تسجيل دخول خاطئ");
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(54,52,52,0.7)] bg-opacity-50 z-[100]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">تسجيل الدخول</h2>
          <form className="w-full flex flex-col gap-4" onSubmit={formSubmitted}>
            <div>
              <p className="w-full flex flex-col items-start">الرقم</p>
              <div className="flex items-center gap-2 " dir="ltr">
                {/* Country Code Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg bg-white"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
                  >
                    <CustomSingleValue data={selectedCountry.value} />
                    <span>{selectedCountry.code}</span>
                  </button>
                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                      {countries.map((country) => (
                        <button
                          onClick={() => handleCountryChange(country)}
                          key={country.code}
                          className="flex md:py-1 w-full justify-around hover:bg-blue-300 cursor-pointer text-small md:text-medium border-b border-l-transparent"
                        >
                          {<CustomSingleValue data={country.value} />}
                          <p className="font-bold">{country.code}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Phone Input */}
                <input
                  onChange={(e) => changing(e)}
                  className="inputClass shadow-input flex-1"
                  name="phone"
                  type="tel" // Ensures only numbers are accepted
                  placeholder="123456789"
                  inputMode="numeric"
                  pattern="[0-9]*" // Ensures numeric keyboard on mobile devices
                />
              </div>
            </div>

            <div>
              <p className="w-full flex flex-col items-start">كلمة المرور</p>
              <input
                onChange={(e) => changing(e)}
                className="inputClass shadow-input"
                name="password"
                type="password" // Use type="password" for security
              />
            </div>
            <div className="w-full flex justify-center">
              <button type="submit" className="button-class bg-dashboard w-3/4">
                {isPending ? (
                  <Loading width="24" height="24" />
                ) : (
                  "تسجيل الدخول"
                )}
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                نسيت كلمة المرور؟
              </Link>
              <button
                onClick={onSignupClick}
                className="text-blue-500 hover:underline"
              >
                إنشاء حساب جديد
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
