"use client"
import { motion } from "framer-motion"
import { useState } from "react"

export default function HeroSection() {
  const [isImageHovered, setIsImageHovered] = useState(false)

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="text-center py-12 px-4 max-w-6xl mx-auto"
    >
      <motion.p variants={staggerItem} className="text-slate-600 text-lg">
        Bright Star Fitness presents
      </motion.p>

      <motion.h2
        variants={staggerItem}
        className="text-3xl md:text-4xl font-bold text-red-500 mt-2"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        7 Day Online
      </motion.h2>

      <motion.h1
        variants={staggerItem}
        className="text-5xl md:text-6xl font-extrabold mt-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        FREE SESSIONS
      </motion.h1>

      <motion.div
        variants={staggerItem}
        className="mt-20 flex justify-center"
        onHoverStart={() => setIsImageHovered(true)}
        onHoverEnd={() => setIsImageHovered(false)}
      >
        <motion.img
          src="/yoga.svg"
          alt="Yoga Meditation"
          className="h-90 w-auto cursor-pointer"
          animate={{
            scale: isImageHovered ? 1.1 : 1,
            rotate: isImageHovered ? 2 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{
            filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.2))",
          }}
        />
      </motion.div>
    </motion.section>
  )
}
