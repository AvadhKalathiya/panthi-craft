import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Increased time slightly for a more luxurious, unhurried feel
    const timer = setTimeout(() => setShow(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-cream flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle background animated accent */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.05 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#C9A96E_0%,_transparent_50%)]"
          />

          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Elegant SVG Bag Draw & Fill */}
            <motion.svg
              viewBox="0 0 100 100"
              className="w-24 h-24 mb-6 drop-shadow-sm"
              fill="none"
              stroke="#C9A96E"
              strokeWidth="1.5"
            >
              <motion.path
                d="M30 40 H70 V80 H30 Z M40 40 Q50 15 60 40"
                initial={{ pathLength: 0, fill: "rgba(201, 169, 110, 0)" }}
                animate={{ pathLength: 1, fill: "rgba(201, 169, 110, 0.15)" }}
                transition={{ 
                  pathLength: { duration: 1.2, ease: "easeInOut" },
                  fill: { duration: 0.8, delay: 1 }
                }}
              />
            </motion.svg>

            {/* Brand name with dramatic stagger & blur */}
            <div className="flex overflow-hidden pb-2">
              {"PANTHI".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, filter: "blur(4px)", scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  transition={{ 
                    delay: 0.8 + i * 0.1, 
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1] 
                  }}
                  className="font-sans text-3xl md:text-4xl font-bold tracking-[0.4em] uppercase text-charcoal ml-[0.4em]"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, letterSpacing: "0em" }}
              animate={{ opacity: 1, letterSpacing: "0.15em" }}
              transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
              className="font-serif italic text-base md:text-lg text-gold mt-2"
            >
              First Choice
            </motion.p>

            {/* Glowing line that splits outwards */}
            <div className="relative mt-6 w-32 h-[1px]">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent origin-center"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
