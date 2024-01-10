"use client";
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileCompo from "@/components/Profile";
import Loading from "@/app/loading";

const Profile = ({ params }) => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus !== "authenticated") {
      router.replace("/signUp");
    }
  }, [sessionStatus, router]);
  if (sessionStatus === "loading") {
    return <Loading />;
  }
  return (
    sessionStatus === "authenticated" && (
      <>
        <div className="">
          <ProfileCompo setEmail={decodeURIComponent(params.email)} />
        </div>
      </>
    )
  );
};

export default Profile;
