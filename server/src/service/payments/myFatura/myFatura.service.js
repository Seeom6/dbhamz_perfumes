import axios from "axios";
import ApiError from "../../../lib/ApiError.js";
import {EnvVar} from "../../../config/env/env-var.js";
import {MyFatooraVersion, MyFatootaEndPoints} from "./myFatoora.type.js";
import * as url from "node:url";

const NotificationOptions = {
    link: "LNK",
    all: "ALL",
    sms: "SMS",
    email: "EML"
}

export async function getMyFatooraLink(totalPrice ,user){
    try {
        const url = `${EnvVar.myFatoora_base_url}/${MyFatooraVersion}/${MyFatootaEndPoints.sendPayment}`
        const body = {
            NotificationOption: NotificationOptions.link,
            CustomerName: user.firstName,
            InvoiceValue: totalPrice,
            CallBackUrl: EnvVar.myFatoora_call_backu_rl,
            ErrorUrl: EnvVar.myFatoora_error_url,
            // Language: 'ar',
            // DisplayCurrencyIso: 'KWD',
            // MobileCountryCode: '+965',
            // CustomerMobile: '12345678',
            // CustomerEmail: 'xx@yy.com',
            // CustomerReference: 'ref 1',
            // CustomerCivilId: 12345678,
            // UserDefinedField: 'Custom field',
            // ExpireDate: '',
            // CustomerAddress: {
            //         Block: '',
            //         Street: '',
            //         HouseBuildingNo: '',
            //         Address: '',
            //         AddressInstructions: ''
            //     },
            // InvoiceItems: [
            //     { ItemName: 'Product 01', Quantity: 1, UnitPrice: 100 }
            // ]
        }
        const headers = {
            Accept: 'application/json',
            Authorization: 'Bearer '+ EnvVar.myFatoora_api_key,
            'Content-Type': 'application/json'
        }
        const response = await axios.post(url,body,{
            headers
        })
        return response.data;
    }catch (e) {
        console.log(e.message)
        throw new ApiError("myFatoora payment error please try again ", 400)
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
    console.log(response.data.Data.InvoiceTransactions[0].TransactionStatus)
    return response.data;
}

export const MyFatooraService = {
    getMyFatooraLink,
    getPaymetStatus
}