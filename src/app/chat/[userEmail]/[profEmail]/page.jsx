"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Loading from '@/app/loading';


const ChatMessagePanel = (props) => {
    const { userEmail, profEmail, presonName, profPfp, fetchChatPersons, userRole } = props;
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState(null);
    const [disableMessageBtn, setDisableMessageBtn] = useState(false);
    // const [profName, setProfName] = useState(null);
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
                await delay(1000);
                scrollToBottom();
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
                // After sending a message, fetch and update messages
                fetchMessages();
                fetchChatPersons();
                setMessage('');
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

    useEffect(() => {
        // if (!chats)
        fetchMessages();
        // if (chats) {
        //     scrollToBottom();
        // }
    }, []);

    return (
        <>
            <section className='w-full h-full flex flex-col gap-1 overflow-hidden'>
                <div className="w-full h-[87.8%] flex flex-col">
                    <h2 className="w-full h-auto text-center border border-[#53c28b] p-2 text-xl md:text-lg font-semibold">
                        {presonName}
                    </h2>
                    <div ref={messagesContainerRef} className="overflow-y-auto h-full flex flex-col gap-3 p-2">
                        {chats == null && (
                            <Loading />
                        )}
                        {chats && chats.length == 0 && (
                            <div className="p-4 text-2xl">
                                Chat now!
                            </div>
                        )}
                        {chats && chats.map((chat, i) => (
                            <div key={i} className="mb-4 flex gap-1 justify-start">
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
                            className={`allBtn w-full h-[3rem] text-xl rounded-3xl ${disableMessageBtn
                                ? "opacity-70 active:scale-95 hover:scale-95 active:text-xl"
                                : ""
                                }`}
                        >
                            {disableMessageBtn ? <span className="animate-pulse">Registering...</span> : "Send"}
                        </button>
                        <button type='button' className="allBtn w-[4rem] h-[2.5rem] p-2 rounded-lg">
                            Pay
                        </button>
                    </form>)}
            </section>
        </>
    );
};

export default ChatMessagePanel;