

import brand from "/assets/brand.png";
import brand1 from "/assets/brand1.png";
import brand2 from "/assets/brand2.png";
import brand3 from "/assets/brand3.png";
import brand4 from "/assets/brand4.png";



import profileImg from "/assets/profileImg.png";

import { PiKeyFill } from "react-icons/pi";
import { BsPersonFill } from "react-icons/bs";
import { BsBoxFill } from "react-icons/bs";
import { GiWallet } from "react-icons/gi";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { RiCoupon2Fill } from "react-icons/ri";
import { BiSolidOffer } from "react-icons/bi";

export const dashboardLinks = [
  {
    href: "/dashboard",
    name: " لوحة التحكم",
    icon: <PiKeyFill />,
  },
  {
    href: "/dashboard/customer",
    name: " الزبائن",
    icon: <BsPersonFill />,
  },
  {
    href: "/dashboard/offers",
    name: " العروض",
    icon: <BiSolidOffer />,
  },
  {
    href: "/dashboard/products",
    name: " المنتجات",
    icon: <BsBoxFill />,
  },
  {
    href: "/dashboard/brands",
    name: " علامات تجارية",
    icon: <GiWallet />,
  },
  {
    href: "/dashboard/orders",
    name: " الطلبات",
    icon: <FaFileInvoiceDollar />,
  },
  {
    href: "/dashboard/coupon",
    name: " الكوبونات",
    icon: <RiCoupon2Fill />,
  },
];

export const navLinkForFooter = [
  {
    href: "/",
    name: "الصفحة الرئيسة",
  },
  {
    href: "/products",
    name: "جميع المنتجات",
  },
  {
    href: "/special-products",
    name: "المنتجات المميزة",
  },
  {
    href: "/brands",
    name: " الماركات",
  },
  {
    href: "/privacy-policy",
    name: " الشروط والأحكام",
  },
  {
    href: "/about",
    name: "من نحن",
  },
  {
    href: "/login",
    name: " تسجيل الدخول",
  },
];
export const navLink = [
  {
    href: "/",
    name: "الصفحة الرئيسة",
  },
  {
    href: "/products",
    name: "جميع المنتجات",
  },
  {
    href: "/special-products",
    name: "المنتجات المميزة",
  },
  {
    href: "/brands",
    name: " الماركات",
  },

  {
    href: "/about",
    name: "من نحن",
  },

];



export const countries = [
  { code: "+966", value: "SA", name: "Saudi Arabia", arabicName: "السعودية", currency: "SAR" },
  { code: "+971", value: "AE", name: "UAE", arabicName: "الأمارات", currency: "AED" },
  { code: "+965", value: "KW", name: "Kuwait", arabicName: "الكويت", currency: "KWD" },
  { code: "+974", value: "QA", name: "Qatar", arabicName: "قطر", currency: "QAR" },
  { code: "+973", value: "BH", name: "Bahrain", arabicName: "البحرين", currency: "BHD" },
  { code: "+968", value: "OM", name: "Oman", arabicName: "عمان", currency: "OMR" },
];
export const Brands = [
  {
    img: brand,
    name: "brand",
  },
  {
    img: brand1,
    name: "brand",
  },
  {
    img: brand2,
    name: "brand",
  },
  {
    img: brand3,
    name: "brand",
  },
  {
    img: brand4,
    name: "brand",
  },
];



export const customer = [
  {
    profile: profileImg,
    comment:
      "كل عطر من دبهام يحمل قصة خاصة، وجودة العطور مذهلة وتدوم طويلاً. أنصح به الجميع!",
    name: "محمد السلامات",
  },
  {
    profile: profileImg,
    comment:
      "كل عطر من دبهام يحمل قصة خاصة، وجودة العطور مذهلة وتدوم طويلاً. أنصح به الجميع!",
    name: "محمد السلامات",
  },
  {
    profile: profileImg,
    comment:
      "كل عطر من دبهام يحمل قصة خاصة، وجودة العطور مذهلة وتدوم طويلاً. أنصح به الجميع!",
    name: "محمد السلامات",
  },
  {
    profile: profileImg,
    comment:
      "كل عطر من دبهام يحمل قصة خاصة، وجودة العطور مذهلة وتدوم طويلاً. أنصح به الجميع!",
    name: "محمد السلامات",
  },
];
