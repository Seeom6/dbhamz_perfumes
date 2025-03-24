import React from "react";
import HeaderImage from "../components/HeaderImage";
import aboutImage from "/assets/perfume10.png";
import AboutUs from "../components/AboutUs";
import Comments from "../components/Comments";

const About = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] mt-[80px] md:mt-[115px] w-full px-2.5 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20 mb-20">
        <HeaderImage
          image={aboutImage}
          title={"من نحن؟ لمسة عطر... قصة شغف وأناقة تُروى بعبير خاص"}
        />
        <AboutUs text={''}/>
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <p className="titleText font-bold text-primary">ماذا يقول عملاؤنا عنا؟</p>
          <Comments/>
        </div>
      </div>
    </div>
  );
};

export default About;
