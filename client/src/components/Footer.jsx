import React from "react";
import logo from "/assets/logo.png";
import { navLink, NotAccessRoute } from "../utils/data.jsx";
import { Link, useLocation } from "react-router-dom";
import { FaPhone, FaInstagram , FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const whatsappUrl = `https://wa.me/${+96566621132}?`;

  const pathname = useLocation().pathname;
  return (
    <div
      className={`${
        NotAccessRoute.includes(pathname) ? "hidden" : ""
      } w-full flex justify-center flex-col b items-center`}
    >
      <div className="max-w-[1240px] w-full bg-primary p-5 md:p-20 flex flex-col md:flex-row justify-between md:justify-center gap-6 items-center md:items-start">
        <div>
          <img className="w-[100px] md:w-[200px]" src={logo} alt="" />
        </div>
        <div className="w-full flex justify-between md:justify-around">
          <div>
            <p className="font-bold text-[22px] mb-2">الأقسام</p>
            {navLink.map((item) => (
              <Link to={item.href}
                key={item.href}
                className="text-[#111] block font-semibold text-small md:text-medium leading-8"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="text-small md:text-medium">
            <p className="font-bold text-[22px] mb-2">أتصل بنا</p>
            <Link
              to={whatsappUrl}
              className="w-full text-[#111] font-semibold flex items-center gap-3"
            >
              <p>
                <FaWhatsapp />
              </p>
              <p>0096566621132</p>
            </Link>
       
            <Link
              to={
                "https://www.instagram.com/dbhamz_perfume?igsh=ZGhtaXRkNjh6NGM0"
              }
              className="w-full text-[#111] font-semibold flex items-center gap-3"
            >
              <p>
                <FaInstagram />
              </p>
              <p>dbhamz_perfume</p>
            </Link>
            <Link
              to={
                "tel:00971547958045"
              }
              className="w-full text-[#111] font-semibold flex items-center gap-3"
            >
              <p>
                <FaPhone  />
              </p>
              <p> 0096566621132 </p>
            </Link>
          </div>
          <div>
            <p className="font-bold text-[22px] mb-2">تابعنا</p>
            <div className="w-full flex text-small md:text-medium gap-4">
              <Link
                to={
                  "https://www.instagram.com/dbhamz_perfume?igsh=ZGhtaXRkNjh6NGM0"
                }
                className="w-full text-[#111] font-semibold text-2xl flex items-center gap-3"
              >
                <p>
                  <FaInstagram />
                </p>
              </Link>
              <Link
                to={whatsappUrl}
                className="w-full text-[#111] text-2xl font-semibold flex items-center gap-3"
              >
                <p>
                  <FaWhatsapp />
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary max-w-[1240px] w-full border-t-2 border-ford text-center font-bold text-medium">
        جميع الحقوق محفوظة لمتجر دبهامز 2025
      </div>
    </div>
  );
};

export default Footer;
