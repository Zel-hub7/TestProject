"use client"
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-['Inter var',sans-serif]">
      <div className="w-full max-w-2xl bg-white  rounded-md p-4 space-y-4">
        
        {/* Suggested Reply Box */}
        <div className="bg-[#0062FF15] px-3 py-2 rounded-md relative">
          <div className="text-sm text-gray-800">
            <span className="text-[#1E1F24] font-medium text-[14px] leading-[20px]">Vanilla AI</span>
            <span className="text-[#8B8D98] text-[12px] leading-[16px] ml-1">Suggested</span>
            <p className="mt-2 text-[#1E1F24] font-normal text-[14px] leading-[20px]">
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
            <span className="text-[#000107E1] font-medium leading-[20px] text-[12px]">Regenerate</span>
          </button>
        </div>

        <div
          style={{
            boxShadow:
              '0 1px 1px -0.5px rgba(0, 11, 54, 0.094), 0 6px 6px rgba(35, 42, 55, 0.03)',
            margin: '',
            background: '#fff',
          }}
          className="border border-[#000B3618]  rounded-md bg-white shadow-sm px-4 py-2 w-full max-w-2xl"
        >
          {/* Text input row */}
          <div>
            <input
              type="text"
              placeholder={`Typing${showCursor ? ' |' : ''}`}
              className="w-full outline-none border-none bg-transparent text-[14px]  text-[#000107E1]"
            />
          </div>

          {/* Icons, AI reply text, and Send button row */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4">
              {/* Example icons — update with any of your /images/*.svg */}
              <button>
                <img src="/images/note.svg" alt="Attach" className="w-[18px] h-[18px]" />
              </button>
              <button>
                <img
                  src="/images/sparkle1.svg"
                  alt="Slash"
                  className="w-[18px] h-[18px]"
                />
              </button>
              <button>
                <img src="/images/file.svg" alt="Slash" className="w-[18px] h-[18px]" />
              </button>

              <button>
                <img src="/images/emoji.svg" alt="Slash" className="w-[18px] h-[18px]" />
              </button>

              <button>
                <img src="/images/email.svg" alt="Emoji" className="w-[18px] h-[18px]" />
              </button>
              <button>
                <img src="/images/slash.svg" alt="Note" className="w-[18px] h-[18px]" />
              </button>

              {/* Vertical divider */}
              <div className="border-l border-[#000B3618] h-[20px] "></div>

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
            <button className="bg-[#00104010] text-white w-[32px] h-[32px] p-2 rounded hover:bg-blue-600 flex items-center mr-10">
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
