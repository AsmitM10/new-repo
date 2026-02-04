"use client"
import { ShieldCheck, Clock, BellRing, Smartphone } from "lucide-react"
import { motion, type Variants } from "framer-motion"

export default function Features() {
  const features = [
    {
      title: "Accountability Support",
      description:
        "Stay on track with regular check-ins and guidance to ensure you meet your wellness goals.",
      bg: "bg-[#E5F7C3]",
      icon: <ShieldCheck className="w-8 h-8 text-black" />,
    },
    {
      title: "Flexible Timings",
      description:
        "Choose from various time slots to fit yoga seamlessly into your schedule.",
      bg: "bg-[#D5C3F7]",
      icon: <Clock className="w-8 h-8 text-black" />,
    },
    {
      title: "Habit Tracking Reminders",
      description:
        "Receive gentle nudges to build and maintain your healthy habits effortlessly.",
      bg: "bg-[#F7C3CB]",
      icon: <BellRing className="w-8 h-8 text-black" />,
    },
    {
      title: "Easy Accessibility",
      description:
        "Join sessions anytime, anywhere, with simple access across devices.",
      bg: "bg-[#C3F0F7]",
      icon: <Smartphone className="w-8 h-8 text-black" />,
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      // use a cubic-bezier array (numbers) instead of a string to satisfy the TS types
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          whileHover={{
            scale: 1.03,
            rotateY: 2,
            textShadow: "0px 0px 15px rgba(16, 185, 129, 0.6)",
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
          whileTap={{ scale: 0.97, rotateY: -2 }}
          viewport={{ once: true }}
          // replaced string ease with cubic-bezier array
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 cursor-pointer select-none"
        >
          UNLOCK YOUR EXCLUSIVE BENEFITS
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
              className={`${feature.bg} p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 text-center cursor-pointer group`}
            >
              <motion.div
                className="flex justify-center mb-6"
                whileHover={{
                  rotate: 360,
                  scale: 1.2,
                  transition: { duration: 0.6 },
                }}
              >
                {feature.icon}
              </motion.div>

              <motion.h3
                className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  textShadow: "0px 0px 6px rgba(0, 0, 0, 0.3)",
                  transition: { duration: 0.2 },
                }}
              >
                {feature.title}
              </motion.h3>

              <motion.p
                className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
