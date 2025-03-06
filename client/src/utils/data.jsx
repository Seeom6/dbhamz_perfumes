import image1 from "/assets/perfume6.png";
import image2 from "/assets/perfume2.png";
import image3 from "/assets/perfume9.png";
import image4 from "/assets/perfumeSpecial.png";

import brand from "/assets/brand.png";
import brand1 from "/assets/brand1.png";
import brand2 from "/assets/brand2.png";
import brand3 from "/assets/brand3.png";
import brand4 from "/assets/brand4.png";

import perfume1 from "/assets/perfume1.png";
import perfume2 from "/assets/perfume2.png";
import perfume3 from "/assets/perfume3.png";
import perfume4 from "/assets/perfume4.png";
import perfume5 from "/assets/perfume5.png";
import perfume6 from "/assets/perfume6.png";
import perfume7 from "/assets/perfume7.png";
import perfume8 from "/assets/perfume8.png";
import perfume9 from "/assets/perfume9.png";

import profileImg from "/assets/profileImg.png";

import { PiKeyFill } from "react-icons/pi";
import { BsPersonFill } from "react-icons/bs";
import { BsBoxFill } from "react-icons/bs";
import { GiWallet } from "react-icons/gi";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { RiCoupon2Fill } from "react-icons/ri";

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
export const NotAccessRoute = [
  "/login",
  "/dashboard/add-product",
  "/dashboard/",
  "/dashboard",
  "/dashboard/products",
  "/dashboard/brands",
  "/dashboard/orders",
  "/dashboard/costumer",
  "/dashboard/add-brand",
  "/signup/",
  "/signup",
  "/dashboard/customer",
  "/dashboard/coupon"
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
    href: "/privacy-policy",
    name: "سياسة الخصوصية",
  },
  {
    href: "/about",
    name: "من نحن",
  },
];

export const offersInfo = [
  {
    image: image4,
    buttonTitle: "bay it now",
    offerTitle: "any thing ",
  },
  {
    image: image1,
    buttonTitle: "bay it now",
    offerTitle: "any thing ",
  },
  {
    image: image2,
    buttonTitle: "bay it now",
    offerTitle: "any thing ",
  },
  {
    image: image3,
    buttonTitle: "bay it now",
    offerTitle: "any thing ",
  },
];

// List of countries with their names, values, and country codes
// export const countries = [
//   { code: "+966", flag: "SA", name: "Saudi Arabia" },
//   { code: "+971", flag: "AE", name: "Emirates" },
//   { code: "+974", flag: "QA", name: "Qatar" },
//   { code: "+965", flag: "KW", name: "Kuwait" },
//   { code: "+968", flag: "OM", name: "Oman" },
// ];

export const countries = [
  {code: "+966", value: "SA", name: "Saudi Arabia", currency: "SAR" },
  {code: "+971", value: "AE", name: "UAE", currency: "AED" },
  {code: "+974", value: "KW", name: "Kuwait", currency: "KWD" },
  { code: "+965", value: "QA", name: "Qatar", currency: "QAR" },
  {code: "+968", value: "BH", name: "Bahrain", currency: "BHD" },
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

export const specialProducts = [
  {
    img: perfume1,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume2,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume3,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume4,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume5,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume6,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume7,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume8,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume9,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
];
export const products = [
  {
    img: perfume1,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume2,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume3,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume4,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume5,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume6,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume7,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume8,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume9,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume1,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume2,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume3,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume4,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume5,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume6,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume7,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume8,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
  },
  {
    img: perfume9,
    brandName: "مميز",
    perfumeName: "blue",
    price: "60.0 ",
    paymentCurrency: "د.ك",
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
