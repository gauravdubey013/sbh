"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Loading from '@/app/loading';

const ProfessionalSearch = (props) => {
    const { profDBCollectionData } = props;

    const [data, setData] = useState([]);
    useEffect(() => {
        if (profDBCollectionData) {
            // console.log(data ?? "email");
            setData(profDBCollectionData);
        }
    }, [profDBCollectionData]);
    return (
        <>
            <section className='w-full h-auto p-2 grid grid-flow-row grid-cols-2 md:grid-rows-2 md:grid-cols-3 lg:grid-cols-5 gap-2 overflow-hidden ease-in-out duration-300'>
                {!data[0] &&
                    <div className="w-screen h-[78vh] flex items-center justify-center">
                        <Loading />
                    </div>
                }
                {data &&
                    data.map((prof) => (
                        <div
                            className={`w-auto h-[15rem] md:h-[14.5rem] lg:h-[20rem] animate-slideDown ease-in-out duration-300 overflow-hidden rounded-lg`}
                            key={prof._id}
                        >
                            <div
                                className={`w-full h-full relative scale-95 border-[#53c28b] hover:scale-100 shadow-lg duration-300 rounded-lg flex flex-col items-center justify-end overflow-hidden`}
                            >
                                <div className="absolute top-0 z-20 w-[5rem] h-[5rem] md:w-[8rem] md:h-[8rem] bbg rounded-full overflow-hidden">
                                    <Image
                                        src={prof?.profileImgPath ?? "/assets/bg6.png"}
                                        alt="prof-profile"
                                        // fill="true"
                                        width={100}
                                        height={100}
                                        className=" w-full h-full bbg shadow-md"
                                    />
                                </div>
                                <div className="w-full h-[85%] md:h-[80%] z-10 border border-[#53c28b] rounded-lg flex items-end overflow-hidden">
                                    <div className="w-full h-[80%] md:h-[77%] rounded-lg px-2 overflow-hidden">
                                        <h2 className="text-sm md:text-lg font-semibold">
                                            {prof?.name ?? "name"}
                                        </h2>
                                        <div className="h-[2.3rem] md:h-[1rem] text-sm"><span className="text-[#53c28b]">Service : </span>{prof?.service ?? "service"}</div>
                                        <div className="h-[1rem] text-sm"><span className="text-[#53c28b]">Zip Code : </span>{prof?.zipCode ?? "zipCode"}</div>
                                        <span className="h-[3rem] md:h-[4rem] text-sm line-clamp-1 md:line-clamp-3">
                                            {prof?.bio !== "null" ? prof?.bio ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quisquam saepe quae dolorem distinctio optio perspiciatis consequuntur tempora labore eos." : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quisquam saepe quae dolorem distinctio optio perspiciatis consequuntur tempora labore eos."}
                                        </span>
                                        <div className="absolute w-full h-[2.3rem] md:h-auto scale-95 bbg flex flex-row lg:flex-col gap-[1px] md:gap-1 items-center justify-center bottom-0 -ml-2 mb-[2px]">
                                            <div className="review w-[3rem] lg:w-full h-[2rem] bg-[#53c28b] rounded-3xl flex gap-1 items-center justify-center">
                                                {prof?.skillLevel ?? "experience"}
                                                <span className="hidden lg:flex"> Years of Exp.</span>
                                            </div>
                                            <Link
                                                href={`/profile/${prof?.email ?? "dubeygaurav520@gmail.com"}`}
                                                className="allBtn w-full h-[2rem] text-sm rounded-3xl text-center"
                                            >
                                                View more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </section>
        </>
    )
}

export default ProfessionalSearch;