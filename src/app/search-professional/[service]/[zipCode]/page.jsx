"use client";
import React, { useEffect, useState } from 'react'
import ProfessionalSearch from '@/components/ProfessionalSearch';
import { FaMapLocationDot } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';

const ProfessioalSearchPage = ({ params }) => {
    const [service, setService] = useState(params.service.toString())
    const [zipCode, setZipCode] = useState(params.zipCode.toString())
    const [serviceData, setServiceData] = useState(null);

    const fetchProfDBCollectionInfo = async () => {
        const setOfColletion = "prof";
        try {
            const res = await fetch("/api/get-db-collection", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    setOfColletion,
                }),
            });

            if (res.status === 400) {
                console.log("Collections doesn't exists in database!");
            }
            if (res.status === 200) {
                const dBData = await res.json();
                setServiceData(dBData.filter(profService => profService.service === service))
            }
        } catch (error) {
            console.log("Error", error);
        }
    };


    useEffect(() => {
        if (!serviceData && serviceData == undefined && serviceData == null) {
            fetchProfDBCollectionInfo();
        }

    }, [serviceData]);

    const getFilteredProfessionals = (zipCodeFetch) => {
        if (serviceData) {
            return serviceData.filter(profZipCode => profZipCode.zipCode === zipCodeFetch);
        } else {
            return [];
        }
    };
    return (
        <>
            <form className=" w-full h-auto p-2 animate-fade-in-down flex flex-col sm:flex-row gap-1 md:items-center md:justify-center sm:gap-0 ease-in-out duration-300">
                <select
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    placeholder="Freelancer Category"
                    required
                    className="w-[22rem] md:w-[18rem] lg:w-[22rem] h-[3rem] p-2 placeholder:text-[#fff]/[0.9] text-[#fff]/[0.9] outline-none bg-transparent rounded-md sm:rounded-r-none border-[2px] border-solid border-[#e6e7ec]/50 shadow-sm hover:border-[#53c28b] focus:border-b-[#53c28b] hover:placeholder:text-[#53c28b] ease-in-out duration-500"
                >
                    <option value="" disabled selected hidden>
                        What service are you looking for?
                    </option>
                    <option className="ddl" value="writing">Writer</option>
                    <option className="ddl" value="plumber">Plumber</option>
                    <option className="ddl" value="painters">Painters</option>
                    <option className="ddl" value="gardener">Gardener</option>
                    <option className="ddl" value="electrician">Electrician</option>
                    <option className="ddl" value="health_coach">Health Coach</option>
                    <option className="ddl" value="dj_musician">DJ / Musician</option>
                    <option className="ddl" value="house_helper">House Helper</option>
                    <option className="ddl" value="nutritionist">Nutritionist</option>
                    <option className="ddl" value="event_planner">Event Planner</option>
                    <option className="ddl" value="house_cleaner">House Cleaner</option>
                    <option className="ddl" value="graphic_design">Graphic Design</option>
                    <option className="ddl" value="yoga_instructor">Yoga Instructor</option>
                    <option className="ddl" value="wedding_planner">Wedding Planner</option>
                    <option className="ddl" value="web_development">Web Development</option>
                    <option className="ddl" value="personal_trainer">Personal Trainer</option>
                    <option className="ddl" value="party_entertainer">Party Entertainer</option>
                    <option className="ddl" value="interior_decorator">Interior Decorator</option>
                    <option className="ddl" value="mental_health_counselor">Mental Health Counselor</option>
                    <option className="ddl" value="photographer_videographer">Photographer / Videographer</option>
                </select>

                <div className="flex gap-1 items-center">
                    <div className="locIcon w-full md:w-[12rem] h-[3rem] cursor-text hover:border-b-[2px] hover:border-b-[#53c28b] flex items-center px-2 rounded-md sm:rounded-l-none border-[2px] border-solid border-[#e6e7ec]/50 shadow-sm ease-in-out duration-500">
                        <FaMapLocationDot size={20} className="" />
                        <input
                            type="text"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value).replace(/[^\d]/g, "")}
                            required
                            placeholder="Pin Code"
                            className="w-[90%] h-full bg-transparent outline-none p-2 placeholder:text-[#fff]/[0.9] text-[#fff]/[0.9] hover:placeholder:text-[#53c28b]"
                        />
                    </div>
                    <button type="submit" onClick={(e) => {
                        e.preventDefault()
                        fetchProfDBCollectionInfo()
                    }} className="allBtn w-full md:w-[8rem] h-[3rem] text-xl rounded-md">
                        <CiSearch size={25} className="font-bold" />Search
                    </button>
                </div>
            </form>
            <ProfessionalSearch profDBCollectionData={getFilteredProfessionals(zipCode)} />
        </>
    )
}

export default ProfessioalSearchPage