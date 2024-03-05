"use client";

import React, { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReactToPrint from 'react-to-print'

const MakePayment = (props) => {
    const { userEmail, profEmail } = props;
    const printRef = useRef();
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter();

    // console.log(session?.user?.email);
    // console.log(userEmail, profEmail);
    const [fullAmount, setFullAmount] = useState("");
    const [upiId, setUpiId] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [printReceiptVisible, setPrintReceiptVisible] = useState(true);
    const [upiError, setUpiError] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [fetchedDetails, setFetchedDetails] = useState();
    // console.log(fullAmount);

    // const upiPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const upiPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/;
    const handleUpi = (e) => {
        const input = e.target.value;
        setUpiId(input)
        if (input == "") {
            setDisableSubmit(false);
            setUpiError("")
        } else if (!upiPattern.test(input)) {
            setUpiError("Invaild UPI id, refrence: sbh@icici");
            setDisableSubmit(true);
        } else {
            setUpiError("")
            setDisableSubmit(false);
            if (success) setDisableSubmit(true);
        }
    };

    if (session?.user?.role == "professional" && session?.user?.email == profEmail) return router.replace("/");


    const makePayment = async (e) => {
        e.preventDefault();
        setDisableSubmit(true);
        if (fullAmount !== "" && upiId !== "" && pinCode !== "") {
            // console.log(fullAmount, upiId, pinCode);
            const formData = JSON.stringify({ userEmail, profEmail, fullAmount: parseFloat(fullAmount), upiId });
            try {
                const res = await fetch("/api/payment", {
                    method: "POST",
                    body: formData,
                });
                if (res.status === 200) {
                    // setDisableSubmit(false);
                    const data = await res.json();
                    setFetchedDetails(data);
                    console.log(data);

                    setSuccess("Payment Successful!")
                    setPrintReceiptVisible(true)
                }
                if (res.status === 500) {
                    setError("Something went wrong, try again.");
                    setDisableSubmit(false)
                }
            } catch (error) {
                console.log(error);
                setError("Server error");
                setDisableSubmit(false)
            }
        }
    }
    const printRefDimensions = { width: '95%', height: '95%' }
    // console.log(fetchedDetails);
    return (
        <>
            <section className="w-full h-full relative flex items-center justify-center overflow-hidden">
                <div ref={printRef} className={`${printReceiptVisible ? "animate-slideDown" : "hidden"} absolute cursor-pointer w-full h-full bg-[url('/assets/receiptBg2.png')] bbg bg-cover z-10 px-2 py-1 rounded-lg`}>
                    <ReactToPrint
                        content={() => printRef.current}
                        documentTitle={"PAYMENT RECEIPT"}
                        style={`@media print {
                        width: ${printRefDimensions.width};
                        height: ${printRefDimensions.height};
                    }`}
                        // scale={scale}
                        // pageStyle={`@page { size: A4; margin: 0.5cm; } @media print { body { margin: 0; } }`}
                        trigger={() =>
                            <div ref={printRef}>
                                <div className="w-full flex justify-between text-[#4cffa5]">
                                    <h2 className='text-2xl md:text-4xl font-extrabold text-start'>Payment Receipt</h2>
                                    <h2 className='text-lg md:text-xl font-extrabold text-end'>SkillBeHired</h2>
                                </div>
                                <span className='absolute right-1 top-[5rem] text-[12px] text-white'>Date : {fetchedDetails?.dateTime ?? "NaN"}</span>
                                <div className="w-full h-[63.5%] borde mt-[10.5vh] text-start flex flex-col text-[16px]">
                                    <span className='text-2xl'>Your Name : {fetchedDetails?.userName ?? "NaN"}</span>
                                    <span className=''>Payment ID : {fetchedDetails?.paymentId ?? "NaN"}</span>
                                    <span className=''>UPI ID : {upiId}</span>
                                    <span className=''>Received Amount : ₹{fullAmount}</span>
                                    <span className=''>Received to : SkillBeHired</span>
                                    <span className=''>Advance 15% amount  : ₹{fetchedDetails?.advanceAmount ?? "NaN"}</span>
                                    <span className=''>Advance 15% paid to  : {fetchedDetails?.profName ?? "NaN"} ({fetchedDetails?.profUpiId ?? "NaN"})</span>

                                    <span className='absolute bottom-[3.3rem] borde text-[9px] leading-tight text-justify px-2'>After your work done acceptance decision, we will pay pending amount to professional (if " <u>YES</u> ") else pay-back to you through your UPI ID. You can make decision in professional's chat section, it will appear when professional request for it.</span>
                                </div>
                                <div className="w-8 h-8 absolute bottom-2 bg-[url('/assets/bg6.png')] bg-cover"></div>
                            </div>}
                    />
                </div>

                <div className='w-full h-[30vh] z-0 px-5 flex items-center justify-center'>
                    <form action="" onSubmit={makePayment} className='w-full h-full flex flex-col gap-1 justify-between'>
                        <h2 className="w-full h-auto text-4xl  font-bold text-[#44e795] text-center ease-in-out duration-300">
                            Payment
                        </h2>
                        <div className="w-full flex flex-col gap-1">
                            <div className="flex items-center">
                                <span className='text-[#4cffa5]'>₹</span><input type="text" value={fullAmount} onChange={(e) => setFullAmount(e.target.value.replace(/[^\d]/g, ""))} required placeholder='Enter amount' className='allFormInput h-[52px]' />
                            </div>
                            {fullAmount !== "" &&
                                <div className="w-full h-auto animate-fade-in-down">
                                    <input type="text" value={upiId} onChange={handleUpi} required placeholder='Enter UPI id' className='allFormInput h-[52px]' />
                                    {upiError && <span className="w-full h-auto text-red-500 animate-fade-in-down text-lg ease-in-out duration-300">{upiError}</span>}
                                    <input type="text" value={pinCode} onChange={(e) => setPinCode(e.target.value.replace(/[^\d]/g, "").slice(0, 6))} required placeholder='Enter Pin code' className='allFormInput h-[52px]' />
                                </div>
                            }
                            <button
                                type="submit"
                                disabled={disableSubmit}
                                className={`allBtn w-full h-[3rem] text-2xl rounded-3xl ${disableSubmit
                                    ? "opacity-70 active:scale-95 hover:scale-95 active:text-xl"
                                    : ""
                                    }`}
                            >
                                {disableSubmit ? (
                                    disableSubmit && upiError !== "" ? "UPI Invalid" : (success !== "" ? "Paid" : <span className='animate-pulse'>Paying</span>)
                                ) : (
                                    `Pay ${fullAmount !== "" ? `₹${fullAmount}` : ""} now`
                                )}
                            </button>
                        </div>
                        {error && <span className="text-red-500 animate-fade-in-up text-lg ease-in-out duration-300">{error}</span>}
                        {success && <span className="text-[#53c28b] animate-fade-in-up text-lg ease-in-out duration-300">{success}</span>}
                    </form>
                </div>
            </section>
        </>
    )
}

export default MakePayment;


// const makePayment = async (e) => {
//     e.preventDefault();

//     const res = await initializeRazorpay();
//     if (!res) {
//         alert("Razorpay SDK Failed to load");
//         return;
//     }

//     try {
//         const response = await fetch("/api/razorpay", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 taxAmt: fullAmount,
//                 // payment_method: ["upi"], // Include UPI as a payment method
//             })
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch');
//         }

//         const data = await response.json();

//         var options = {
//             key: process.env.RAZORPAY_KEY,
//             name: "SkillBeHired",
//             currency: data.currency,
//             fullAmount: data.fullAmount,
//             order_id: data.id,
//             description: "Payment test",
//             image: "https://sbh.vercel.app/_next/image?url=%2Fassets%2Floading3d360Rotate.gif&w=828&q=75",
//             handler: function (response) {
//                 alert("Razorpay Response: " + response.razorpay_payment_id);
//                 alert(response.razorpay_order_id);
//                 alert(response.razorpay_signature);
//                 setSuccess("Payment Successful!")
//                 setError("")
//             },
//             prefill: {
//                 name: "Gaurav Dubey test",
//                 email: "admin@sbh.in",
//                 contact: '9326550821'
//             },
//         };

//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//     } catch (error) {
//         console.error('Error making payment:', error);
//         setError("Error making payment:", error);
//     }
// };

// const initializeRazorpay = () => {
//     return new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.src = "https://checkout.razorpay.com/v1/checkout.js";

//         script.onload = () => {
//             resolve(true);
//         };
//         script.onerror = () => {
//             resolve(false);
//         };

//         document.body.appendChild(script);
//     });
// }