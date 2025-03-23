import React, { useContext } from "react";
import { Context } from "../context/StatContext";
import image from "/assets/perfume6.png";
import HeaderImage from "./../components/HeaderImage";
import UserProfile from "../components/profile/UserProfile";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Profile = () => {
  const { userData, isLogin } = useContext(Context); // Assuming `orders` is part of the context
   const orders =[]

  if (!isLogin) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg text-red-600">
          Something went wrong...! Please check your registration.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center bg-gray-50 py-10">
      <div className="max-w-[1260px] w-full px-4 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20">
        {/* Header Image */}
        <HeaderImage
          image={image}
          title={"أهلاً بك في عالمك الخاص من العطور"}
          subtitle={"استكشف عطورنا الفريدة واختر ما يناسبك"}
        />

        {/* User Profile Section */}
        <div className="w-full">
          <UserProfile user={userData} />
        </div>

        {/* Display if user has no orders */}
        {orders.length === 0 && (
          <div className="w-full text-center p-8 bg-white shadow-lg rounded-xl transform transition-all hover:scale-105 hover:shadow-xl">
            <p className="text-xl text-gray-700 mb-6">
              يبدو أنك لم تقم بطلب أي عطور حتى الآن. اكتشف مجموعتنا واختر عطرك المفضل!
            </p>
            <Link
              to="/products" // Replace with your actual products page route
              className="inline-block px-8 py-3 bg-gradient-to-r from-secondary to-primary text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              تصفح العطور
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;