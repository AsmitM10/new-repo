"use client"
import { motion } from "framer-motion"
import { useScrollObserver } from "@/app/hooks/use-scroll-observer"
import type { ReactNode } from "react"

interface RevealSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "scale"
  duration?: number
}

export function RevealSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
}: RevealSectionProps) {
  const { elementRef, hasTriggered } = useScrollObserver({
    threshold: 0.1,
    rootMargin: "-50px",
  })

  const variants = {
    up: { y: 60, opacity: 0 },
    down: { y: -60, opacity: 0 },
    left: { x: -60, opacity: 0 },
    right: { x: 60, opacity: 0 },
    scale: { scale: 0.8, opacity: 0 },
  }

  const visible = {
    y: 0,
    x: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: "easeOut",
    },
  }

  return (
    <motion.section
      ref={elementRef}
      className={className}
      initial={variants[direction]}
      animate={hasTriggered ? visible : variants[direction]}
    >
      {children}
    </motion.section>
  )
}
