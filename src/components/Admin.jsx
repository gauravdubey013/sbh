"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Admin = () => {
  const [dBCollection, setDBCollection] = useState(null);

  const [isUserOpen, setIsUserOpen] = useState(true);
  const [isProfOpen, setIsProfOpen] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);
  const activeCss = "bg-[#53c28b]";

  useEffect(() => {
    const dbCollectionInfo = async () => {
      try {
        const res = await fetch("/api/get-db-collection", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 400) {
          console.log("Collections doesn't exists in database!");
        }
        if (res.status === 200) {
          const dBData = await res.json();
          //   console.log("DBData: ", dBData);
          setDBCollection(dBData);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    if (!dBCollection) {
      dbCollectionInfo();
    }
  }, [dBCollection]);

  const usersCollection = dBCollection?.usersCollection;
  const profsCollection = dBCollection?.profsCollection;
  const contactUsCollection = dBCollection?.contactUsCollection;
  return (
    <>
      <section className="w-full h-[78vh] flex flex-row animate-slideDown">
        <div className="adminNav w-[20%] h-full p-2 border-r-[0.5px] border-[#53c28b] flex flex-col gap-4">
          <div
            onClick={() => {
              !isUserOpen ? setIsUserOpen(!isUserOpen) : "";
              isProfOpen ? setIsProfOpen(!isProfOpen) : "";
              isContactUsOpen ? setIsContactUsOpen(!isContactUsOpen) : "";
            }}
            className={`w-full h-[6vh] rounded-md cursor-pointer hover:bg-[#48ffa363] active:scale-90 flex items-center justify-center ${
              isUserOpen == true ? activeCss : ""
            } shadow-sm hover:shadow-xl shadow-[#53c28b] ease-in-out duration-300`}
          >
            User
          </div>
          <div
            onClick={() => {
              !isProfOpen ? setIsProfOpen(!isProfOpen) : "";
              isUserOpen ? setIsUserOpen(!isUserOpen) : "";
              isContactUsOpen ? setIsContactUsOpen(!isContactUsOpen) : "";
            }}
            className={`w-full h-[6vh] rounded-md cursor-pointer hover:bg-[#48ffa363] active:scale-90 flex items-center justify-center ${
              isProfOpen == true ? activeCss : ""
            } shadow-sm hover:shadow-xl shadow-[#53c28b] ease-in-out duration-300`}
          >
            Professional
          </div>
          <div
            onClick={() => {
              !isContactUsOpen ? setIsContactUsOpen(!isContactUsOpen) : "";
              isProfOpen ? setIsProfOpen(!isProfOpen) : "";
              isUserOpen ? setIsUserOpen(!isUserOpen) : "";
            }}
            className={`w-full h-[6vh] rounded-md cursor-pointer hover:bg-[#48ffa363] active:scale-90 flex items-center justify-center ${
              isContactUsOpen == true ? activeCss : ""
            } shadow-sm hover:shadow-xl shadow-[#53c28b] ease-in-out duration-300`}
          >
            Contact Us
          </div>
        </div>
        <div className="adminNav w-[80%] h-auto animate-fade-in-down scrollDiv overflow-y-scroll scroll-snap-type-x-mandatory overflow-hidden">
          {isUserOpen && (
            <div className="animate-fade-in-down">
              <UserData usersCollection={usersCollection} />
            </div>
          )}
          {isProfOpen && (
            <div className="animate-fade-in-down">
              <ProfData profsCollection={profsCollection} />
            </div>
          )}
          {isContactUsOpen && (
            <div className="animate-fade-in-down">
              <ContactUsData contactUsCollection={contactUsCollection} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Admin;

export const UserData = (props) => {
  const { usersCollection } = props;
  const [data, setData] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState();
  const activeCss = "bg-[#48ffa363]";

  useEffect(() => {
    if (usersCollection) {
      setData(usersCollection);
    }
  }, [usersCollection]);

  return (
    <>
      <section className="w-full h-auto relative flex items-cente justify-center">
        <div className="w-full h-full p-2 grid grid-flow-row grid-rows-1 grid-cols-1 md:grid-rows-2 md:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 gap-2 overflow-hidden ease-in-out duration-300">
          {data.map((i) => {
            //   console.log(i?.email ?? "email");
            return (
              <div
                key={i._id}
                onClick={() => {
                  if (i == editData) setIsEditOpen(!isEditOpen);
                  setEditData(i);
                  //   if (isEditOpen == true) setEditData();
                }}
                className={` ${
                  i == editData && isEditOpen ? activeCss : ""
                } w-auto h-auto border rounded-lg flex flex-row items-center justify-center gap-1 p-1 cursor-pointer shadow-md hover:shadow-xl shadow-[#53c28b] scale-95 hover:scale-100 active:scale-95 ease-in-out duration-300`}
              >
                <div className="w-[20%] borde rounded-full text-center overflow-hidden">
                  {/* pfp */}
                  <Image
                    src={i?.profileImgPath ?? "/assets/bg6.png"}
                    alt={"userProfile"}
                    priority={true}
                    width={800}
                    height={800}
                    className="w-full h-full shadow-md z-10 scale-75"
                  />
                </div>
                <div className="w-full flex flex-col gap-[1px] text-base">
                  <div className="font-bold">{i?.name ?? "name"}</div>
                  <div className="text-sm">{i?.email ?? "email"}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`${
            !isEditOpen ? "-mr-[40%]" : "mr-0 static"
          } w-[40%] h-[76vh] p-2 scrollDiv overflow-y-scroll scroll-snap-type-x-mandatory overflow-hidden flex flex-col gap-2 items-center justify-center border rounded-xl bbg ease-in-out duration-100`}
        >
          Edit User
          <UserEditPanel editData={editData} />
        </div>
      </section>
    </>
  );
};

export const UserEditPanel = (props) => {
  const { editData } = props;

  const [userEdit, setUserEdit] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserEdit({
      ...userEdit,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("oldEmail", editData?.email);
    data.set("email", userEdit.email);
    data.set("name", userEdit.name);
    data.set("role", userEdit.role);

    try {
      const res = await fetch("/api/auth/admin-user-edit", {
        method: "POST",
        body: data,
      });
      if (res.status === 400) {
        setError("Invalid user! try again later");
        setDisableBtn(false);
        setSuccess(false);
      } else if (res.status === 500) {
        setError("Img & resume file aren't supported!");
        setDisableBtn(false);
      } else if (res.status === 200) {
        setError("");
        setSuccess(true);
        setUserEdit({
          name: "",
          email: "",
          role: "",
        });
      }
      setDisableBtn(false);
    } catch (error) {
      setDisableBtn(false);
      setError(error);
      console.error("Error", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full h-auto flex flex-col gap-1"
      >
        <input
          type="text"
          name="name"
          value={userEdit.name}
          onChange={handleChange}
          placeholder={`Name - ${editData?.name ?? "NaN"}`}
          className="allFormInput h-[52px]"
        />
        <input
          type="email"
          name="email"
          value={userEdit.email}
          onChange={handleChange}
          placeholder={`Email - ${editData?.email ?? "NaN"}`}
          className="allFormInput h-[52px]"
        />
        <input
          type="text"
          name="role"
          value={userEdit.role}
          onChange={handleChange}
          placeholder={`Role - ${editData?.role ?? "NaN"}`}
          className="allFormInput h-[52px]"
        />
        <span
          className={`${
            error ? "flex text-red-500 animate-slideDown" : "hidden"
          }`}
        >
          {error}
        </span>
        <span
          className={`${
            success ? "flex text-[#53c28b] animate-slideDown" : "hidden"
          }`}
        >
          Updated successfully!
        </span>
        <button
          disabled={disableBtn}
          type="submit"
          className={`allBtn w-[rem] h-[3rem] text-xl rounded-3xl mb-4 ${
            disableBtn
              ? " opacity-70 active:scale-95 hover:scale-95 active:text-xl"
              : ""
          }`}
        >
          {disableBtn ? (
            <span className="animate-pulse">Updating...</span>
          ) : (
            "Update"
          )}
        </button>
      </form>
    </>
  );
};

export const ProfData = (props) => {
  const { profsCollection } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (profsCollection) {
      setData(profsCollection);
    }
  }, [profsCollection]);

  return (
    <>
      <section className="w-full h-auto p-2 grid grid-flow-row grid-rows-1 grid-cols-1 md:grid-rows-2 md:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 gap-2 overflow-hidden ease-in-out duration-300">
        {data.map((i) => {
          //   console.log(i?.email ?? "email");
          return (
            <div
              key={i._id}
              className="w-auto h-[15vh] border rounded-lg flex flex-row gap-1 p-1 cursor-pointer shadow-md hover:shadow-xl shadow-[#53c28b] scale-95 hover:scale-100 active:scale-95 ease-in-out duration-300"
            >
              <div className="w-auto borde rounded-full text-center overflow-hidden">
                {/* pfp */}
                <Image
                  src={i?.profileImgPath ?? "/assets/loading3d360Rotate.gif"}
                  alt={"userProfile"}
                  priority={true}
                  width={800}
                  height={800}
                  className="w-full h-full shadow-md z-10"
                />
              </div>
              <div className="w-full flex flex-col gap-[1px] text-center p-1">
                <div className="text-sm">{i?.email ?? "email"}</div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export const ContactUsData = (props) => {
  const { contactUsCollection } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (contactUsCollection) {
      setData(contactUsCollection);
    }
  }, [contactUsCollection]);
  console.log(contactUsCollection);

  return (
    <>
      <section className="w-full h-auto p-2 grid grid-flow-row grid-rows-1 grid-cols-1 md:grid-rows-2 md:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 gap-2 overflow-hidden ease-in-out duration-300">
        {data.map((i) => {
          //   console.log(i?.email ?? "email");
          return (
            <div
              key={i._id}
              className="w-auto h-auto border rounded-lg flex flex-row items-center justify-center gap-1 p-1 cursor-pointer shadow-md hover:shadow-xl shadow-[#53c28b] scale-95 hover:scale-100 active:scale-95 ease-in-out duration-300"
            >
              <div className="w-auto borde rounded-full text-center overflow-hidden">
                {/* pfp */}
                <Image
                  src={i?.profileImgPath ?? "/assets/loading3d360Rotate.gif"}
                  alt={"userProfile"}
                  priority={true}
                  width={800}
                  height={800}
                  className="w-full h-full shadow-md z-10"
                />
              </div>
              <div className="w-full flex flex-col gap-[1px] text-cente p-1">
                <div className="font-bold">
                  {`${i?.firstname} ${i?.lastname}` ?? "name"}
                </div>
                <div className="text-sm">{i?.email ?? "email"}</div>
                <div className="text-sm">{i?.message ?? "message"}</div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};
