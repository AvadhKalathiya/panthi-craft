import { Instagram } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

const tiles = [product1, product2, product3, product4, product5, product6];

export default function InstagramGallery() {
  return (
    <section className="py-[7.5rem] max-md:py-[4.5rem] px-[clamp(1.5rem,5vw,4rem)]">
      <div className="max-w-[1340px] mx-auto">
        <ScrollReveal className="text-center mb-12">
          <span className="eyebrow block mb-4">Instagram</span>
          <h2 className="font-serif text-h2 italic text-foreground mb-3">
            Follow Our Journey
          </h2>
          <a
            href="https://www.instagram.com/panthi_first_choice/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-gold hover:underline"
          >
            @panthi_first_choice
          </a>
        </ScrollReveal>

        <div className="grid grid-cols-3 sm:grid-cols-3 gap-1">
          {tiles.map((src, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <a
                href="https://www.instagram.com/panthi_first_choice/"
                target="_blank"
                rel="noopener noreferrer"
                className="img-square block relative group"
              >
                <img
                  src={src}
                  alt="Instagram post"
                  loading="lazy"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/55 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                  <Instagram size={28} className="text-primary-foreground mb-2" />
                  <span className="font-sans text-primary-foreground text-xs tracking-[0.1em]">
                    View Post
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-8">
          <a
            href="https://www.instagram.com/panthi_first_choice/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-[1.5px] border-gold text-gold font-sans text-xs uppercase tracking-[0.15em] font-medium px-8 py-3 hover:bg-gold hover:text-primary-foreground transition-all"
          >
            Follow on Instagram →
          </a>
          <p className="font-sans text-xs text-muted mt-4">
            Tag us #PanthiFirstChoice to be featured on our page
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
