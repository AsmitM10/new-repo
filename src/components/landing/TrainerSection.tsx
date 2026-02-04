"use client"
import { motion } from "framer-motion"

export default function TrainerSection() {
  return (
    <section className="w-full px-4 py-12 bg-gradient-to-r bg-[#fdffff]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center bg-[#EAFAF8] rounded-2xl shadow-md p-8"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{
            scale: 1.05,
            textShadow: "0px 0px 8px rgba(20, 184, 166, 0.5)",
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
          whileTap={{ scale: 0.98 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl font-bold text-gray-900 mb-6 cursor-pointer select-none"
        >
          OUR TRAINER
        </motion.h2>

        {/* Trainer Image */}
        <div className="flex justify-center mb-6">
          <img
            src="/trainer image/Trainer1.png"
            alt="Trainer"
            className="w-60 h-60 rounded-full  border-10 border-white shadow-md bg-gray-900 object-cover"
          />
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.02,
            color: "#0d9488",
            transition: { duration: 0.2 },
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg font-bold text-teal-700 cursor-pointer"
        >
          Kalpesh Kamble
        </motion.h3>
        <p className="text-sm text-gray-700">Certified Fitness Trainer</p>
        <p className="text-sm text-gray-600 mt-1">9+ years Experience</p>
      </motion.div>
    </section>
  )
}
