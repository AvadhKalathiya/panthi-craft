import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { openInstagramDM } from "@/lib/products";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Collection", path: "/collection" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const textColor = isHome && !scrolled ? "text-primary-foreground" : "text-foreground";
  const logoFilter = isHome && !scrolled ? "brightness-0 invert" : "none";

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 py-4 flex justify-between items-center ${
          scrolled || !isHome ? "nav-scrolled" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-8">
          <Link to="/">
            <img
              src={logo}
              alt="Panthi First Choice"
              className="h-10 md:h-12"
              style={{ filter: logoFilter }}
            />
          </Link>
          <div className={`hidden md:flex gap-6 ${textColor}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-sans text-[0.8rem] uppercase tracking-[0.12em] font-medium hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/panthi_first_choice/"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden md:block ${textColor} hover:text-gold transition-colors`}
          >
            <Instagram size={20} />
          </a>
          <button
            onClick={() => openInstagramDM()}
            className="hidden md:block font-sans text-[0.75rem] uppercase tracking-[0.15em] font-medium px-5 py-2.5 border-[1.5px] border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all"
          >
            Order Now
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden ${textColor}`}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-cream flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  to={link.path}
                  className="font-serif text-h2 text-foreground hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <button
                onClick={() => openInstagramDM()}
                className="font-sans text-sm uppercase tracking-[0.15em] font-medium px-8 py-3 bg-gold text-primary-foreground"
              >
                Order on Instagram
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
