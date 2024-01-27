"use client";
import React, { useEffect, useState } from 'react'
import ProfessionalSearch from '@/components/ProfessionalSearch';

const ProfessioalSearchPage = () => {
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
        <ProfessionalSearch profDBCollectionData={profDBCollection} />
        // <div >ProfessioalSearchPage</div>
    )
}

export default ProfessioalSearchPage