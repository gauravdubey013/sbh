"use client"

import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";

const ServiceCompo = () => {
  const [profDBCollection, setProfDBCollection] = useState(null);
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
        setProfDBCollection(dBData);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (!profDBCollection) {
      fetchProfDBCollectionInfo();
    }
    if (profDBCollection == undefined) {
      // console.log(profDBCollection);
      fetchProfDBCollectionInfo();
    }
  }, [profDBCollection]);

  return (
    <>
      <div className="w-full h-auto flex flex-col gap-1">
        <div className="w-full h-full">
          <h2 className="text-xl font-bold">House & Home</h2>
          <div className="w-full h-full">
            <Carousel profDBCollectionData={profDBCollection} />
          </div>
        </div>
        <div className="w-full h-full">
          <h2 className="text-xl font-bold">Health & Wellness</h2>
          <div className="w-full h-full">
            <Carousel profDBCollectionData={profDBCollection} />
          </div>
        </div>
        <div className="w-full h-full">
          <h2 className="text-xl font-bold">Events & Entertainers</h2>
          <div className="w-full h-full">
            <Carousel profDBCollectionData={profDBCollection} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCompo;


//  web_development
//  graphic_design
//  writing

// 1. Health & Wellness :
// personal_trainer
// nutritionist
// yoga_instructor
// health_coach
// mental_health_counselor

// 2. Events & Entertainment :
// event_planner
// dj_musician
// photographer_videographer
// party_entertainer
// wedding_planne

// 3. house and home :
// gardener
// interior_decorator
// painters
// electrician
// house_cleaner
// plumber
// house_helper
