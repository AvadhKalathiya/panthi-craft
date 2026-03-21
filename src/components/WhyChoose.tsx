import ScrollReveal from "./ScrollReveal";

const values = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-gold mx-auto mb-6">
        <path d="M24 4v40M12 16c0 0 4-8 12-8s12 8 12 8M8 28l8 4 8-8 8 8 8-4" />
      </svg>
    ),
    num: "01",
    title: "Handmade Craftsmanship",
    text: "Every stitch is crafted with precision by skilled artisans, ensuring each purse is truly one-of-a-kind.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-gold mx-auto mb-6">
        <path d="M24 4l6 12 12 2-8 10 2 12-12-6-12 6 2-12-8-10 12-2z" />
      </svg>
    ),
    num: "02",
    title: "Premium Materials",
    text: "We source only the finest quality materials to create purses that are as durable as they are beautiful.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-gold mx-auto mb-6">
        <circle cx="24" cy="24" r="8" />
        <path d="M24 4c0 8-8 12-8 20s8 12 8 20M24 4c0 8 8 12 8 20s-8 12-8 20" />
      </svg>
    ),
    num: "03",
    title: "Elegant Designs",
    text: "Our designs are timeless, refined, and crafted for the modern Indian woman who values elegance.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-gold mx-auto mb-6">
        <path d="M24 8c-8 0-16 8-16 16s16 16 16 16 16-8 16-16-8-16-16-16z" />
        <circle cx="24" cy="24" r="4" />
      </svg>
    ),
    num: "04",
    title: "Made in India",
    text: "Proudly supporting Indian craftsmanship and artisans with every handcrafted piece we create.",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-[7.5rem] max-md:py-[4.5rem] px-[clamp(1.5rem,5vw,4rem)] bg-beige">
      <div className="max-w-[1340px] mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="eyebrow block mb-4">Our Promise</span>
          <h2 className="font-serif text-h2 italic text-foreground">
            Why Panthi First Choice?
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {values.map((v, i) => (
            <ScrollReveal key={i} delay={i * 150} className="text-center relative">
              <span className="font-serif text-[3.5rem] font-light text-sand absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-0 select-none">
                {v.num}
              </span>
              <div className="relative z-10 pt-8">
                {v.icon}
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {v.title}
                </h3>
                <p className="font-sans font-light text-sm leading-[1.8] text-charcoal">
                  {v.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
