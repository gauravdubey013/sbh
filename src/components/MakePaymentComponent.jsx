"use client";

import React, { useState } from 'react';

const MakePaymentComponent = () => {
    const [amount, setAmount] = useState(100);

    const makePayment = async () => {
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
                description: "Thank you for your test",
                image: "https://sbh.vercel.app/_next/image?url=%2Fassets%2Floading3d360Rotate.gif&w=828&q=75",
                handler: function (response) {
                    alert("Razorpay Response: " + response.razorpay_payment_id);
                    alert(response.razorpay_order_id);
                    alert(response.razorpay_signature);
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
        <div className='h-[78vh] flex items-center justify-center'>
            <button onClick={() => makePayment()} className='allBtn w-auto h-[3rem] p-3 rounded-2xl'>Pay 100 now</button>
        </div>
    )
}

export default MakePaymentComponent;
