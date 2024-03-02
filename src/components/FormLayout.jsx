"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "@/app/loading";

export default function FormLayout(props) {
  const { page, image, setForm } = props;
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession(); //session
  let verified = props.setVerified;

  useEffect(() => {
    if (page == "payment1") {
      if (sessionStatus !== "authenticated") return router.replace("/");

    }
    if (page == "form") if (sessionStatus == "authenticated") return router.replace("/");

  }, [sessionStatus, router]);

  const imageLoader = ({ src, width, quality }) => {
    const origin = process.env.HOSTNAME || window.location.origin;
    return `${origin}${src}?w=${width}&q=${quality || 75}`;
  };
  if (sessionStatus === "loading" || verified) {
    return <Loading />;
  }
  return (
    // sessionStatus !== "authenticated" && (
    <>
      <div className="w-full h-[80vh] md:h-[77vh] flex justify-center items-center animate-fade-in-down">
        <div className="w-[95%] md:w-[85%] xl:w-[75%] h-[90%] border-[1px] border-solid border-[#53c28b]/90 rounded-2xl shadow-lg flex flex-rol overflow-hidden ease-in-out duration-300">
          <div className="w-[50%] h-full hidden sm:flex justify-center items-cent rounded-xl ease-in-out duration-300">
            <Image
              src={image ?? "/assets/authImg.png"}
              alt="authImg"
              priority={true}
              // loader={imageLoader}
              width={400}
              height={400}
              className="contactImg w-auto h-auto object-contain animate-[moveCon_2s_infinite_ease_alternate]"
            />
          </div>
          <div className="scrollDiv overflow-y-scroll scroll-snap-type-x-mandatory w-full sm:w-[50%] h-full flex flex-wrap items-center justify-center">
            {setForm}
          </div>
        </div>
      </div>
    </>
  )
  // );
}
