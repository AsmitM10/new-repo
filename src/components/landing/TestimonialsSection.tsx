"use client"
import { motion } from "framer-motion"
import { testimonials } from "@/data/testimonials"
import StarRating from "@/components/ui/StarRating"

export default function TestimonialsSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          whileHover={{
            scale: 1.02,
            rotateY: 3,
            textShadow: "0px 0px 12px rgba(139, 69, 19, 0.4)",
            transition: { type: "spring", stiffness: 400, damping: 25 },
          }}
          whileTap={{ scale: 0.98, rotateY: -3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl font-bold text-center mb-12 text-gray-900 cursor-pointer select-none"
        >
          TESTIMONIALS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <StarRating rating={testimonial.rating} />
              <motion.h3
                whileHover={{
                  scale: 1.02,
                  color: "#374151",
                  transition: { duration: 0.2 },
                }}
                className="font-semibold text-lg mb-3 text-gray-900 cursor-pointer"
              >
                {testimonial.name}
              </motion.h3>
              <p className="text-gray-600 text-sm leading-relaxed">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
