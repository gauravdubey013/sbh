import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <>
      <div className="w-full h-[77vh] flex items-center justify-center text-center relative scale-50">
        <Image
          src="/assets/loadingThreeRotate.gif"
          alt="authImg"
          width={400}
          // fill={true}
          height={400}
          className="w-auto h-auto absolute animate-[moveCon_1s_infinite_ease_alternate]"
        />
      </div>
    </>
  );
}
