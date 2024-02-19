"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Squash as Hamburger } from "hamburger-react";
import { useSession } from 'next-auth/react';

const ChatPage = ({ params }) => {
    const userEmail = decodeURIComponent(params.userEmail);
    const profEmail = decodeURIComponent(params.profEmail);
    const { data: session, status: sessionStatus } = useSession();
    // console.log(session?.user?.role);

    const [toggle, setToggle] = useState(false);
    const [chatPersons, setChatPersons] = useState([]);


    // console.log(chatPersons);
    const fetchChatPersons = async () => {
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatAction: "fetchChat", userEmail })
                // body: session?.user?.role == "user" ? JSON.stringify({ chatAction: "fetchChat", userEmail }) : JSON.stringify({ chatAction, profEmail })
            });
            if (res.status === 200) {
                const chatData = await res.json();
                // console.log(chatData);
                setChatPersons(chatData);
            }
        } catch (error) {
            console.error('Error fetching chat persons: ', error);
        }
    };
    useEffect(() => {
        if (chatPersons.length === 0) {
            fetchChatPersons();
        }
    }, [chatPersons]);
    // console.log(chatPersons);
    return (
        <>
            <section className='w-full h-[92vh] md:h-[78vh] flex relative overflow-hidden'>
                <div className={`w-[80%] md:w-[20%] absolute md:relative border-[1px]  border-[#53c28b]  z-20 ${!toggle ? "-left-[72%] md:left-0 h-[3rem] md:h-full" : "left-0 h-full bbg"} ease-in-out duration-300`}>
                    <div className="md:hidden w-full h-auto  flex items-center justify-between top-0 right-0 bbg">
                        <span className='w-full h-full px-2 text-xl'>Chats</span>
                        <Hamburger
                            toggled={toggle}
                            toggle={setToggle}
                            label="Show menu"
                            size={25}
                            color="#53c28b"
                            hideOutline={false}
                            easing="ease-in"
                            distance="lg"
                            // duration={0.6}
                            rounded
                        />
                    </div>
                    <div className={`w-full h-[71vh] md:h-full borde ${!toggle ? "opacity-0 animate-fade-in-up md:opacity-100 md:animate-none" : "opacity-100 animate-fade-in-down md:animate-none"} flex flex-col gap-2 p-2 z-0 scrollDiv overflow-y-scroll scroll-snap-type-x-mandatory overflow-hidden ease-in-out duration-500`}>
                        <span className='hidden md:flex w-full h-auto px-2 text-xl'>Chats</span>
                        {chatPersons &&
                            chatPersons.map((p) => (
                                <>

                                    <Link href={`/chat/${p?.user?.email}/${p?.prof?.email}`} onClick={() => setToggle(!toggle)} key={p} className="w-full h-[3rem] bg-[#48ffa363] rounded-xl flex gap-1 items-center px-1 active:scale-95 ease-in-out duration-200">
                                        <div className="w-9 h-9 bbg rounded-full overflow-hidden flex items-center justify-center">{"1"}</div>
                                        <div className="w-full h-full border-l-[px] border-[#53c28b] rounded-l flex flex-col gap-1 px-2">
                                            <span className='w-full h-[1.3rem] borde text-md font-bold'>{p?.prof?.name ?? "NaN"}</span>
                                            <span className='text-sm'>{p?.messages[p?.messages.length - 1]?.message}</span>
                                        </div>
                                    </Link>
                                </>
                            ))}
                    </div>
                </div>
                <div className="w-full md:w-[80%] h-full px-0 relative z-0">
                    <ChatMessagePanel userEmail={userEmail} profEmail={profEmail} profName={chatPersons.filter((c) => c.prof.email == profEmail)[0]?.prof?.name} fetchChatPersons={fetchChatPersons} />
                </div>
                {/* .map((chat) => chat.prof.name).flat() */}
            </section>
        </>
    )
}

export default ChatPage;

export const ChatMessagePanel = (props) => {
    const { userEmail, profEmail, profName, fetchChatPersons } = props;
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState(null);
    const messagesContainerRef = useRef(null);
    // console.log(profName);

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
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        chatAction = "writeMsg";

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userEmail, profEmail, message, chatAction
                }),
            });

            if (res.status === 200) {
                // After sending a message, fetch and update messages
                fetchMessages();
                fetchChatPersons();
                setMessage('');
                scrollToBottom();
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        if (!chats) {
            fetchMessages();
            // scrollToBottom();
        }
    }, [userEmail, profEmail, chats]);
    // console.log(chats);
    useEffect(() => {
        if (chats) {
            scrollToBottom();
        }
    }, [chats]);

    return (
        <>
            <section className='w-full h-full flex flex-col gap-1 overflow-hidden'>
                <div className="w-full h-[87.8%] flex flex-col">
                    <h2 className="w-full h-auto text-center border border-[#53c28b] p-2 text-xl md:text-lg font-semibold">
                        {profName}
                    </h2>
                    <div ref={messagesContainerRef} className="overflow-y-auto h-full flex flex-col gap-3 p-2">
                        {chats == null && (
                            <div className="">Never had chat</div>
                        )}
                        {chats && chats.map((chat, i) => (
                            <div key={i} className="mb-4 flex gap-1 items-center justify-start">
                                <div className="w-8 h-8 border rounded-full flex items-center justify-center font-bold">
                                    {chat.sender == "user" ? "U" : "P"}
                                </div>
                                <div className="">
                                    <p className="text-white">{chat.message}</p>
                                    <small className="text-gray-500">{`${chat.date} ${chat.time}`}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
                        type='submit'
                        className="allBtn w-[4rem] h-[2.5rem] p-2 rounded-lg"
                    >
                        Send
                    </button>
                    <button
                        className="allBtn w-[4rem] h-[2.5rem] p-2 rounded-lg"
                    >
                        Pay
                    </button>
                </form>
            </section>
        </>
    );
};

