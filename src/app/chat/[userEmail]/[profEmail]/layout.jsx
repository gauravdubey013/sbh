"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Squash as Hamburger } from "hamburger-react";
import ChatMessagePanel from './page';

const ChatPage = ({ children, params }) => {
    const userEmail = decodeURIComponent(params.userEmail);
    const profEmail = decodeURIComponent(params.profEmail);
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter();
    // console.log(session ? session?.user?.role);

    const [toggle, setToggle] = useState(false);
    const [chatPersons, setChatPersons] = useState([]);

    useEffect(() => {
        if (sessionStatus !== "authenticated") {
            router.replace("/");
        }
    }, [sessionStatus, router]);

    // console.log(chatPersons);
    const fetchChatPersons = async () => {
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chatAction: "fetchChat", userRole: session?.user?.role, userEmail, profEmail })
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
        if (sessionStatus === "authenticated" && chatPersons.length === 0) {
            fetchChatPersons();
        }
    }, [sessionStatus, chatPersons]);
    // console.log(chatPersons);
    return (
        <>
            <section className='w-full h-[92vh] md:h-[78vh] flex relative overflow-hidden'>
                <div className={`w-[80%] md:w-[20%] absolute md:relative border border-[#53c28b] z-20 ${!toggle ? "-left-[72%] md:left-0 h-[3.133rem] md:h-full" : "left-0 h-full bbg"} ease-in-out duration-300 overflow-hidden`}>
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
                    <span className='hidden md:flex w-full h-auto px-2 text-xl'>Chats</span>
                    <div className={`w-full h-[71vh] md:h-[95%] borde ${!toggle ? "opacity-0 animate-fade-in-up md:opacity-100 md:animate-none" : "opacity-100 animate-fade-in-down md:animate-none"} flex flex-col gap-2 p-2 z-0 scrollDiv overflow-y-scroll scroll-snap-type-x-mandatory overflow-hidden ease-in-out duration-500`}>
                        {chatPersons &&
                            chatPersons
                                .sort((a, b) => new Date(b?.updatedAt) - new Date(a?.updatedAt))
                                .map((p) => {
                                    return (
                                        <div key={p?._id}>
                                            <Link href={`/chat/${p?.user?.email}/${p?.prof?.email}`} onClick={() => setToggle(!toggle)} className="w-full h-auto bg-[#48ffa363] rounded-xl flex gap-1 items-center px-1 active:scale-95 ease-in-out duration-200">
                                                <div className="w-9 h-9 bbg rounded-full overflow-hidden flex items-center justify-center">
                                                    <Image
                                                        src={session?.user?.role !== "professional" ? p?.prof?.pfp : "/assets/loading3d360Rotate.gif"}
                                                        alt={session?.user?.role !== "professional" ? p?.prof?.name : p?.user?.name ?? "NaN"}
                                                        width={400}
                                                        height={400}
                                                        className="w-auto h-auto"
                                                    />
                                                </div>
                                                <div className="w-full h-full border-l-[px] border-[#53c28b] rounded-l flex flex-col gap-1 px-2">
                                                    <span className='w-full h-[1.3rem] borde text-md font-bold'>{session?.user?.role !== "professional" ? p?.prof?.name : p?.user?.name ?? "NaN"}</span>
                                                    <span className='text-sm line-clamp-1'>{p?.messages[p?.messages.length - 1]?.message}</span>
                                                    <span className='text-sm text-end'>{p?.messages[p?.messages.length - 1]?.time}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })
                        }
                    </div>
                </div>
                <div className="w-full md:w-[80%] h-full px-1 md:px-0">
                    {/* {children} */}
                    <ChatMessagePanel userEmail={userEmail} profEmail={profEmail} presonName={session?.user?.role !== "professional" ? (chatPersons.filter((c) => c.prof.email === profEmail)[0]?.prof?.name) : (chatPersons.filter((c) => c.user.email === userEmail)[0]?.user?.name)} profPfp={chatPersons.filter((c) => c.prof.email == profEmail)[0]?.prof?.pfp} fetchChatPersons={fetchChatPersons} userRole={session?.user?.role} />
                </div>
            </section>
        </>
    )
}

export default ChatPage;