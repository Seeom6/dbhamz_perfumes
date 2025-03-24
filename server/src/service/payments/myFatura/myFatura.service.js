import axios from "axios";
import ApiError from "../../../lib/ApiError.js";
import { EnvVar } from "../../../config/env/env-var.js";
import { MyFatooraVersion, MyFatootaEndPoints } from "./myFatoora.type.js";

const NotificationOptions = {
  link: "LNK",
  all: "ALL",
  sms: "SMS",
  email: "EML",
};

export const exchangeRates = {
  KWD: 1, // Base currency (Kuwaiti Dinar)
  SAR: 12.18, // 1 KWD = 12.18 SAR
  AED: 11.95, // 1 KWD = 11.95 AED
  QAR: 12.32, // 1 KWD = 12.32 QAR
  BHD: 1.22, // 1 KWD = 1.22 BHD
  OMR: 1.26, // 1 KWD = 1.26 OMR
};

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
  return (amount * rate).toFixed(2);
};

export async function getMyFatooraLink(totalPrice, { user, shippingData }) {
  try {
    const url = `${EnvVar.myFatoora_base_url}/${MyFatooraVersion}/${MyFatootaEndPoints.sendPayment}`;

    const exchangePrice = convertCurrency(
      totalPrice,
      "KWD",
      shippingData.paymentCurrency
    );

    const phoneDigits = user.phone.replace(/\D/g, "");
    const customerMobile = phoneDigits.slice(-11);

    const body = {
      NotificationOption: NotificationOptions.link,
      CustomerName: user.firstName + " " + user.lastName,
      InvoiceValue: exchangePrice,
      CustomerMobile: customerMobile,
      CallBackUrl: EnvVar.myFatoora_call_backu_rl,
      ErrorUrl: EnvVar.myFatoora_error_url,
      DisplayCurrencyIso: shippingData.paymentCurrency || "KWD",
      CustomerEmail: user.email || "example@example.com",
      // CustomerReference: "ref1",
      // CustomerCivilId: "12345678",
      InvoiceItems: [
        {
          ItemName: "Product 01",
          Quantity: 1,
          UnitPrice: exchangePrice,
        },
      ],
    };

    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + EnvVar.myFatoora_api_key,
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (e) {
    throw new ApiError("MyFatoora payment error. Please try again.", 400);
  }
}
async function getPaymetStatus(id, key) {
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + EnvVar.myFatoora_api_key,
    "Content-Type": "application/json",
  };
  const body = {
    Key: id,
    KeyType: key,
  };
  const url = `${EnvVar.myFatoora_base_url}/${MyFatooraVersion}/${MyFatootaEndPoints.getPaymentStatus}`;
  const bodyString = JSON.stringify(body);
  const response = await axios.post(url, bodyString, {
    headers,
  });
  return response.data;
}

export const MyFatooraService = {
  getMyFatooraLink,
  getPaymetStatus,
};
