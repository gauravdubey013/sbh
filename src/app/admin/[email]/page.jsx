"use client";
import React, { useEffect } from "react";
import Admin from "@/components/Admin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const AdminPage = ({ params }) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      sessionStatus !== "authenticated" &&
      session?.user?.email !== decodeURIComponent(params.email)
    ) {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  if (sessionStatus === "loading") {
    return <Loading />;
  }
  return (
    <>
      <Admin />
    </>
  );
};

export default AdminPage;
