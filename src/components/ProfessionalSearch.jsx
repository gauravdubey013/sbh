"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Loading from '@/app/loading';

const ProfessionalSearch = (props) => {
    // const { profDBCollectionData } = props;
    const { profDBCollectionData, bg, defH, mdH, lgH, profile } = props;

    const [data, setData] = useState([]);
    useEffect(() => {
        if (profDBCollectionData) {
            // console.log(data ?? "email");
            setData(profDBCollectionData);
        }
    }, [profDBCollectionData]);
    return (
        <>
            <section className='w-full h-auto p-2 grid grid-flow-row grid-rows-1 grid-cols-2 md:grid-rows-2 md:grid-cols-2 lg:grid-rows- lg:grid-cols-5 gap-2 overflow-hidden ease-in-out duration-300'>
                {!data[0] &&
                    <div className="w-screen h-[78vh] flex items-center justify-center">
                        <Loading />
                    </div>
                }
                {data &&
                    data.map((prof) => (
                        <div
                            className={`w-auto h-[15rem] md:h-[14.5rem] lg:h-[20rem] borde ease-in-out duration-300 overflow-hidden rounded-lg`}
                            key={prof._id}
                        >
                            <div
                                className={`w-full h-full scale-95 hover:scale-100 shadow-lg duration-300 rounded-lg flex flex-col items-center justify-center overflow-hidden`}
                            >
                                <div
                                    className={`w-full h-full bbg border border-[#53c28b] rounded-lg -mb-[80px]`}
                                >
                                    <div className="w-full h-auto -translate-y-[56px] lg:-translate-y-[46.5px] flex justify-center">
                                        <Image
                                            src={prof?.profileImgPath ?? "/assets/bg6.png"}
                                            alt="url"
                                            // fill="true"
                                            width={100}
                                            height={100}
                                            className=" w-[8rem] h-[8rem] bbg scale-75 lg:scale-90 rounded-full shadow-md ease-in-out duration-500"
                                        />
                                    </div>
                                    <div className="fontFam w-full h-auto z-10 -translate-y-20 lg:-translate-y-16 bg-transparent bottom-0 rounded-lg p-2 overflow-hidden flex flex-col gap-1">
                                        <h2 className="text-md md:text-lg font-semibold">
                                            {prof?.name ?? "Name Rakhsita"}
                                        </h2>
                                        <span className="h-[4rem] text-sm line-clamp-3 -mt-2">
                                            {prof?.bio !== "null" ? prof?.bio ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quisquam saepe quae dolorem distinctio optio perspiciatis consequuntur tempora labore eos." : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quisquam saepe quae dolorem distinctio optio perspiciatis consequuntur tempora labore eos."}
                                        </span>
                                        <div className="w-full h-auto flex flex-row lg:flex-col gap-[1px] md:gap-1 bottom-0">
                                            <div className="review w-[4rem] lg:w-full h-[3rem] bg-[#53c28b] rounded-3xl flex gap-1 items-center justify-center">
                                                {prof?.skillLevel}
                                                <span className="hidden lg:flex"> Years of Exp.</span>
                                            </div>
                                            <Link
                                                href={`/profile/${prof?.email ?? "dubeygaurav520@gmail.com"}`}
                                                className="allBtn w-full h-[3rem] text-sm rounded-3xl text-center"
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

export default ProfessionalSearch