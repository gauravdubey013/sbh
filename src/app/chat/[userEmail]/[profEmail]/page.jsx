"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Loading from '@/app/loading';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


const ChatMessagePanel = (props) => {
    const { userEmail, profEmail, presonName, profPfp, fetchChatPersons, userRole } = props;
    const { data: session, status: sessionStatus } = useSession();
    // console.log(session?.user?.email);
    const [msg, setMsg] = useState('');
    const [chats, setChats] = useState(null);
    const [disableMessageBtn, setDisableMessageBtn] = useState(false);
    const [acceptanceNoReason, setAcceptanceNoReason] = useState(false);
    const [userData, setUserData] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const messagesContainerRef = useRef(null);
    // console.log(profName);
    const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chatAction: "fetchMessage", userEmail, profEmail
                }),
            });

            if (res.status === 200) {
                const chatMsg = await res.json();
                setChats(chatMsg);
                await delay(1500);
                scrollToBottom();
                // if (chatMsg.length > 0) {
                //     setChats(prevChats => [...prevChats, ...chatMsg]);
                //     scrollToBottom();
                // }
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async (message) => {
        try {
            setDisableMessageBtn(true);
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chatAction: "writeMsg", userRole, userEmail, profEmail, message,
                }),
            });

            if (res.status === 200) {
                setDisableMessageBtn(false);
                fetchMessages();
                fetchChatPersons();
                setMessage('');
                await delay(1500);
                scrollToBottom();
            }
        } catch (error) {
            setDisableMessageBtn(false);
            alert("server error, please wait...")
            console.error('Error sending message:', error);
        }
    };

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    const userInfo = async () => {
        try {
            const res = await fetch("/api/user-data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: profEmail,
                }),
            });

            if (res.status === 400) {
                // setError("User data isn't in the database!");
                console.log("User doesn't exists");
            }
            if (res.status === 200) {
                // setError("");
                const data = await res.json();
                setUserData(data);
            }
        } catch (error) {
            // setError("Something went wrong!");
            console.log("Error", error);
        }
    };

    const fetchPayment = async () => {
        try {
            const res = await fetch("/api/fetch-request-acceptance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "fetch", userEmail, profEmail
                })
            });
            if (res.status == 400) {
                console.log("Haven't made any Payments");
            }
            if (res.status == 200) {
                const data = await res.json();
                // console.log("Found", data);
                setPaymentData(data);
                // console.log(paymentData);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const paymentAction = async (action) => {
        try {
            const res = await fetch("/api/fetch-request-acceptance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action, userEmail, profEmail, reason: msg
                })
            });
            if (res.status == 400) {
                console.log("");
            }
            if (res.status == 200) {
                fetchPayment();
                if (action == "request") return alert("Requested to clinet for work done acceptance.");
                action == "acceptance-yes" ? alert(`You accepted the Work-Done, so now pending payment will be paid to ${presonName}.\n SkillBeHired - Thanks for using our payment service.`)
                    : (setAcceptanceNoReason(false))
                // const data = await res.json();
                // console.log("Found", data);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if ((!userData && userEmail !== "none" && profEmail !== "none") && !paymentData) {
            userInfo();
            fetchPayment();
        }
        fetchChatPersons();
        fetchMessages();
    }, [userData, chats]);
    // console.log(userData && userData?.prof?.upiId);
    return (
        <>
            <section className='relative w-full h-full flex flex-col gap-1 overflow-hidden'>
                <div className={`${(session?.user?.email !== profEmail && paymentData) && acceptanceNoReason ? "absolute" : "hidden"} z-10 w-full h-full flex items-center justify-center backdrop-blur-sm`}>
                    {/* <div className=""> */}
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage(`Reason of Regect - ${msg}`);
                        paymentAction("acceptance-no");
                    }} className="w-1/2 h-auto p-2 shadow-lg shadow-[#53c28b] rounded-lg animate-slideDown">
                        <textarea
                            // type="text"
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage(e);
                                }
                            }}
                            placeholder="Rejecting?, give reason..."
                            rows={5}
                            required
                            className="allFormInput h-auto"
                        />
                        <button
                            disabled={disableMessageBtn}
                            type='submit'
                            className={`allBtn w-auto h-[2.5rem] p-2 rounded-lg ${disableMessageBtn
                                ? "opacity-70 active:scale-95 hover:scale-95 active:text-xl"
                                : ""
                                }`}
                        >
                            {disableMessageBtn ? <span className="animate-pulse">Submiting...</span> : "Submit"}
                        </button>
                        <hr className='mt-2' />
                        <p>You won't receive the pending payment back until an less you provide us the reason.</p>
                    </form>
                    {/* </div> */}
                </div>
                <div className="z-0 w-full h-[87.8%] flex flex-col">
                    <div className="w-full border border-[#53c28b]">

                        <h2 className="w-full h-auto p-2 border border-[#53c28b] text-center text-xl md:text-lg font-semibold">
                            {presonName}
                        </h2>
                        {(session?.user?.email !== userEmail && paymentData) &&
                            <div className='flex gap-1 justify-center items-center p-2'>
                                <span>Request for Pending payment - </span>
                                <button
                                    disabled={paymentData?.isRequestForPending}
                                    onClick={() => paymentAction("request")}
                                    className={`allBtn w-auto h-auto px-2 py-1 rounded-lg ${paymentData?.isRequestForPending
                                        ? "opacity-70 active:scale-95 hover:scale-95 active:text-xl"
                                        : ""
                                        }`}
                                >{paymentData?.isRequestForPending ? "Requested" : "Request"}
                                </button>
                            </div>}
                        {(session?.user?.email !== profEmail && paymentData && paymentData?.isRequestForPending) &&
                            <div className='flex gap-1 justify-center items-center p-2'>
                                <span>Give your Work-Done Acceptance - </span>
                                <button
                                    disabled={paymentData?.isAcceptance}
                                    onClick={() => paymentAction("acceptance-yes")}
                                    className={`allBtn w-auto h-auto px-2 py-1 rounded-lg ${paymentData?.isAcceptance
                                        ? "opacity-70 active:scale-95 hover:scale-95 active:text-xl"
                                        : ""
                                        }`}
                                >
                                    Accept
                                </button>
                                <button
                                    disabled={paymentData?.isAcceptance}
                                    onClick={() => {
                                        setAcceptanceNoReason(true);
                                    }}
                                    className={`${paymentData?.isAcceptance ? "bg-[#842121] cursor-not-allowed" : "cursor-pointer bg-[red] hover:scale-100 active:text-lg active:scale-90"} w-auto h-auto rounded-lg px-2 py-1 font-extrabold md:hover:bg-[red]/50 scale-95 shadow-md flex justify-center items-center hover:shadow-lg focus:shadow-lg ease-in-out duration-200`}
                                >
                                    Reject
                                </button>
                            </div>
                        }
                    </div>
                    <div ref={messagesContainerRef} className="scrollDiv overflow-y-scroll overflow-x-scroll scroll-snap-type-x-mandatory w-screen h-full flex flex-col gap-3 p-2">
                        {chats == null && (
                            <Loading />
                        )}
                        {chats && chats.length == 0 && (
                            <div className="p-4 text-2xl">
                                Chat now!
                            </div>
                        )}
                        {chats && chats.map((chat, i) => (
                            // ${chat.sender !== "user" ? "justify-end" : "justify-start"}
                            <div key={i} className={`w-[80%] mb-2 flex gap-1 justify-start`}>
                                <div className="flex gap-1">
                                    <div className="w-8 h-8 borde rounded-full flex items-center justify-center font-bold overflow-hidden">
                                        {/* {chat.sender == "user" ? "U" : "P"} */}
                                        <Image
                                            src={chat.sender == "user" ? "/assets/loading3d360Rotate.gif" : profPfp}
                                            alt={chat.sender == "user" ? "U" : "P"}
                                            width={400}
                                            // fill={true}
                                            height={400}
                                            className="w-auto h-auto"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <p className="text-white text-justify">{chat.message}</p>
                                        <small className="text-gray-500">{`${chat.date} ${chat.time}`}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {(userEmail !== "none" && profEmail !== "none") && (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage(msg);
                    }} className="flex w-full h-auto p-2 border-t border-[#53c28b] rounded-lg">
                        <textarea
                            // type="text"
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage(e);
                                }
                            }}
                            className="allFormInput h-auto"
                            placeholder="Type your message..."
                            rows={1}
                            required
                        />
                        <button
                            disabled={disableMessageBtn}
                            type='submit'
                            className={`allBtn w-auto h-[2.5rem] p-2 rounded-lg ${disableMessageBtn
                                ? "opacity-70 active:scale-95 hover:scale-95 active:text-xl"
                                : ""
                                }`}
                        >
                            {disableMessageBtn ? <span className="animate-pulse">Sending...</span> : "Send"}
                        </button>
                        {userData?.prof?.upiId &&
                            <Link href={`/payment/${userEmail}/${profEmail}`} className="allBtn w-[4rem] h-[2.5rem] p-2 rounded-lg" >
                                Pay
                            </Link>}
                    </form>
                )}
            </section>
        </>
    );
};

export default ChatMessagePanel;