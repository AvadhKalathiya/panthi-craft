import { Instagram } from "lucide-react";

export default function FloatingIG() {
  return (
    <a
      href="https://www.instagram.com/panthi_first_choice/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-7 right-7 max-md:bottom-5 max-md:right-5 z-[999] w-14 h-14 max-md:w-12 max-md:h-12 rounded-full flex items-center justify-center group pulse-ring"
      style={{
        background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-deep)))",
        boxShadow: "var(--shadow-gold)",
      }}
    >
      <Instagram size={24} className="text-primary-foreground" />
      <span className="absolute right-16 bg-dark text-primary-foreground font-sans text-[0.75rem] px-3 py-1.5 uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none max-md:hidden">
        Order via DM
      </span>
    </a>
  );
}
