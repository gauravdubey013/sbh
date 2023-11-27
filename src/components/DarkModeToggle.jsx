"use client";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext.js";

const DarkModeToggle = () => {
    //   const mode = "light";
    const { toggle, mode } = useContext(ThemeContext);
    return (
        <>
            <div className="darkContainer cursor-pointer relative flex justify-between items-center p-[3.5px] border-[1.5px] border-solid border-[#53c28b70] rounded-[30px] w-[42px] h-[24px]"
                onClick={toggle}
            >
                <div className="icon text-[10px]">🌙</div>
                <div className="icon text-[10px]">🌤️</div>
                <div className={`ball w-[15px] h-[15px] bg-[#53c28b] rounded-[50%] absolute ${mode === "light" ? "left-[2px]" : "right-[2px]"
                    } ease-in-out duration-700`} />
            </div>
        </>
    );
};

export default DarkModeToggle;
