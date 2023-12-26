"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ProfessionalRegistrationForm = () => {
  const router = useRouter();

  const [profileImg, setProfileImg] = useState();
  const [resume, setResume] = useState();

  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");

  const [service, setService] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [sLOne, setSLOne] = useState("");
  const [sLTwo, setSLTwo] = useState("");
  const [workHistory, setWorkHistory] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const data = new FormData();
    data.set("profileImg", profileImg);
    data.set("resume", resume);
    data.set("email", email);
    data.set("gender", gender);
    data.set("dob", dob);

    data.set("service", service);
    data.set("address", address);
    data.set("zipCode", zipCode);
    data.set("phone", phone);
    data.set("bio", bio);
    data.set("skillLevel", skillLevel);
    data.set("sLOne", sLOne);
    data.set("sLTwo", sLTwo);
    data.set("workHistory", workHistory);

    try {
      const res = await fetch("/api/professionalRegister", {
        method: "POST",
        body: data,
      });

      if (res.status === 400) {
        setError("User already exists!");
      } else if (res.status === 200) {
        setError("");
        router.push("/signIn");
      }
    } catch (error) {
      setError(error);
      console.error("Error", error);
    }
  };

  const imageLoader = ({ src, width, quality }) => {
    const origin = process.env.HOSTNAME || window.location.origin;
    return `${origin}${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <div className="w-full h-[80vh] md:h-[77vh] flex justify-center items-center animate-fade-in-down">
        <div className="w-[95%] md:w-[85%] xl:w-[75%] h-[90%] border-[1px] border-solid border-[#53c28b]/90 rounded-2xl shadow-lg flex flex-rol ease-in-out duration-300">
          <div className="w-[50%] h-full hidden sm:flex justify-center items-cent rounded-xl ease-in-out duration-300">
            <Image
              loader={imageLoader}
              src="/assets/authImg.png"
              alt="authImg"
              width="400"
              height="400"
              priority={true}
              className="contactImg w-auto h-auto object-contain animate-[moveCon_2s_infinite_ease_alternate]"
            />
          </div>
          <div className="scrollDiv overflow-y-scroll scroll-snap-type-x-mandatory w-full sm:w-[50%] h-full">
            <div className="fontFam w-full h-auto flex flex-col justify-between gap-2 px-5 rounded-xl ease-in-out duration-300">
              <div className="fontFam w-full h-auto text-[40px] md:text-[45px] lg:text-[40px] text-[#53c28b] text-center ease-in-out duration-300">
                Professional Register
              </div>
              <form
                action=""
                method=""
                onSubmit={handleSubmit}
                className="w-full h-full flex flex-col gap-4"
              >
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Re-enter your e-mail"
                  className="allFormInput h-[52px]"
                  required
                />
                <div className="w-full h-[20vh] flex flex-col items-center justify-between border-[1px] hover:border-[#53c28b] hover:text-[#53c28b] rounded-3xl p-6 ease-in-out duration-200">
                  <label className="text-xl">Add Profile</label>
                  <div className=" w-auto h-auto text-center md:px-10">
                    <input
                      type="file"
                      name="profileImg"
                      onChange={(e) => setProfileImg(e.target.files?.[0])}
                      accept=".jpg, .jpeg, .png"
                      className="allFormInput w-full h-full border-none cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                    required
                    placeholder="Enter Gender"
                    className="allFormInput h-[52px]"
                  />
                  <input
                    type="date"
                    name="dob"
                    onChange={(e) => setDOB(e.target.value)}
                    required
                    placeholder="DOB"
                    className="allFormInput h-[52px]"
                  />
                </div>
                <select
                  name="service"
                  onChange={(e) => setService(e.target.value)}
                  placeholder="Freelancer Category"
                  required
                  className="w-full h-[52px] fontFam hover:text-[#53c28b] text-xl rounded-sm bg-transparent border-b-[1px] hover:border-b-[#53c28b] focus:border-b-[#53c28b] focus:text-[#53c28b] hover:shadow-md focus:shadow-md outline-none"
                >
                  <option value="">Select Service</option>
                  <option value="web_development">Web Development</option>
                  <option value="graphic_design">Graphic Design</option>
                  <option value="writing">Writing</option>
                </select>
                <textarea
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  rows={3}
                  required
                  className="allFormInput h-auto"
                />
                <input
                  type="text"
                  name="zipCode"
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="ZIP/Postal Code"
                  required
                  className="allFormInput h-[52px]"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="countryCode"
                    value="+91"
                    readOnly
                    className="w-[3rem] h-[52px] fontFam text-[#53c28b] text-xl rounded-sm bg-transparent border-b-[1px] border-b-[#53c28b] hover:shadow-md focus:shadow-md outline-none"
                  />
                  <input
                    type="number"
                    name="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    required
                    className="allFormInput h-[52px] appearance-none numHide"
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                      appearance: "textfield",
                      margin: 0,
                    }}
                  />
                </div>
                <textarea
                  name="bio"
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Bio / Introduction"
                  rows={3}
                  className="allFormInput h-auto"
                ></textarea>
                <label className="text-xl">Years of Experience</label>
                <input
                  type="range"
                  name="skillLevel"
                  onChange={(e) => setSkillLevel(e.target.value)}
                  step="1"
                  min="0"
                  max="5"
                  className="accent-[#53c28b]"
                />
                <label className="text-xl">Add your resume</label>
                <input
                  type="file"
                  name="resume"
                  onChange={(e) => setResume(e.target.files?.[0])}
                  accept=".pdf, .doc, .docx, .ppt"
                  className="allFormInput h-[52px]"
                />
                <input
                  type="url"
                  name="sLOne"
                  onChange={(e) => setSLOne(e.target.value)}
                  placeholder="Social Link 1"
                  className="allFormInput h-[52px]"
                />
                <input
                  type="url"
                  name="sLTwo"
                  onChange={(e) => setSLTwo(e.target.value)}
                  placeholder="Social Link 2"
                  className="allFormInput h-[52px]"
                />
                <textarea
                  name="workHistory"
                  onChange={(e) => setWorkHistory(e.target.value)}
                  placeholder="Write about your work history"
                  rows={3}
                  className="allFormInput h-auto"
                ></textarea>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="termsAgree"
                    required
                    className="w-4 h-4 leading-tight bg-[#53c28b] rounded hover:ring-1 focus:ring-1 accent-[#53c28b]"
                  />
                  I agree to the terms and conditions!
                </div>
                <button
                  type="submit"
                  className="allBtn w-[7rem] h-[3rem] text-xl rounded-3xl"
                >
                  Register
                </button>
              </form>
              <div className="lg:flex gap-1 justify-center mb-2">
                Already have account?{" "}
                <Link
                  className="cursor-pointer font-semibold hover:shadow-md focus:shadow-md hover:scale-105 duration-500"
                  // text-[#fff]/80 hover:text-[#fff]
                  href={"/signIn"}
                >
                  <span className="underline underline-offset-2">SignIn</span>{" "}
                  <span className="underline underline-offset-2">Here</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalRegistrationForm;
