import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-cream flex flex-col items-center justify-center"
        >
          {/* Bag icon */}
          <motion.svg
            viewBox="0 0 100 100"
            className="w-20 h-20 mb-6"
            fill="none"
            stroke="hsl(var(--navy))"
            strokeWidth="2"
          >
            <motion.path
              d="M30 40 H70 V80 H30 Z M40 40 Q50 15 60 40"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.svg>

          {/* Brand name */}
          <div className="flex overflow-hidden">
            {"PANTHI".split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05, duration: 0.4 }}
                className="font-sans text-2xl font-bold tracking-[0.3em] uppercase text-foreground"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
            className="font-serif italic text-sm text-muted mt-1"
          >
            First Choice
          </motion.p>

          {/* Gold line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
            className="h-px bg-gold mt-4"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
