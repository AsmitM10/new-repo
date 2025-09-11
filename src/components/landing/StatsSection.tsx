"use client"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"

export default function StatsSection() {
  const [communityCount, setCommunityCount] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const stats = [
    { label: "Community Members", value: `${communityCount}+`, color: "bg-[#E5F7C3]", isAnimated: true },
    { label: "Years of Experience", value: "9+", color: "bg-[#D5C3F7]", isAnimated: false },
    { label: "Google rating", value: "4.9/5", color: "bg-[#F7C3CB]", isAnimated: false },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.3 }, // Trigger when 30% of the section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setCommunityCount((prev) => {
        const increment = Math.floor(Math.random() * 3) + 1 // Random increment 1-3
        return prev + increment
      })
    }, 2000) // Update every 2 seconds

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <motion.section
      ref={sectionRef}
      className="max-w-5xl mx-auto px-6 py-10"
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            transition={{ delay: i * 0.2 }}
            className={`${item.color} rounded-xl p-6 text-center`}
          >
            <motion.div
              className="text-5xl font-bold text-black mb-2"
              animate={item.isAnimated ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
              key={item.isAnimated ? communityCount : item.value}
            >
              {item.value}
            </motion.div>
            <p className="text-gray-800 text-sm font-medium">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
