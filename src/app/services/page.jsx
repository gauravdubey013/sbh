import React from "react";
import ServiceCompo from "@/components/ServiceCompo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Services = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/signIn");
  }
  return (
    <div>
      <ServiceCompo />
    </div>
  );
};
export default Services;
