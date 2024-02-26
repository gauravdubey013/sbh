"use client";

import React, { useState } from 'react';
import { MdOutlineCurrencyRupee } from "react-icons/md";

const MakePayment = (props) => {

    const [amount, setAmount] = useState();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    // console.log(amount);

    const makePayment = async (e) => {
        e.preventDefault();

        const res = await initializeRazorpay();
        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }

        try {
            const response = await fetch("/api/razorpay", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taxAmt: amount,
                    // payment_method: ["upi"], // Include UPI as a payment method
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            const data = await response.json();

            var options = {
                key: process.env.RAZORPAY_KEY,
                name: "SkillBeHired",
                currency: data.currency,
                amount: data.amount,
                order_id: data.id,
                description: "Payment test",
                image: "https://sbh.vercel.app/_next/image?url=%2Fassets%2Floading3d360Rotate.gif&w=828&q=75",
                handler: function (response) {
                    alert("Razorpay Response: " + response.razorpay_payment_id);
                    alert(response.razorpay_order_id);
                    alert(response.razorpay_signature);
                    setSuccess("Payment Successful!")
                    setError("")
                },
                prefill: {
                    name: "Gaurav Dubey test",
                    email: "admin@sbh.in",
                    contact: '9326550821'
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Error making payment:', error);
            setError("Error making payment:", error);
        }
    };

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    }

    return (
        <>
            <div className='w-full h-[30vh] px-5 flex items-center justify-center'>
                <form action="" onSubmit={makePayment} className='w-full h-full flex flex-col gap-1 justify-between'>
                    <h2 className="w-full h-auto text-[40px] md:text-[45px] lg:text-[40px] text-[#53c28b] text-center ease-in-out duration-300">
                        Payment
                    </h2>
                    <div className="flex flex-col gap-1">
                        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ""))} required placeholder='Enter Amount' className='allFormInput h-[52px]' />
                        <button type='submit' className='allBtn w-full h-[3rem] p-3 rounded-2xl'>Pay <MdOutlineCurrencyRupee />{amount} now</button>
                    </div>
                    {error && <span className="text-red-500 animate-fade-in-up">{error}</span>}
                    {success && <span className="text-[#53c28b] animate-fade-in-up">{success}</span>}
                </form>
            </div>
        </>
    )
}

export default MakePayment;
