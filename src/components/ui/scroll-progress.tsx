"use client"
import { motion } from "framer-motion"
import { useScrollProgress } from "@/app/hooks/use-scroll-observer"

export function ScrollProgress() {
  const scrollProgress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-blue-600 z-50 origin-left"
      style={{ scaleX: scrollProgress }}
      initial={{ scaleX: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
    />
  )
}
