import axios from "axios";
import ApiError from "../../../lib/ApiError.js";
import {EnvVar} from "../../../config/env/env-var.js";
import {MyFatooraVersion, MyFatootaEndPoints} from "./myFatoora.type.js";


const NotificationOptions = {
    link: "LNK",
    all: "ALL",
    sms: "SMS",
    email: "EML"
}

export async function getMyFatooraLink(totalPrice, user) {
    try {
      const url = `${EnvVar.myFatoora_base_url}/${MyFatooraVersion}/${MyFatootaEndPoints.sendPayment}`;
  
      const body = {
        NotificationOption: NotificationOptions.link, // Ensure this is valid
        CustomerName: user.firstName + " " + user.lastName,
        InvoiceValue: totalPrice,
        CustomerMobile:  user.phone.slice(0, 11),
        CallBackUrl: EnvVar.myFatoora_call_backu_rl, // Ensure this is defined in your env
        ErrorUrl: EnvVar.myFatoora_error_url, // Ensure this is defined in your env
        DisplayCurrencyIso: "KWD",
        CustomerEmail: user.email || "example@example.com", // Provide a default email if user.email is missing
        CustomerReference: "ref1", // Add a reference if needed
        CustomerCivilId: "12345678", // Add a civil ID if required
        InvoiceItems: [
          {
            ItemName: "Product 01",
            Quantity: 1,
            UnitPrice: totalPrice, // Ensure this matches the total price
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
async function getPaymetStatus(id, key){
    const headers = {
        Accept: 'application/json',
        Authorization: 'Bearer '+ EnvVar.myFatoora_api_key,
        'Content-Type': 'application/json'
    }
    const  body = {
        Key : id,
        KeyType : key
    }
    const url = `${EnvVar.myFatoora_base_url}/${MyFatooraVersion}/${MyFatootaEndPoints.getPaymentStatus}`
    const bodyString = JSON.stringify(body)
    const response = await axios.post(url,bodyString,{
        headers
    })
    return response.data;
}

export const MyFatooraService = {
    getMyFatooraLink,
    getPaymetStatus
}