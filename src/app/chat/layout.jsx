import React from 'react'
import Link from 'next/link';

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
]

const ChatPage = ({ children }) => {
    return (
        <>
            <section className='w-full h-[78vh] flex overflow-hidden'>
                <div className="w-[20%] h-auto border-r border-[#53c28b] p-2 flex flex-col gap-2 scrollDiv overflow-y-scroll scroll-snap-type-x-mandatory overflow-hidden">
                    {users.map((u) => (
                        <Link href={`/chat/${u.name}`} key={u.id} className="w-full h-[3rem] bg-[#48ffa363] rounded-xl flex gap-1 items-center px-1 active:scale-95 ease-in-out duration-200">
                            <div className="w-9 h-9 bbg rounded-full overflow-hidden flex items-center justify-center">{u.id}</div>
                            <div className="w-full h-full border-l-[px] border-[#53c28b] rounded-l flex flex-col gap-1 px-2">
                                <span className='w-full h-[1.3rem] borde text-md font-bold'>{u.name}</span>
                                <span className='text-sm'>last msg</span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="w-[80%] h-full p-4">
                    {children}
                </div>
            </section>
        </>
    )
}

export default ChatPage;