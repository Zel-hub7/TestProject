"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [showCursor, setShowCursor] = useState(true);
  // 1) Add two new pieces of state
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeEmoji, setActiveEmoji] = useState("/images/emoji.svg");

  // For the blinking cursor
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  // Helper to choose one of the other icons in the dropdown
  const handleSelectIcon = (iconPath: React.SetStateAction<string>) => {
    setActiveEmoji(iconPath);
    setShowDropdown(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-2 sm:p-4 font-['Inter var',sans-serif]">
      <div className="w-full max-w-2xl bg-white rounded-md p-2 sm:p-4 space-y-4">
        {/* Suggested Reply Box */}
        <div className="bg-[#0062FF15] px-3 py-2 rounded-md relative">
          <div className="text-sm text-gray-800">
            <span className="text-[#1E1F24] font-medium text-[14px] leading-[20px]">
              Vanilla AI
            </span>
            <span className="text-[#8B8D98] text-[12px] leading-[16px] ml-1">
              Suggested
            </span>
            <p className="mt-2 text-[#1E1F24] font-normal text-[14px] leading-[20px] break-words">
              Oh no! Sad to hear that, but of course we can give a refund. Can you please
              provide your order number if you have one? Or email that you’ve used to
              make this purchase.
            </p>
          </div>
          <div className="mt-2 text-[#000107E1] text-[14px] leading-[20px] underline underline-offset-4 cursor-pointer hover:underline">
            Reply with this message
          </div>
          <button className="absolute top-2 right-2 text-sm text-gray-500 flex items-center hover:underline">
            <img
              src="/images/loading.svg"
              alt="Loading"
              className="w-[16px] h-[16px] mr-1"
            />
            <span className="text-[#000107E1] font-medium leading-[20px] text-[12px]">
              Regenerate
            </span>
          </button>
        </div>

        {/* Main input box */}
        <div
          style={{
            boxShadow:
              "0 1px 1px -0.5px rgba(0, 11, 54, 0.094), 0 6px 6px rgba(35, 42, 55, 0.03)",
            margin: "",
            background: "#fff",
          }}
          className="border border-[#000B3618] rounded-md bg-white shadow-sm px-2 sm:px-4 py-2 w-full max-w-2xl"
        >
          {/* Text input row */}
          <div>
            <input
              type="text"
              placeholder={`Typing${showCursor ? " |" : ""}`}
              className="w-full outline-none border-none bg-transparent text-[14px] text-[#000107E1]"
            />
          </div>

          {/* Icons, AI reply text, and Send button row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-3">
            {/* Icons + Quick reply text */}

            {/* -- MOBILE: Show only the active emoji & dropdown -- */}
            <div className="relative sm:hidden flex items-center">
              <button onClick={() => setShowDropdown((prev) => !prev)}>
                <img
                  src={activeEmoji}
                  alt="Active Icon"
                  className="w-[18px] h-[18px] flex-shrink-0"
                />
              </button>
              {showDropdown && (
                <div className="absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded p-2 z-10 flex space-x-2">
                  {/* Replace or add as many icons as you want here */}
                  <button onClick={() => handleSelectIcon("/images/note.svg")}>
                    <img src="/images/note.svg" alt="Attach" className="w-[18px] h-[18px]" />
                  </button>
                  <button onClick={() => handleSelectIcon("/images/sparkle1.svg")}>
                    <img src="/images/sparkle1.svg" alt="Sparkle" className="w-[18px] h-[18px]" />
                  </button>
                  <button onClick={() => handleSelectIcon("/images/file.svg")}>
                    <img src="/images/file.svg" alt="File" className="w-[18px] h-[18px]" />
                  </button>
                  <button onClick={() => handleSelectIcon("/images/emoji.svg")}>
                    <img src="/images/emoji.svg" alt="Emoji" className="w-[18px] h-[18px]" />
                  </button>
                  <button onClick={() => handleSelectIcon("/images/email.svg")}>
                    <img src="/images/email.svg" alt="Email" className="w-[18px] h-[18px]" />
                  </button>
                  <button onClick={() => handleSelectIcon("/images/slash.svg")}>
                    <img src="/images/slash.svg" alt="Slash" className="w-[18px] h-[18px]" />
                  </button>
                </div>
              )}
            </div>

            {/* -- DESKTOP: Original row of icons -- */}
            <div className="hidden sm:flex items-center space-x-3 sm:space-x-4 overflow-x-auto w-full py-1">
              <button>
                <img
                  src="/images/note.svg"
                  alt="Attach"
                  className="w-[18px] h-[18px] flex-shrink-0"
                />
              </button>
              <button>
                <img
                  src="/images/sparkle1.svg"
                  alt="Slash"
                  className="w-[18px] h-[18px] flex-shrink-0"
                />
              </button>
              <button>
                <img
                  src="/images/file.svg"
                  alt="File"
                  className="w-[18px] h-[18px] flex-shrink-0"
                />
              </button>
              <button>
                <img
                  src="/images/emoji.svg"
                  alt="Emoji"
                  className="w-[18px] h-[18px] flex-shrink-0"
                />
              </button>
              <button>
                <img
                  src="/images/email.svg"
                  alt="Email"
                  className="w-[18px] h-[18px] flex-shrink-0"
                />
              </button>
              <button>
                <img
                  src="/images/slash.svg"
                  alt="Slash"
                  className="w-[18px] h-[18px] flex-shrink-0"
                />
              </button>

              {/* Vertical divider */}
              <div className="border-l border-[#000B3618] h-[20px] flex-shrink-0" />

              {/* Sparkle + “Quick reply with AI” */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <img
                  src="/images/sparkle.svg"
                  alt="Sparkle"
                  className="w-[16px] h-[16px]"
                />
                <span className="text-[12px] text-[#000107E1]">
                  Quick reply with AI
                </span>
              </div>
            </div>

            {/* Send button */}
            <button className="bg-[#00104010] text-white w-[32px] h-[32px] p-2 rounded hover:bg-blue-600 flex items-center justify-center flex-shrink-0">
              <img
                src="/images/Vector.svg"
                alt="Send"
                className="w-[18px] h-[18px]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
