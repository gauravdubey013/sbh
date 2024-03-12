"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Contact = () => {
  return (
    <>
      <h3 className="text-[#53c28b] font-extrabold text-xl p-[20px] sm:px-[30px] md:px-[45px] lg:px-[80px]">
        Contact us
      </h3>
      <div className="fontFam text-[40px] md:text-[45px] lg:text-[60px] text-center">
        Let&apos;s Keep in Touch
      </div>
      <div className="w-full h-[75%] flex flex-col md:flex-row ease-in-out duration-300">
        <div className="w-full lg:w-1/2 h-1/2 md:h-full flex justify-center items-center ease-in-out duration-300">
          <div className="imgCont w-full h-[350px] lg:h-[500px] relative opacity-[90%] ease-in-out duration-300">
            <Image
              src="/assets/contact.png"
              alt="contactImg"
              fill={true}
              sizes="(max-width: full) (max-width: full)"
              priority={true}
              //   layout="responsive"
              // width={500}
              // height={500}
              className="contactImg w-auto h-auto absolute object-contain animate-[moveCon_3s_infinite_ease_alternate]"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-1/2 md:h-full ease-in-out duration-300 px-[20px] sm:px-[30px] md:px-[45px] lg:px-[80px] flex items-center mt-5">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export const ContactForm = () => {
  const [contactUserMessage, setContactUserMessage] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

  const router = useRouter();

  const handleFirstname = (e) => {
    let inputValue = e.target.value.replace(/[^a-z]/gi, "");
    setContactUserMessage({ ...contactUserMessage, firstname: inputValue });
  };
  const handleLastname = (e) => {
    let inputValue = e.target.value.replace(/[^a-z]/gi, "");
    setContactUserMessage({ ...contactUserMessage, lastname: inputValue });
  };

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleEmail = (e) => {
    const inputValue = e.target.value;
    setContactUserMessage({ ...contactUserMessage, email: inputValue });

    if (inputValue.trim() === "") {
      setError("");
    } else {
      if (!emailPattern.test(inputValue)) {
        setError("Invalid email");
      } else {
        setError("");
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactUserMessage({
      ...contactUserMessage,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailPattern.test(contactUserMessage.email)) {
      return setError("Invalid Email")
    }
    setDisableSubmit(true);
    try {
      const res = await fetch("/api/contact-us-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: contactUserMessage.firstname,
          lastname: contactUserMessage.lastname,
          email: contactUserMessage.email,
          message: contactUserMessage.message,
        }),
      });

      if (res.status === 400) {
        setError("We already have received message from this email!");
        setDisableSubmit(false);
      }
      if (res.status === 200) {
        setError("");
        setContactUserMessage({
          firstname: "",
          lastname: "",
          email: "",
          message: "",
        })
        setDisableSubmit(false);
        // router.push("/");
      }
    } catch (error) {
      setError("Error: Something went wrong!");
      console.log("Error", error);
      setDisableSubmit(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method=""
        className="w-full h-full flex flex-col gap-6 justify-center"
      >
        <div className="w-full h-[54px] flex gap-2">
          <input
            type="text"
            placeholder="First Name"
            required
            onChange={handleFirstname}
            name="firstname"
            value={contactUserMessage.firstname}
            className="allFormInput h-[52px]"
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            onChange={handleLastname}
            name="lastname"
            value={contactUserMessage.lastname}
            className="allFormInput h-[52px]"
          />
        </div>
        <input
          type="email"
          placeholder="Email*"
          required
          onChange={handleEmail}
          name="email"
          value={contactUserMessage.email}
          className="allFormInput h-[52px]"
        />
        <textarea
          cols={30}
          rows={5}
          placeholder="Leave us a message..."
          required
          onChange={handleChange}
          name="message"
          value={contactUserMessage.message}
          className="allFormInput"
        />
        <button
          type="submit"
          disabled={disableSubmit}
          className={`allBtn w-full h-[3rem] text-xl rounded-3xl ${disableSubmit
            ? " opacity-70 active:scale-95 hover:scale-95 active:text-xl"
            : ""
            }`}>
          {disableSubmit ? <span className="animate-pulse">Sending...</span> : "Send"}
        </button>
        {error && <span className="text-red-500">{error}</span>}
      </form>
    </>
  );
};

export default Contact;
