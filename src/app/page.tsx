"use client"
import { useState, useEffect } from "react"
import HeaderSection from "@/components/landing/HeaderSection"
import HeroSection from "@/components/landing/HeroSection"
import StatsSection from "@/components/landing/StatsSection"
import BatchesSection from "@/components/landing/BatchesSection"
import JoinFormSection from "@/components/landing/JoinFormSection"
import FooterSection from "@/components/landing/FooterSection"
import TestimonialsSection from "@/components/landing/TestimonialsSection"
import TrainerSection from "@/components/landing/TrainerSection"
import ImageCarousel from "@/components/landing/ImageCarousel"
import Benefits from "@/components/landing/Benefits"
import Features from "@/components/landing/Features"

export default function FitnessLanding() {
  const [candidateCount, setCandidateCount] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCandidateCount((prev) => {
        if (prev < 47) {
          return prev + 1
        }
        return prev
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div
        className="relative parallax-bg"
        style={{
          background:
            "linear-gradient(180deg, #C3F7EF 0%, #CBFAF1 11.63%, #D7FAF4 23.25%, #DCFBF5 31.56%, #E1FBF7 39.87%, #E6FCF8 55.48%, #EBFCFA 71.08%, #F0FDFB 85.54%, #F5FEFC 92.77%, #FFFFFF 100%)",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <HeaderSection />
        <HeroSection />
        <div className="absolute left-16 bottom-20 h-0.5 animate-slide-in-left">
          <div className="bg-gray-50 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs border border-gray-200 hover-lift">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium mb-2 w-full interactive-button transition-colors duration-200">
              Click here to join Challenge
            </button>
            <div className="text-sm text-gray-700">
              <span className="text-2xl font-semibold text-teal-600 animate-pulse-custom">{candidateCount}+</span>
              <span className="ml-1">candidates have already registered</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mt-16 stagger-animation">
          <StatsSection />
        </div>
        <div className="stagger-animation">
          <BatchesSection />
        </div>
        <div className="stagger-animation">
          <JoinFormSection />
        </div>
        <div className="stagger-animation">
          <TrainerSection />
        </div>
        <div className="stagger-animation">
          <ImageCarousel />
        </div>
        <div className="stagger-animation">
          <Benefits />
        </div>
        <div className="stagger-animation">
          <TestimonialsSection />
        </div>
        <div className="stagger-animation">
          <Features />
        </div>
        <FooterSection />
      </div>
    </div>
  )
}
