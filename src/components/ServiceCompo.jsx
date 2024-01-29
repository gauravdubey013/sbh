"use client"
import React, { useEffect, useState } from "react";
import { eventsEntertainment, healthWellness, houseHome } from "@/context/data";
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

  // Filter professionals by service
  const getFilteredProfessionals = (services) => {
    if (profDBCollection) {
      return profDBCollection.filter(professional => services.includes(professional.service));
    } else {
      return []; // Return an empty array if profDBCollection is null
    }
  };
  return (
    <>
      <div className="w-full h-auto flex flex-col gap-1">
        <div className="w-full h-full">
          <h2 className="text-xl font-bold">House & Home</h2>
          <div className="w-full h-full">
            <Carousel profDBCollectionData={getFilteredProfessionals(houseHome)} />
          </div>
        </div>
        <div className="w-full h-full">
          <h2 className="text-xl font-bold">Health & Wellness</h2>
          <div className="w-full h-full">
            <Carousel profDBCollectionData={getFilteredProfessionals(healthWellness)} />
          </div>
        </div>
        <div className="w-full h-full">
          <h2 className="text-xl font-bold">Events & Entertainers</h2>
          <div className="w-full h-full">
            <Carousel profDBCollectionData={getFilteredProfessionals(eventsEntertainment)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCompo;
