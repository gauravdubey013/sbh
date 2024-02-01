"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { Squash as Hamburger } from "hamburger-react";


export const users = [
    {
        id: 1,
        name: "nameOne",
    },
    {
        id: 2,
        name: "nameTwo",
    },
    {
        id: 3,
        name: "nameThree",
    },
    {
        id: 4,
        name: "name4",
    },
    {
        id: 5,
        name: "name5",
    },
    {
        id: 6,
        name: "name6",
    },
    {
        id: 7,
        name: "name7",
    },
    {
        id: 8,
        name: "name8",
    },
    {
        id: 9,
        name: "name9",
    },
    {
        id: 10,
        name: "name10",
    },
    {
        id: 11,
        name: "name11",
    },
    {
        id: 12,
        name: "name11",
    },
    {
        id: 13,
        name: "name11",
    },
    {
        id: 14,
        name: "name11",
    },
    {
        id: 15,
        name: "name11",
    },
    {
        id: 16,
        name: "name11",
    },
    {
        id: 17,
        name: "name11",
    },
    {
        id: 18,
        name: "name11",
    },
    {
        id: 19,
        name: "name11",
    },
]

const ChatPage = ({ children }) => {
    const [toggle, setToggle] = useState(false);

    return (
        <>
            <section className='w-full h-[78vh] flex relative overflow-hidden'>
                <div className={`w-[80%] md:w-[20%] h-full absolute md:relative border-r border-[#53c28b] z-20 ${!toggle ? "-left-[72%] md:left-0" : "left-0"} ease-in-out duration-500`}>
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
                    <div className={`w-full h-[71vh] md:h-full borde ${!toggle ? "opacity-0 animate-fade-in-up md:opacity-100" : "opacity-100 animate-fade-in-down"} flex flex-col gap-2 p-2 scrollDiv overflow-y-scroll scroll-snap-type-x-mandatory overflow-hidden ease-in-out duration-300`}>
                        {users.map((u) => (
                            <Link href={`/chat/${u.name}`} onClick={() => setToggle(!toggle)} key={u.id} className="w-full h-[3rem] bg-[#48ffa363] rounded-xl flex gap-1 items-center px-1 active:scale-95 ease-in-out duration-200">
                                <div className="w-9 h-9 bbg rounded-full overflow-hidden flex items-center justify-center">{u.id}</div>
                                <div className="w-full h-full border-l-[px] border-[#53c28b] rounded-l flex flex-col gap-1 px-2">
                                    <span className='w-full h-[1.3rem] borde text-md font-bold'>{u.name}</span>
                                    <span className='text-sm'>last msg</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-[80%] h-full p-4 relative z-0">
                    {children}
                </div>
            </section>
        </>
    )
}

export default ChatPage;