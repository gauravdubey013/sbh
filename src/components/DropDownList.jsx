import { useState } from "react";

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Profile Image */}
      <img
        onClick={handleToggle}
        className="h-6 w-6 rounded-full cursor-pointer"
        src="/bg6.png"
        alt="Profile"
      />

      {/* Dropdown */}
      {isOpen && (
        <div className="ease-in-out backdrop-filter backdrop-blur-sm animate-fade-in-down origin-top-right absolute right-0 mt-6 -mr-2 md:-mr-4 w-auto rounded-md shadow-lg border-b-[0.5px] border-l-[0.5px] border-[#53c28b] ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="p-1 flex flex-col items-center justify-center gap-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {/* Dropdown Items */}
            <div className="block text-sm" role="menuitem">
              {props.userEmail}
            </div>
            <button
              onClick={props.btnOnClick}
              role="menuitem"
              className="signout allBtn w-full h-[2rem] text-md rounded-md"
            >
              {props.btnName}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
