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

export async function getMyFatooraLink(totalPrice, { user, shippingData, orderId }) {
  const exchangePrice = convertCurrency(
    totalPrice,
    "KWD",
    shippingData.paymentCurrency
  );
  try {
    const url = `${EnvVar.myFatoora_base_url}/v2/SendPayment`;

    // Validate required fields
    if (!user?.firstName || !user?.lastName) {
      throw new ApiError("Customer name is required", 400);
    }

    if (!user.phone) {
      throw new ApiError("Customer phone is required", 400);
    }

    // Format phone number
    const phoneDigits = user.phone.replace(/\D/g, '');
    const customerMobile = phoneDigits.length >= 11 ? phoneDigits.slice(-11) : phoneDigits;

    const body = {
      // Required fields
      NotificationOption: NotificationOptions.link,
      InvoiceValue: exchangePrice, // Use InvoiceValue instead of InvoiceAmount
      CurrencyIso: shippingData.paymentCurrency || "KWD",
      
      // Customer information
      CustomerName: `${user.firstName} ${user.lastName}`.substring(0, 50), // Max 50 chars
      CustomerEmail: user.email || "no-email@example.com",
      CustomerMobile: customerMobile,
      CustomerReference: orderId.toString().substring(0, 50),
      Language: "AR", // Arabic language
      
      // Payment callback URLs
      CallBackUrl: `${EnvVar.myFatoora_call_back_url}?orderId=${orderId}`,
      ErrorUrl: `${EnvVar.myFatoora_error_url}?orderId=${orderId}`,
      
      // Invoice items (required)
      InvoiceItems: [
        {
          ItemName: `Order ${orderId}`.substring(0, 100), // Max 100 chars
          Quantity: 1,
          UnitPrice: exchangePrice
        }
      ],
      
      // Optional UI customization
      DisplayCurrencyIso: shippingData.paymentCurrency || "KWD",
      UserDefinedValues: [
        { Name: "themeColor", Value: "#4f46e5" }
      ]
    };

    const headers = {
      Authorization: `Bearer ${EnvVar.myFatoora_api_key}`,
      "Content-Type": "application/json"
    };

    const response = await axios.post(url, body, { headers });
    
    if (!response.data.IsSuccess) {
      throw new ApiError(
        `MyFatoora error: ${response.data.Message}`,
        400,
        response.data.ValidationErrors
      );
    }

    return response.data;

  } catch (error) {
    console.error("MyFatoora API Error Details:", error.response?.data || error.message);
    
    if (error.response?.data?.ValidationErrors) {
      const validationErrors = error.response.data.ValidationErrors
        .map(err => `${err.Name}: ${err.Error}`)
        .join(", ");
      throw new ApiError(`Validation failed: ${validationErrors}`, 400);
    }
    
    throw new ApiError(
      error.message || "Payment processing failed. Please try again.",
      error.statusCode || 500
    );
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
