"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [showCursor, setShowCursor] = useState(true);
  // Toggles the icons dropdown on mobile
  const [showIconsMobile, setShowIconsMobile] = useState(false);
  // Stores whichever icon was last chosen on mobile
  const [selectedIcon, setSelectedIcon] = useState("/images/sparkle.svg");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  // When an icon is chosen from the mobile dropdown
  const handleSelectIcon = (iconPath: React.SetStateAction<string>) => {
    setSelectedIcon(iconPath);
    setShowIconsMobile(false);
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
              Oh no! Sad to hear that, but of course we can give a refund. Can
              you please provide your order number if you have one? Or email
              that you’ve used to make this purchase.
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

        {/* Main input box (position relative so the dropdown can anchor) */}
        <div
          style={{
            boxShadow:
              "0 1px 1px -0.5px rgba(0, 11, 54, 0.094), 0 6px 6px rgba(35, 42, 55, 0.03)",
          }}
          className="border border-[#000B3618] rounded-md bg-white shadow-sm w-full max-w-2xl relative"
        >
          {/* 
            MOBILE LAYOUT (sm:hidden):
            - Input on left
            - Middle button toggles the icons dropdown
            - Send on right
          */}
          <div className="flex sm:hidden items-center justify-between px-2 py-2">
            <input
              type="text"
              placeholder={`Typing${showCursor ? " |" : ""}`}
              className="w-full outline-none border-none bg-transparent text-[14px] text-[#000107E1] mr-2"
            />
            {/* Toggle dropdown for icons on mobile */}
            <button
              onClick={() => setShowIconsMobile((prev) => !prev)}
              className="mr-2"
            >
              {/* Show the last-selected icon on this button */}
              <img
                src={selectedIcon}
                alt="Icons Menu"
                className="w-[18px] h-[18px]"
              />
            </button>
            <button className="bg-[#00104010] text-white w-[32px] h-[32px] p-2 rounded hover:bg-blue-600 flex items-center justify-center">
              <img
                src="/images/Vector.svg"
                alt="Send"
                className="w-[18px] h-[18px]"
              />
            </button>
          </div>

          {/* The dropdown that shows your existing icons on mobile */}
          {showIconsMobile && (
            <div
              className="
                absolute 
                left-2
                right-2
                top-[60px]     /* Enough space below the input row. Adjust if needed. */
                bg-white 
                border 
                border-gray-300 
                shadow-md 
                z-50 
                rounded 
                p-2
                sm:hidden      /* Only show on mobile */
              "
            >
              <div className="flex items-center space-x-4">
                <button onClick={() => handleSelectIcon("/images/note.svg")}>
                  <img
                    src="/images/note.svg"
                    alt="Attach"
                    className="w-[18px] h-[18px]"
                  />
                </button>
                <button
                  onClick={() => handleSelectIcon("/images/sparkle1.svg")}
                >
                  <img
                    src="/images/sparkle1.svg"
                    alt="Sparkle"
                    className="w-[18px] h-[18px]"
                  />
                </button>
                <button onClick={() => handleSelectIcon("/images/file.svg")}>
                  <img
                    src="/images/file.svg"
                    alt="File"
                    className="w-[18px] h-[18px]"
                  />
                </button>
                <button onClick={() => handleSelectIcon("/images/emoji.svg")}>
                  <img
                    src="/images/emoji.svg"
                    alt="Emoji"
                    className="w-[18px] h-[18px]"
                  />
                </button>
                <button onClick={() => handleSelectIcon("/images/email.svg")}>
                  <img
                    src="/images/email.svg"
                    alt="Email"
                    className="w-[18px] h-[18px]"
                  />
                </button>
                <button onClick={() => handleSelectIcon("/images/slash.svg")}>
                  <img
                    src="/images/slash.svg"
                    alt="Slash"
                    className="w-[18px] h-[18px]"
                  />
                </button>

                {/* Vertical divider */}
                <div className="border-l border-[#000B3618] h-[20px]" />

                {/* Sparkle + “Quick reply with AI” */}
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleSelectIcon("/images/sparkle.svg")}>
                    <img
                      src="/images/sparkle.svg"
                      alt="Sparkle"
                      className="w-[16px] h-[16px]"
                    />
                  </button>
                  <span className="text-[12px] text-[#000107E1]">
                    Quick reply with AI
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 
            DESKTOP LAYOUT (hidden sm:block):
            (1) Input row
            (2) Icons inline + Quick reply + Send
          */}
          <div className="hidden sm:block px-4 py-2">
            {/* Desktop input row */}
            <div>
              <input
                type="text"
                placeholder={`Typing${showCursor ? " |" : ""}`}
                className="w-full outline-none border-none bg-transparent text-[14px] text-[#000107E1]"
              />
            </div>

            {/* Icons, Quick reply, and Send button row */}
            <div className="flex items-center justify-between mt-3 gap-3">
              <div className="flex items-center space-x-4">
                <button>
                  <img
                    src="/images/note.svg"
                    alt="Attach"
                    className="w-[18px] h-[18px]"
                  />
                </button>
                <button>
                  <img
                    src="/images/sparkle1.svg"
                    alt="Sparkle"
                    className="w-[18px] h-[18px]"
                  />
                </button>
                <button>
                  <img
                    src="/images/file.svg"
                    alt="File"
                    className="w-[18px] h-[18px]"
                  />
                </button>
                <button>
                  <img
                    src="/images/emoji.svg"
                    alt="Emoji"
                    className="w-[18px] h-[18px]"
                  />
                </button>
                <button>
                  <img
                    src="/images/email.svg"
                    alt="Email"
                    className="w-[18px] h-[18px]"
                  />
                </button>
                <button>
                  <img
                    src="/images/slash.svg"
                    alt="Slash"
                    className="w-[18px] h-[18px]"
                  />
                </button>

                {/* Vertical divider */}
                <div className="border-l border-[#000B3618] h-[20px]" />

                {/* Sparkle + “Quick reply with AI” */}
                <div className="flex items-center space-x-2">
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
              <button className="bg-[#00104010] text-white w-[32px] h-[32px] p-2 rounded hover:bg-blue-600 flex items-center justify-center">
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
    </div>
  );
}
