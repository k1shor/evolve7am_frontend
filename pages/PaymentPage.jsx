import { Inter } from "next/font/google";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";
import { useEffect, useState } from "react";

const stripePromise = loadStripe("pk_test_51KnOM3B4DsFjtDStbsKa5pgCM9qwjyq9VsWRynpmqiKc7kgdWN6t1xW0soZRIV71CpBXYPWXHwWxwF2grBRVXkoT00qnJMIo1W");

export default function Home() {

    // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    const [clientSecret, setClientSecret] = useState("");
    const [CartTotal, setCartTotal] = useState(0);

    useEffect(() => {
getTotal().then(total=>{
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "TESTING TESTING")
            setClientSecret(data.clientSecret)
        });

})





    }, [CartTotal]);


    async function getTotal() {
        if (typeof window !== "undefined") {
            setCartTotal(sessionStorage.getItem('total') ? await JSON.parse(sessionStorage.getItem('total')) : 0)
        }
    }


    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    console.log("TESTING", clientSecret)

    return (
        <>

            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <Payment />
                </Elements>
            )}


        </>
    );
}
