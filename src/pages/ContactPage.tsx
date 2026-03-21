import { Instagram } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 flex flex-col items-center justify-center bg-cream">
      <ScrollReveal className="text-center max-w-[500px] mx-auto">
        <span className="eyebrow block mb-4">Get in Touch</span>
        <h1 className="font-serif text-h1 italic text-foreground mb-4">
          We&rsquo;re Just a DM Away
        </h1>
        <p className="font-sans font-light text-muted leading-relaxed mb-10">
          Reach out for orders, custom requests, or collaborations.
          We respond quickly and personally on Instagram.
        </p>

        <div
          className="max-w-[420px] mx-auto bg-card p-10 text-center"
          style={{ boxShadow: "var(--shadow-md)" }}
        >
          <Instagram size={48} className="text-gold mx-auto mb-6" />
          <h2 className="font-serif text-2xl text-foreground mb-2">
            @panthi_first_choice
          </h2>
          <p className="font-sans font-light text-xs text-muted tracking-wide uppercase mb-6">
            Instagram · Orders · Collaborations
          </p>

          <div className="h-px bg-sand mb-6" />

          <a
            href="https://www.instagram.com/panthi_first_choice/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-dark text-primary-foreground font-sans font-medium text-sm uppercase tracking-[0.12em] py-4 text-center hover:bg-gold transition-all"
          >
            Message Us on Instagram
          </a>
        </div>

        <div className="mt-8 space-y-2 font-sans font-light text-sm text-muted">
          <p>⏱ Response time: Usually within 1–2 hours</p>
          <p>📅 Available: Monday–Saturday, 10am–8pm IST</p>
        </div>
      </ScrollReveal>
    </div>
  );
}
