

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CareerLists from "./components/careerLists";
import FrequentlyAsked from "./components/faq";
import Frames from "./components/frames";
import { useEffect, useState } from "react";

export default function CareerPage() {
  const [heroImage, setHeroImage] = useState("");

  useEffect(() => {
    document.title = "Cochrane Sinclair | Careers";
 
    fetch("https://dev-be-cochrane-sinclair.rallythelocals.com/api/section/page/career")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        // Check if the response is an array; if not, assume it has a 'data' properties
        const sections = Array.isArray(data) ? data : data.data;
        if (!sections) return;
        // Type 'section' as any to avoid implicit any type error
        const heroSection = sections.find((section: any) => section.key === "career-hero-section");
        if (heroSection && heroSection.images && heroSection.images.length > 0) {
          setHeroImage(heroSection.images[0].image);
        }
      })
      .catch((error) => {
        console.error("Error fetching career section data:", error);
      });
  }, []);

  return (
    <div className="mx-5 min-h-screen py-10">
      {/* Hero Section */}
      <motion.section
        className="relative mx-auto mt-20 w-full overflow-hidden rounded-3xl border"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0 rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(25,25,25,0)] to-[rgba(25,25,25,1)]"></div>
          {heroImage && (
            <Image
              src={heroImage}
              alt="Career Background"
              layout="fill"
              objectFit="cover"
              className="rounded-xl object-[50%_35%] brightness-100"
            />
          )}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex h-[550px] max-w-6xl items-center">
          <div className="max-w-[600px] pl-6 text-white md:pl-20 custom:pl-10 mdd:pl-5">
            <motion.h1
              className="font-TWKEverett text-[40px] md:text-[64px] font-bold leading-tight"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              Build Your Future <br /> with Us.
            </motion.h1>
            <motion.p
              className="mt-2 font-NeueHaasUnica text-[16px] md:text-[18px] leading-relaxed text-[rgba(252,251,250,1)]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              Explore our current opportunities and find the role that's right for you.
              At Cochrane Sinclair LLP, we're looking for passionate, driven individuals
              to help us make a meaningful impact through our work.
            </motion.p>
          </div>
        </div>
      </motion.section>

      <CareerLists />
      <FrequentlyAsked />
      <Frames />
    </div>
  );
}
