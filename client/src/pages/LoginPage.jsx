import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import CustomSingleValue from "../components/CustomFlag";
import { countries } from "../utils/data";
import Loading from "./../components/Loading";
import { useLogin } from "../utils/Api/AuthenticationEndPoint";

const LoginPage = () => {
  const navigation = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+966", // Default country code (Saudi Arabia)
    flag: "SA", // Default flag (Saudi Arabia)
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
    const formattedPhone = form.phone.startsWith("0") ? form.phone.slice(1) : form.phone;

    // Prepare the data to be sent
    const data = {
      ...form,
      phone: formattedPhone,
      code: selectedCountry.code,
    };

    LoginMutation(data, {
      onSuccess: () => {
        toast.success("مرحباً بك مجدداً");
        navigation("/");
      },
      onError: () => {
        toast.error("تسجيل دخول خاطئ");
      },
    });
  };

  return (
    <div className="w-full flex justify-center items-center bg-[#FAFBFF]">
      <div className="max-w-[800px] w-full px-2.5 flex flex-col items-center justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        <img className="w-2/5" src={logo} alt="" />
        <form className="w-full flex flex-col gap-4" onSubmit={formSubmitted}>
          <p className="text-2xl font-bold">تسجيل الدخول</p>

          <div>
            <p>الرقم</p>
            <div className="flex items-center gap-2 " dir="ltr">
              {/* Country Code Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg bg-white"
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
                        className="flex md:py-1 w-full justify-around hover:bgblue-300 cursor-pointer text-extraSmall md:text-medium rounded-r-lg border-l-transparent"
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
                type="tel" // Ensures only numbers are accepted
                placeholder="123456789"
                inputMode="numeric"
                pattern="[0-9]*" // Ensures numeric keyboard on mobile devices
              />
            </div>
          </div>

          <div>
            <p>كلمة المرور</p>
            <input
              onChange={(e) => changing(e)}
              className="inputClass shadow-input"
              name="password"
              type="password" // Use type="password" for security
            />
          </div>
          <div className="w-full flex justify-center">
            <button type="submit" className="button-class bg-dashboard w-3/4">
              {isPending ? <Loading width="24" height="24" /> : "تسجيل الدخول"}
            </button>
          </div>
          <div className="flex justify-between mt-4">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              نسيت كلمة المرور؟
            </Link>
            <Link to="/signup" className="text-blue-500 hover:underline">
              إنشاء حساب جديد
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;