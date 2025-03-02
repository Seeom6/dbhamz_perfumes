import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import { useSignup } from "../utils/Api/AuthenticationEndPoint";
import logo from "/assets/logo.png";
import CustomSingleValue from "../components/CustomFlag";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { countries } from "../utils/data";

const Signup = () => {
  const navigation = useNavigate();
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
        toast.success("مرحبا بك بعالم الاناقة");
        navigation("/");
      },
      onError: () => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="w-full flex justify-center items-center bg-[#FAFBFF]">
      <div className="max-w-[800px] w-full px-2.5 flex flex-col items-center justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        <img className="w-2/5" src={logo} alt="" />
        <form className="w-full flex flex-col gap-4" onSubmit={formSubmitted}>
          <p className="text-2xl font-bold">إنشاء حساب جديد</p>

          {/* First Name Input */}
          <div>
            <p>الأسم الاول</p>
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
            <p>الأسم الثاني</p>
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
            <p>الرقم</p>
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
                        className="flex md:py-1 w-full justify-around hover:bg-blue-300 cursor-pointer text-extraSmall md:text-medium rounded-r-lg border-l-transparent"
                      >
                        {<CustomSingleValue data={country.flag} />}
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
            <p>كلمة المرور</p>
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
            <p>تأكيد كلمة المرور</p>
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
              {isPending ? <Loading width="24" height="24" /> : "تسجيل الدخول"}
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
            <Link to="/login" className="text-blue-500 hover:underline">
              تسجيل الدخول
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
