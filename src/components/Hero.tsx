import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { openInstagramDM } from "@/lib/products";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [hero1, hero2, hero3];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1200ms]"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={src}
            alt={`Luxury purse slide ${i + 1}`}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,23,20,0.15) 0%, rgba(26,23,20,0.05) 40%, rgba(26,23,20,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-[2] flex items-end justify-center pb-[12%]">
        <div className="text-center px-6 max-w-[800px]">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="eyebrow block mb-4"
            style={{ letterSpacing: "0.35em" }}
          >
            New Collection 2025
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif text-hero text-primary-foreground italic leading-[0.95] tracking-tight mb-4"
          >
            Panthi First Choice
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="font-serif italic text-primary-foreground/90 text-lg md:text-2xl mb-2"
          >
            Premium Handmade Purses
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="font-sans font-light text-primary-foreground/70 text-sm tracking-wide mb-8"
          >
            Where Quality Meets Style
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/collection"
              className="bg-gold text-primary-foreground px-10 py-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] hover:bg-gold-deep hover:-translate-y-0.5 transition-all"
            >
              Shop Collection
            </Link>
            <button
              onClick={() => openInstagramDM()}
              className="border-[1.5px] border-primary-foreground text-primary-foreground px-10 py-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] hover:bg-primary-foreground hover:text-foreground transition-all"
            >
              Order on Instagram
            </button>
          </motion.div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-[2.5%] left-1/2 -translate-x-1/2 z-[2] flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 bg-gold"
                : "w-1.5 bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[3%] right-[4%] z-[2] flex flex-col items-center gap-1">
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-primary-foreground/60">
          scroll
        </span>
        <ChevronDown size={14} className="text-primary-foreground/60 scroll-bounce" />
      </div>
    </section>
  );
}
