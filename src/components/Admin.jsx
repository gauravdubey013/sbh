"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/app/loading";
import { WiCloudRefresh } from "react-icons/wi";
import { FaUserTie, FaUsers, FaUsersSlash } from "react-icons/fa6";
import { PiUserListFill } from "react-icons/pi";

const Admin = () => {
  const [dBCollection, setDBCollection] = useState(null);
  const [refDb, setRefDb] = useState(false);

  const [isUserOpen, setIsUserOpen] = useState(true);
  const [isProfOpen, setIsProfOpen] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);
  const [isDelUserOpen, setIsDelUserOpen] = useState(false);
  const activeCss = "bg-[#53c28b]";

  const fetchDBCollectionInfo = async () => {
    try {
      const res = await fetch("/api/get-db-collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 400) {
        console.log("Collections doesn't exists in database!");
      }
      if (res.status === 200) {
        const dBData = await res.json();
        setDBCollection(dBData);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (!dBCollection) {
      fetchDBCollectionInfo();
      console.log(dBCollection);
    }
  }, [dBCollection]);

  if (refDb == true) {
    // setDBCollection(null)
    fetchDBCollectionInfo();
    console.log("DB Refreshed: " + refDb);
    setRefDb(false)
  }
  const usersCollection = dBCollection?.usersCollection;
  const deletedUsersCollection = dBCollection?.deletedUsersCollection;
  const profsCollection = dBCollection?.profsCollection;
  const contactUsCollection = dBCollection?.contactUsCollection;
  return (
    <>
      <section className="w-full h-[78vh] flex flex-row animate-slideDown">
        <div className="adminNav w-[20%] h-full p-2 border-r-[0.5px] border-[#53c28b] flex flex-col gap-4 items-center">
          <button className="allBtn w-full h-[2.5rem] rounded-md" onClick={() => {
            setDBCollection(null)
            fetchDBCollectionInfo()
          }}>
            <span className="md:hidden"><WiCloudRefresh size={40} /></span>
            <span className="hidden md:flex">Refresh DB</span>
          </button>
          <div
            onClick={() => {
              !isUserOpen ? setIsUserOpen(!isUserOpen) : "";
              isProfOpen ? setIsProfOpen(!isProfOpen) : "";
              isContactUsOpen ? setIsContactUsOpen(!isContactUsOpen) : "";
              isDelUserOpen ? setIsDelUserOpen(!isDelUserOpen) : "";
            }}
            className={`w-full h-[6vh] rounded-md cursor-pointer md:hover:bg-[#48ffa363] active:scale-90 flex items-center justify-center ${isUserOpen == true ? activeCss : ""
              } shadow-sm hover:shadow-xl shadow-[#53c28b] ease-in-out duration-300`}
          >
            <span className="md:hidden"><FaUsers size={30} /></span>
            <span className="hidden md:flex">User</span>
          </div>
          <div
            onClick={() => {
              !isProfOpen ? setIsProfOpen(!isProfOpen) : "";
              isUserOpen ? setIsUserOpen(!isUserOpen) : "";
              isContactUsOpen ? setIsContactUsOpen(!isContactUsOpen) : "";
              isDelUserOpen ? setIsDelUserOpen(!isDelUserOpen) : "";
            }}
            className={`w-full h-[6vh] rounded-md cursor-pointer md:hover:bg-[#48ffa363] active:scale-90 flex items-center justify-center ${isProfOpen == true ? activeCss : ""
              } shadow-sm hover:shadow-xl shadow-[#53c28b] ease-in-out duration-300`}
          >
            <span className="md:hidden"><FaUserTie size={30} /></span>
            <span className="hidden md:flex">Professional</span>
          </div>
          <div
            onClick={() => {
              !isContactUsOpen ? setIsContactUsOpen(!isContactUsOpen) : "";
              isProfOpen ? setIsProfOpen(!isProfOpen) : "";
              isUserOpen ? setIsUserOpen(!isUserOpen) : "";
              isDelUserOpen ? setIsDelUserOpen(!isDelUserOpen) : "";
            }}
            className={`w-full h-[6vh] rounded-md cursor-pointer md:hover:bg-[#48ffa363] active:scale-90 flex items-center justify-center ${isContactUsOpen == true ? activeCss : ""
              } shadow-sm hover:shadow-xl shadow-[#53c28b] ease-in-out duration-300`}
          >
            <span className="md:hidden"><PiUserListFill size={30} /></span>
            <span className="hidden md:flex">Contact Us</span>
          </div>
          <div
            onClick={() => {
              !isDelUserOpen ? setIsDelUserOpen(!isDelUserOpen) : "";
              isUserOpen ? setIsUserOpen(!isUserOpen) : "";
              isProfOpen ? setIsProfOpen(!isProfOpen) : "";
              isContactUsOpen ? setIsContactUsOpen(!isContactUsOpen) : "";
            }}
            className={`w-full h-[6vh] rounded-md cursor-pointer md:hover:bg-[#48ffa363] active:scale-90 flex items-center justify-center ${isDelUserOpen == true ? activeCss : ""
              } shadow-sm hover:shadow-xl shadow-[#53c28b] ease-in-out duration-300`}
          >
            <span className="md:hidden"><FaUsersSlash size={30} /></span>
            <span className="hidden md:flex">Deleted User</span>

          </div>
        </div>

        {!dBCollection ? <Loading /> :
          <div className="adminNav w-full h-[78vh] animate-fade-in-down overflow-hidden">
            {isUserOpen && (
              <div className="animate-fade-in-down">
                <UserData usersCollection={usersCollection} setRefDb={setRefDb} />
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
            {isDelUserOpen && (
              <div className="animate-fade-in-down">
                <DeletedUserData
                  deletedUsersCollection={deletedUsersCollection} setRefDb={setRefDb}
                />
              </div>
            )}
          </div>
        }
      </section>
    </>
  );
};
export default Admin;

export const UserData = (props) => {
  const { usersCollection, setRefDb } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    if (usersCollection) {
      setData(usersCollection);
    }
  }, [usersCollection]);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState();
  const activeCss = "bg-[#48ffa363]";

  const { data: session, status: sessionStatus } = useSession();

  const [userEdit, setUserEdit] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [updSuccess, setUpdSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [updDisableBtn, setUpdDisableBtn] = useState(false);
  const [delDisableBtn, setDelDisableBtn] = useState(false);

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

    // console.log(session?.user?.role);
    if (userEdit.role.trim() != "") {
      if (session?.user?.role !== "superAdmin") {
        return setError("Only SuperAdmin is allowed to change roles!");
      }
    }
    try {
      const res = await fetch("/api/admin-user-edit", {
        method: "POST",
        body: data,
      });
      if (res.status === 400) {
        setError("Invalid user! try again later");
        setUpdDisableBtn(false);
        setUpdSuccess(false);
        setRefDb(true);
      } else if (res.status === 500) {
        setError("Img & resume file aren't supported!");
        setUpdDisableBtn(false);
        setRefDb(true);
      } else if (res.status === 200) {
        setError("");
        setUpdSuccess(true);
        setUserEdit({
          name: "",
          email: "",
          role: "",
        });
        setRefDb(true);
      }
      setUpdDisableBtn(false);
    } catch (error) {
      setUpdDisableBtn(false);
      setError(error);
      console.error("Error", error);
    }
  };

  const handleDelete = async () => {
    const email = editData?.email ?? "email99";

    setDelDisableBtn(true);
    try {
      const res = await fetch("/api/admin-user-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
        }),
      });

      if (res.status === 400) {
        setError("User doesn't exists!");
        setDelDisableBtn(false);
        setRefDb(true);
      }
      if (res.status === 200) {
        setDelDisableBtn(true);
        setError("");
        setDeleteSuccess(true);
        setRefDb(true);
      }
    } catch (error) {
      console.log(error);
      setError("Check console for error");
    }
  };
  if (!usersCollection[0]) {
    return <section className="w-full h-full animate-fade-in-down text-center font-extrabold text-2xl text-[#53c28b]">
      No Users collection Record
    </section>
  }
  return (
    <>
      <section className="w-full h-[78vh] relative flex flex-col md:flex-row">
        <div className={`w-full ${!isEditOpen ? "h-full" : "h-[50%]"} md:h-auto scrollDiv overflow-y-scroll scroll-snap-type-x-mandatory overflow-hidden ease-in-out duration-200`}>
          <div className="w-full h-auto p-2 grid grid-flow-row grid-rows-1 grid-cols-1 md:grid-rows-2 md:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 gap-2 overflow-hidden ease-in-out duration-300">
            {data.map((i) => {
              //   console.log(i?.email ?? "email");
              return (
                <div
                  key={i._id}
                  onClick={() => {
                    if (i != editData) {
                      setError("")
                      setUpdSuccess(false)
                      setDeleteSuccess(false);
                      setUpdDisableBtn(false)
                      setDelDisableBtn(false)
                    }
                    setEditData(i);
                    setIsEditOpen(true)
                    if (i == editData) setIsEditOpen(!isEditOpen);
                  }}
                  className={` ${i == editData && isEditOpen ? activeCss : ""
                    } w-auto h-auto border rounded-lg flex flex-row items-center justify-center gap-1 p-1 cursor-pointer shadow-md hover:shadow-xl shadow-[#53c28b] scale-95 hover:scale-100 hover:border-[#53c28b] active:scale-95 overflow-hidden ease-in-out duration-300`}
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
        </div>
        <div
          className={`${!isEditOpen ? "h-0 md:-mr-[100%]" : "md:mr-0 h-[50%]"
            } w-full md:w-[40%] md:h-[78vh] p-2 scrollDiv overflow-y-scroll scroll-snap-type-x-mandatory overflow-hidden flex flex-col gap-2 items-center justify-center border rounded-xl bbg ease-in-out duration-200`}
        >
          <span className="font-extrabold text-xl text-[#53c28b]">Edit User</span>
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
                className={`${error ? "flex text-red-500 animate-slideDown" : "hidden"
                  }`}
              >
                {error}
              </span>
              <span
                className={`${updSuccess ? "flex text-[#53c28b] animate-slideDown" : "hidden"
                  }`}
              >
                Updated Successfully!
              </span>
              <button
                disabled={updDisableBtn ?? true}
                type="submit"
                className={`allBtn w-[rem] h-[3rem] text-xl rounded-3xl ${updDisableBtn
                  ? " opacity-70 active:scale-95 hover:scale-95 active:text-xl"
                  : ""
                  }`}
              >
                {updDisableBtn ? (
                  <span className="animate-pulse">Updating...</span>
                ) : (
                  "Update"
                )}
              </button>
              <span
                className={`${deleteSuccess ? "flex text-[#53c28b] animate-slideDown" : "hidden"
                  }`}
              >
                User Deleted Successfully!
              </span>
            </form>
            <button
              type="button"
              disabled={delDisableBtn ?? true}
              onClick={handleDelete}
              className={`allBtn w-full h-[3rem] text-xl rounded-3xl mb-1 ${delDisableBtn
                ? " opacity-70 active:scale-95 hover:scale-95 active:text-xl"
                : ""
                }`}
            >
              {delDisableBtn ? (deleteSuccess == true ? <span className="font-extrabold">User Deleted</span> :
                <span className="animate-pulse">Deleting...</span>
              ) : (
                "Delete User"
              )}

            </button>
          </>
        </div>
      </section>
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

  if (!profsCollection[0]) {
    return <section className="w-full h-full animate-fade-in-down text-center font-extrabold text-2xl text-[#53c28b]">
      No Prof Record
    </section>
  }

  return (
    <>
      <section className="w-full h-auto p-2 grid grid-flow-row grid-rows-1 grid-cols-1 md:grid-rows-2 md:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 gap-2 overflow-hidden ease-in-out duration-300">
        {data.map((i) => {
          //   console.log(i?.email ?? "email");
          return (
            <div
              key={i._id}
              className="w-auto h-auto border rounded-lg flex flex-col gap-1 p-1 cursor-pointer shadow-md hover:shadow-xl shadow-[#53c28b] scale-95 hover:scale-100 active:scale-95 ease-in-out duration-300"
            >
              <div className="w-full h-auto flex flex-row gap-1">

                <div className="w-[6rem] h-[5rem] borde rounded-full text-center overflow-hidden">
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
                <div className="w-full flex flex-col gap-[1px] items-center justify-center p-1">
                  <div className="text-sm">{i?.email ?? "email"}</div>
                </div>
              </div>
              <Link
                href={`/profile/${i?.email ?? ""}`}
                className="viewProfile allBtn w-full h-[2rem] text-md rounded-lg"
              >
                View Profile
              </Link>
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
  // console.log(contactUsCollection);
  if (!contactUsCollection[0]) {
    return <section className="w-full h-full animate-fade-in-down text-center font-extrabold text-2xl text-[#53c28b]">
      No ContactUs Message Record
    </section>
  }
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
export const DeletedUserData = (props) => {
  const { deletedUsersCollection, setRefDb } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (deletedUsersCollection) {
      setData(deletedUsersCollection);
    }
  }, [deletedUsersCollection]);
  // console.log(deletedUsersCollection);

  const [editData, setEditData] = useState();
  const [error, setError] = useState("");
  const [restoreDisableBtn, setRestoreDisableBtn] = useState(false);
  const [restoreSuccess, setRestoreSuccess] = useState(false);

  const handleRestoreUser = async (e) => {
    const email = editData?.email ?? "email99";
    // console.log(email);
    e.preventDefault()

    setRestoreDisableBtn(true);
    try {
      const res = await fetch("/api/admin-user-restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
        }),
      });

      if (res.status === 400) {
        setError("User doesn't exists!");
        setRestoreDisableBtn(false);
        setRefDb(true);
      }
      if (res.status === 200) {
        setError("");
        setRestoreSuccess(true);
        setRestoreDisableBtn(false);
        setRefDb(true);
      }
    } catch (error) {
      console.log(error);
      setError("Check console for error");
    }
  };

  if (!deletedUsersCollection[0]) {
    return <section className="w-full h-full animate-fade-in-down text-center font-extrabold text-2xl text-[#53c28b]">No Deleted Users Record</section>
  }
  return (
    <>
      <section className="w-full max-w-[100vh h-auto p-2 grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-2 overflow-hidden ease-in-out duration-300">
        {data.map((i) => {
          //   console.log(i?.email ?? "email");
          return (
            <div
              key={i._id}
              className="w-auto h-auto border rounded-lg flex flex-col items-center justify-center gap-1 p-1 cursor-pointer shadow-md hover:shadow-xl shadow-[#53c28b] scale-95 hover:scale-100 ease-in-out duration-300"
            >
              <div className="w-auto h-auto flex flex-row items-center justify-center">
                <div className="w-[30%] borde rounded-full text-center overflow-hidden">
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
                  <span className="font-bold">
                    <span className="text-[#53c28b]">Name : </span>
                    {i?.name ?? "name"}
                  </span>
                  <span className="text-sm">
                    <span className="text-[#53c28b]">Email : </span>
                    {i?.email ?? "email"}
                  </span>
                  <span className="text-sm">
                    <span className="text-[#53c28b]">Role : </span>
                    {i?.role ?? "role"}
                  </span>
                  <span className="text-sm">
                    <span className="text-[#53c28b]">SignInWith : </span>
                    {i?.signInWith ?? "signInWith"}
                  </span>
                  <span className="text-sm">
                    <span className="text-[#53c28b]">Deleted Date&Time : </span>
                    {i?.createdAt ?? "createdAt"}
                  </span>
                </div>
              </div>

              <form className="w-full h-auto"
                onSubmit={handleRestoreUser}
              >
                <button
                  type="submit"
                  disabled={restoreDisableBtn}
                  onClick={() => setEditData(i)}
                  className={`allBtn w-full h-[2rem] text-xl rounded-3xl mb-1 overflow-hidden ${restoreDisableBtn
                    ? "opacity-70 active:scale-95 hover:scale-95 active:text-xl"
                    : ""
                    }`}
                >
                  {i == editData ? (
                    error && i == editData ?
                      <span className="flex text-red-500 animate-slideDown">
                        {error}
                      </span>
                      : (
                        restoreSuccess && i == editData ?
                          <span className="text-gre">
                            Use Restored Successfully
                          </span>
                          : (
                            restoreDisableBtn && i == editData ?
                              <span className="flex animate-pulse">
                                Restoring...
                              </span>
                              : "Restore"
                          )
                      )
                  ) : "Restore"}
                </button>
              </form>

            </div>
          );
        })}
      </section>
    </>
  )
};