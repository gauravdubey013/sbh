import React from "react";
import ProfileCompo from "@/components/Profile";

const Profile = ({ params }) => {
  return (
    <>
      <div className="">
        <ProfileCompo setEmail={decodeURIComponent(params.email)} />
      </div>
    </>
  );
};

export default Profile;
