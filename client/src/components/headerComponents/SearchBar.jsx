import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context/StatContext";
import LoginPopup from "../popup/LoginPopup";
import SignupPopup from "../popup/SignupPopup";
const SearchBar = () => {
  const navigation = useNavigate();
  const { userData, isLogin } = useContext(Context);


    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false); // State to control login popup visibility
    const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
    
  const handleLoginSuccess = () => {
    setIsLoginPopupOpen(false);
  };

  const handleSignupSuccess = () => {
    // Handle actions after successful signup (e.g., refresh cart data)
    console.log("User signed up successfully");
  };


const HandleLogin = ()=>{
  
  if (!isLogin) {

    setIsLoginPopupOpen(true)
    return (
      <div className="w-full">

      </div>
    );
  }

  if(isLogin){
    navigation('/profile')
  }
}



  return (
    <div className="w-full flex justify-center gap-2 items-center">
      <div>
        <CgProfile
          onClick={HandleLogin}
          className="text-[#DADADA] font-bold text-2xl  md:flex"
        />
      </div>
      <div>
        <div className="relative w-full group">
          <FaSearch className="absolute text-small md:text-sl text-[#DADADA]  group-hover:text-black left-3 top-[50%] translate-y-[-50%]" />
          <input
            placeholder="ابحث عن منتجك"
            type="text"
            className="w-[160px] sm:w-[288px] lg:w-[316px] outline-none border-2 border-[#DADADA] text-regular md:text-medium text-[#DADADA] h-[27px] md:h-[35px] pl-8 pr-3.5 py-1.5 rounded-[6px] focus:text-black
            focus:border-primary"
          />
        </div>
      </div>
      <div>
        <FaShoppingCart
          onClick={() => navigation("/cart")}
          className="text-[#DADADA] font-bold text-large md:text-sl"
        />
                {/* Login Popup */}
                {isLoginPopupOpen && (
          <LoginPopup
            onClose={() => setIsLoginPopupOpen(false)}
            onLoginSuccess={handleLoginSuccess}
            onSignupClick={() => {
              setIsLoginPopupOpen(false);
              setIsSignupPopupOpen(true);
            }}
          />
        )}

        {/* Signup Popup */}
        {isSignupPopupOpen && (
          <SignupPopup
            onClose={() => setIsSignupPopupOpen(false)}
            onSignupSuccess={handleSignupSuccess}
            onLoginClick={() => {
              setIsSignupPopupOpen(false);
              setIsLoginPopupOpen(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
