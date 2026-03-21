import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#110F0D] pt-20 pb-8 px-[clamp(1.5rem,5vw,4rem)]">
      <div className="max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <img
              src={logo}
              alt="Panthi First Choice"
              className="h-16 mb-4 object-contain"
            />
            <p className="font-sans font-light text-sm text-primary-foreground/50 mb-1">
              Premium Handmade Purses
            </p>
            <p className="font-sans font-light text-sm text-primary-foreground/50">
              Made in India 🇮🇳
            </p>
            <a
              href="https://www.instagram.com/panthi_first_choice/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-primary-foreground/60 hover:text-gold transition-colors"
            >
              <Instagram size={20} />
            </a>
          </div>

          {/* Navigate */}
          <div>
            <span className="eyebrow block mb-4">Navigate</span>
            {[
              { label: "Home", path: "/" },
              { label: "Collection", path: "/collection" },
              { label: "About", path: "/about" },
              { label: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block font-sans font-light text-sm text-primary-foreground/60 hover:text-gold transition-colors mb-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <span className="eyebrow block mb-4">Contact</span>
            <a
              href="https://www.instagram.com/panthi_first_choice/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-primary-foreground hover:text-gold transition-colors block mb-2"
            >
              @panthi_first_choice
            </a>
            <p className="font-sans font-light text-sm text-primary-foreground/50">
              Instagram DM for orders
            </p>
          </div>

          {/* Order */}
          <div>
            <span className="eyebrow block mb-4">Order Today</span>
            <p className="font-sans font-light text-sm text-primary-foreground/60 mb-4">
              Message us on Instagram for orders, custom requests, and questions.
            </p>
            <a
              href="https://www.instagram.com/panthi_first_choice/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-gold text-gold font-sans text-xs uppercase tracking-[0.15em] px-6 py-2.5 hover:bg-gold hover:text-primary-foreground transition-all"
            >
              DM on Instagram
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/[0.08] pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="font-sans font-light text-xs text-primary-foreground/35">
            © 2025 Panthi First Choice. All rights reserved.
          </span>
          <span className="font-sans font-light text-xs text-primary-foreground/35">
            Handmade with ❤️ in India
          </span>
        </div>
      </div>
    </footer>
  );
}
