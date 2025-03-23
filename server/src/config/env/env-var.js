import {config} from 'dotenv';
import { resolve } from 'path';
import {fileURLToPath} from "node:url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({
    path: resolve(__dirname, "../../../config.env")
})

export const EnvVar = {
    myFatoora_api_key: process.env.MYFATOORAH_API_KEY,
    myFatoora_base_url: process.env.MYFATOORAH_API_BASE_URL,
    myFatoora_call_backu_rl: process.env.MYFATOORAH_API_CALLBACK_URL,
    myFatoora_error_url: process.env.MYFATOORAH_API_ERROR_URL,
    myFatoora_webhook_secret: process.env.MYFATOORAH_API_WEBHOOK_SECRET
}