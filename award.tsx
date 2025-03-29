"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import AwardSection from "./components/awards";
import TopSectionSkeleton from "@/components/common/loading/LoadingTopSectionSkeleton";

interface Section {
  id: number;
  key: string;
  texts?: { key: string; text: string }[];
  images?: { image: string }[];
}

export default function AwardPage() {
  const [topSectionData, setTopSectionData] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Cochrane Sinclair | Awards";
    
    async function fetchAwardData() {
      try {
        const response = await fetch("https://dev-be-cochrane-sinclair.rallythelocals.com/api/section/page/award");
        const result = await response.json();
        if (result.success) {
          setTopSectionData(result.data.find((section: Section) => section.key === "award-hero-section") || null);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAwardData();
  }, []);

  if (loading) return <TopSectionSkeleton />;
  if (error) return <div>Error: {error}</div>;

  // Extract the hero section image dynamically
  const heroImage = topSectionData?.images?.[0]?.image;

  return (
    <div className="mx-3 min-h-screen py-20 md:mx-5">
      {/* Add Top Padding to Push the Hero Section Below Navbar */}
      <motion.section
        className="relative mx-auto mt-10 w-full overflow-hidden rounded-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(25,25,25,0)] to-[rgba(25,25,25,1)]"></div>
          {heroImage ? (
            <Image
              src={heroImage}
              alt="Award Background"
              layout="fill"
              objectFit="cover"
              className="brightness-100"
            />
          ) : (
            <div className="h-[500px] w-full bg-gray-700"></div>
          )}
        </div>

        {/* Content */}
        <div className="xs:mx-10 relative z-10 flex h-[500px] items-center pl-5 sm:px-10 md:px-10 lg:px-20">
          <div className="max-w-[800px] text-[#FCFBFA]">
            <motion.h1
              className="font-TWKEverett text-[50px] font-bold leading-tight md:text-[64px]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              {topSectionData?.texts?.find((text) => text.key === "title")?.text || "Industry Awards"}
            </motion.h1>
            <div className="max-w-[300px] md:max-w-[500px]">
              <motion.p
                className="mt-2 font-NeueHaasUnica text-[16px] font-medium leading-relaxed text-[#FCFBFA] md:text-[18px]"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              >
                {topSectionData?.texts?.find((text) => text.key === "description")?.text || "Explore the honours and distinctions that reflect our dedication to excellence and our commitment to delivering outstanding legal services."}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>
      <AwardSection />
    </div>
  );
}
