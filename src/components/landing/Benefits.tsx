"use client"
import { Check, Leaf, Dumbbell, Flame } from "lucide-react"
import { motion } from "framer-motion"

const benefits = [
  {
    title: "Be Calm",
    icon: <Leaf className="w-8 h-8 text-white" />,
    image: "/Benefits/img1.jpg",
    points: ["Reduce Stress", "Improves sleep quality", "Learn Powerful breathing techniques"],
  },
  {
    title: "Become Flexible",
    icon: <Dumbbell className="w-8 h-8 text-white" />,
    image: "/Benefits/img2.jpg",
    points: ["Increase the flexibility of muscles", "Heal stiffness and tightness in the body", "Reduce Joint pains"],
  },
  {
    title: "Burn Fat",
    icon: <Flame className="w-8 h-8 text-white" />,
    image: "/Benefits/img3.jpg",
    points: ["Burn extra calories", "Learn technique to maintain weight", "Get Stronger"],
  },
]

const Benefits = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 mt-40 mb-20">
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{
          scale: 1.02,
          textShadow: "0px 0px 12px rgba(59, 130, 246, 0.4)",
          transition: { type: "spring", stiffness: 400, damping: 25 },
        }}
        whileTap={{ scale: 0.98 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center text-gray-900 font-sans space-x-0 text-3xl font-bold mb-8 w-full max-w-[1728px] h-auto leading-[100%] mx-auto cursor-pointer select-none"
      >
        REASON TO JOIN US
      </motion.div>

      {/* Benefit Cards */}
      <div className="space-y-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative rounded-xl overflow-hidden shadow-xl group"
          >
            {/* Background Image */}
            <img
              src={benefit.image || "/placeholder.svg"}
              alt={benefit.title}
              className="w-full h-64 md:h-80 object-cover transform group-hover:scale-105 transition duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 group-hover:via-black/40 group-hover:to-transparent transition duration-500 flex flex-col justify-center p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                {benefit.icon}
                <motion.h3
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
                    transition: { duration: 0.2 },
                  }}
                  className="text-2xl font-bold drop-shadow-lg cursor-pointer"
                >
                  {benefit.title}
                </motion.h3>
              </div>
              <ul className="space-y-2">
                {benefit.points.map((point, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-teal-400" />
                    <span className="drop-shadow">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Benefits
