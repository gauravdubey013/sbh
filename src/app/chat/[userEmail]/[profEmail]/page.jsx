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
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState(null);
    const [disableMessageBtn, setDisableMessageBtn] = useState(false);
    const [userData, setUserData] = useState(null);
    const messagesContainerRef = useRef(null);
    // console.log(profName);
    const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

    let chatAction;
    const fetchMessages = async () => {
        chatAction = "fetchMessage";

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chatAction, userEmail, profEmail
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

    const sendMessage = async (e) => {
        e.preventDefault();
        chatAction = "writeMsg";
        try {
            setDisableMessageBtn(true);
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chatAction, userRole, userEmail, profEmail, message,
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
                console.log("Error: ", error);
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

    useEffect(() => {
        if (!userData) {
            userInfo();
        }
        fetchChatPersons();
        fetchMessages();
    }, [userData, chats]);
    // console.log(userData && userData?.prof?.upiId);
    return (
        <>
            <section className='w-full h-full flex flex-col gap-1 overflow-hidden'>
                <div className="w-full h-[87.8%] flex flex-col">
                    <div className="w-full flex border border-[#53c28b] p-2">

                        <h2 className="w-full h-auto text-center text-xl md:text-lg font-semibold">
                            {presonName}
                        </h2>
                        {session?.user?.email !== userEmail &&
                            <button
                                className={`allBtn w-auto h-auto px-2 py-1 rounded-lg ${false
                                    ? "opacity-70 active:scale-95 hover:scale-95 active:text-xl"
                                    : ""
                                    }`}
                            >
                                Request
                            </button>}
                        {session?.user?.email !== profEmail &&
                            <>
                                <button
                                    className={`allBtn w-auto h-auto px-2 py-1 rounded-lg ${false
                                        ? "opacity-70 active:scale-95 hover:scale-95 active:text-xl"
                                        : ""
                                        }`}
                                >
                                    Yes
                                </button>
                                <button
                                    className={`allBtn w-auto h-auto px-2 py-1 rounded-lg text-[red] ${false
                                        ? "opacity-70 active:scale-95 hover:scale-95 active:text-xl"
                                        : ""
                                        }`}
                                >
                                    No
                                </button>
                            </>
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
                    <form onSubmit={sendMessage} className="flex w-full h-auto p-2 border-t border-[#53c28b] rounded-lg">
                        <textarea
                            // type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
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