"use client"
import { useEffect, useState, useRef } from "react"

interface UseScrollObserverOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollObserver(options: UseScrollObserverOptions = {}) {
  const [isInView, setIsInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)

        if (inView && !hasTriggered) {
          setHasTriggered(true)
        }

        if (!triggerOnce) {
          setHasTriggered(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce, hasTriggered])

  return { elementRef, isInView, hasTriggered }
}

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = scrollHeight > 0 ? scrolled / scrollHeight : 0
      setScrollProgress(Math.min(Math.max(progress, 0), 1))
    }

    window.addEventListener("scroll", updateScrollProgress)
    updateScrollProgress()

    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return scrollProgress
}

export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const scrolled = window.scrollY
      const rate = scrolled * speed

      setOffset(rate)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return { elementRef, offset }
}
