import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSignup } from "../../utils/Api/AuthenticationEndPoint";
import CustomSingleValue from "../CustomFlag";
import Loading from "../Loading";
import { toast } from "react-toastify";
import { countries } from "../../utils/data";
import { useQueryClient } from "@tanstack/react-query";

const SignupPopup = ({ onClose, onSignupSuccess, onLoginClick }) => {
  const param = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+966",
    flag: "SA",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isPending, setIsPending] = useState(false);

  const { mutate: SignUp } = useSignup();

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const changing = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!form.firstName.trim()) {
      newErrors.firstName = "الأسم الاول مطلوب";
      isValid = false;
    } else if (form.firstName.length < 3) {
      newErrors.firstName = "الأسم الاول يجب أن يكون 3 أحرف على الأقل";
      isValid = false;
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "الأسم الثاني مطلوب";
      isValid = false;
    } else if (form.lastName.length < 3) {
      newErrors.lastName = "الأسم الثاني يجب أن يكون 3 أحرف على الأقل";
      isValid = false;
    }

    if (!form.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = "كلمة المرور مطلوبة";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
      isValid = false;
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "كلمة المرور غير متطابقة";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const formSubmitted = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsPending(true);

    try {
      const cleanedPhoneNumber = form.phone.replace(/^0+/, "");
      const fullPhoneNumber = `${selectedCountry.code}${cleanedPhoneNumber}`;

      const dataToSend = {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: fullPhoneNumber,
        password: form.password,
      };

      await new Promise((resolve, reject) => {
        SignUp(dataToSend, {
          onSuccess: () => {
            queryClient.invalidateQueries(["getme"]);
            toast.success("مرحبا بك بعالم الاناقة");
            onSignupSuccess();
            onClose();
            resolve();
          },
          onError: (error) => {
            toast.error(error.message || "حدث خطأ أثناء التسجيل");
            reject(error);
          },
        });
      });
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(54,52,52,0.7)] bg-opacity-50 z-[100]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          disabled={isPending}
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
                onChange={changing}
                className={`inputClass shadow-input ${errors.firstName ? "border-red-500" : ""}`}
                name="firstName"
                type="text"
                placeholder="الأسم الاول"
                disabled={isPending}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm text-right">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name Input */}
            <div>
              <p className="w-full flex flex-col items-start">الأسم الثاني</p>
              <input
                onChange={changing}
                className={`inputClass shadow-input ${errors.lastName ? "border-red-500" : ""}`}
                name="lastName"
                type="text"
                placeholder="الأسم الثاني"
                disabled={isPending}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm text-right">{errors.lastName}</p>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <p className="w-full flex flex-col items-start">الرقم</p>
              <div className="flex items-center gap-2">
                {/* Country Code Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    className={`flex h-10 items-center gap-2 p-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-lg bg-white`}
                    onClick={() => !isPending && setIsDropdownOpen(!isDropdownOpen)}
                    disabled={isPending}
                  >
                    <CustomSingleValue data={selectedCountry.flag} />
                    <span>{selectedCountry.code}</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountryChange(country)}
                          className="flex md:py-1 w-full justify-around hover:bg-blue-300 cursor-pointer text-small md:text-medium border-b border-l-transparent"
                        >
                          <CustomSingleValue data={country.value} />
                          <p className="font-bold">{country.code}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Phone Input */}
                <input
                  onChange={changing}
                  className={`inputClass shadow-input flex-1 ${errors.phone ? "border-red-500" : ""}`}
                  name="phone"
                  type="number"
                  placeholder="123456789"
                  inputMode="numeric"
                  disabled={isPending}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm text-right">{errors.phone}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <p className="w-full flex flex-col items-start">كلمة المرور</p>
              <input
                onChange={changing}
                className={`inputClass shadow-input ${errors.password ? "border-red-500" : ""}`}
                name="password"
                type="password"
                placeholder="كلمة المرور"
                disabled={isPending}
              />
              {errors.password && (
                <p className="text-red-500 text-sm text-right">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <p className="w-full flex flex-col items-start">تأكيد كلمة المرور</p>
              <input
                onChange={changing}
                className={`inputClass shadow-input ${errors.confirmPassword ? "border-red-500" : ""}`}
                name="confirmPassword"
                type="password"
                placeholder="تأكيد كلمة المرور"
                disabled={isPending}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm text-right">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="w-full flex justify-center">
              <button
                type="submit"
                className={`button-class bg-dashboard w-3/4 ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={isPending}
              >
                {isPending ? <Loading width="24" height="24" /> : "إنشاء حساب"}
              </button>
            </div>

            {/* Forgot Password and Login Links */}
            <div className="flex justify-between mt-4">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
                onClick={(e) => isPending && e.preventDefault()}
              >
                نسيت كلمة المرور؟
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  !isPending && onLoginClick();
                }}
                className="text-blue-500 hover:underline"
                disabled={isPending}
              >
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