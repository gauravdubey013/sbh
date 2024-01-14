"use client";
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";
import Loading from "@/app/loading";

const ProfilePage = ({ params }) => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus !== "authenticated") {
      router.replace("/signIn");
    }
  }, [sessionStatus, router]);
  if (sessionStatus === "loading") {
    return <Loading />;
  }
  return (
    sessionStatus === "authenticated" && (
      <>
        <div className="">
          <Profile setEmail={decodeURIComponent(params.email)} />
        </div>
      </>
    )
  );
};

export default ProfilePage;
