import axios from "axios";


async function getPayment(id){
    try {
        const payment = await axios.get(
            `${process.env.ZIINA_API_URL}/payment_intent/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.ZIINA_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        )
        return payment.data;
    }catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

async function createZinaPayment(amount, currencyCode, referenceId){
        try {
            const response = await axios.post(
                `${process.env.ZIINA_API_URL}/payment_intent`,
                {
                    amount: amount, // Amount in the smallest currency unit (e.g., cents)
                    currency_code: currencyCode, // Currency code (e.g., AED)
                    // customer_email: userEmail, // Customer's email
                    success_url: process.env.SUCCESS_URL ? process.env.SUCCESS_URL : "url",
                    cancel_url:process.env.CANSLE_URL ? process.env.CANSLE_URL : "url",
                    // test: true,
                    reference_id: referenceId, // Unique reference ID for the transaction
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.ZIINA_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log("Error On Send Payment :",error);
            throw new Error(`Failed to create Ziina payment ${error.message}`);
        }
}

export const ZinnaService = {
    getPayment,
    createZinaPayment
}