import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSignup } from "../../utils/Api/AuthenticationEndPoint";
import CustomSingleValue from "../CustomFlag";
import Loading from "../Loading";
import { toast } from "react-toastify";
import { countries } from "../../utils/data";
import { useQueryClient } from "@tanstack/react-query";

const SignupPopup = ({ onClose, onSignupSuccess , onLoginClick }) => {

  const param = useParams()
  const queryClient = useQueryClient()
    const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "", // Add confirmPassword field
  });
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+966", // Default country code (Saudi Arabia)
    flag: "SA", // Default flag (Saudi Arabia)
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const [passwordError, setPasswordError] = useState(""); // State to handle password mismatch error

  const handleCountryChange = (country) => {
    setSelectedCountry(country); // Update selected country
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const changing = (event) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const { mutate: SignUp, error, isPending } = useSignup();

  const formSubmitted = (e) => {
    e.preventDefault();

    // Check if password and confirmPassword match
    if (form.password !== form.confirmPassword) {
      setPasswordError("كلمة المرور غير متطابقة");
      return; // Stop form submission if passwords do not match
    }

    // Clear password error if passwords match
    setPasswordError("");

    // Remove leading zeros from the phone number
    const cleanedPhoneNumber = form.phone.replace(/^0+/, "");

    // Combine the country code with the cleaned phone number
    const fullPhoneNumber = `${selectedCountry.code}${cleanedPhoneNumber}`;

    // Prepare the data to be sent (exclude confirmPassword)
    const dataToSend = {
      firstName: form.firstName,
      lastName: form.lastName,
      phone: fullPhoneNumber,
      password: form.password,
    };

    SignUp(dataToSend, {
      onSuccess: () => {
        queryClient.invalidateQueries(["getme"])
        toast.success("مرحبا بك بعالم الاناقة");
        onSignupSuccess(); // Trigger the onSignupSuccess callback
        onClose(); // Close the popup after successful signup
        if(param === "/cart"){
          navigate("/cart");
        }
        navigate("/")
      },
      onError: () => {
        toast.error(error.message);
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
          <h2 className="text-xl font-semibold mb-4">إنشاء حساب جديد</h2>
          <form className="w-full flex flex-col gap-4" onSubmit={formSubmitted}>
            {/* First Name Input */}
            <div>
              <p className="w-full flex flex-col items-start">الأسم الاول</p>
              <input
                onChange={(e) => changing(e)}
                className="inputClass shadow-input"
                name="firstName"
                type="text"
                placeholder="الأسم الاول"
              />
            </div>

            {/* Last Name Input */}
            <div>
              <p className="w-full flex flex-col items-start">الأسم الثاني</p>
              <input
                onChange={(e) => changing(e)}
                className="inputClass shadow-input"
                name="lastName"
                type="text"
                placeholder="الأسم الثاني"
              />
            </div>

            {/* Phone Input */}
            <div>
              <p className="w-full flex flex-col items-start">الرقم</p>
              <div className="flex items-center gap-2">
                {/* Country Code Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    className="flex h-10 items-center gap-2 p-2 border border-gray-300 rounded-lg bg-white"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
                  >
                    <CustomSingleValue data={selectedCountry.flag} />
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
                  type="number"
                  placeholder="123456789"
                  inputMode="numeric"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <p className="w-full flex flex-col items-start">كلمة المرور</p>
              <input
                onChange={(e) => changing(e)}
                className="inputClass shadow-input"
                name="password"
                type="password"
                placeholder="كلمة المرور"
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <p className="w-full flex flex-col items-start">تأكيد كلمة المرور</p>
              <input
                onChange={(e) => changing(e)}
                className="inputClass shadow-input"
                name="confirmPassword"
                type="password"
                placeholder="تأكيد كلمة المرور"
              />
              {/* Display error if passwords do not match */}
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <div className="w-full flex justify-center">
              <button type="submit" className="button-class bg-dashboard w-3/4">
                {isPending ? <Loading width="24" height="24" /> : "إنشاء حساب"}
              </button>
            </div>

            {/* Forgot Password and Login Links */}
            <div className="flex justify-between mt-4">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                نسيت كلمة المرور؟
              </Link>
              <button onClick={onLoginClick} className="text-blue-500 hover:underline">
                تسجيل الدخول
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPopup;