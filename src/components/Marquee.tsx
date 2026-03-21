const text = "HANDMADE IN INDIA · PREMIUM QUALITY · ELEGANT DESIGNS · SHIPPED ACROSS GUJARAT · CRAFTED WITH LOVE · ";

export default function Marquee() {
  return (
    <div className="w-full bg-dark py-3.5 overflow-hidden">
      <div className="marquee-track">
        <span className="font-sans text-[0.7rem] text-gold tracking-[0.3em] uppercase whitespace-nowrap">
          {text}{text}
        </span>
        <span className="font-sans text-[0.7rem] text-gold tracking-[0.3em] uppercase whitespace-nowrap">
          {text}{text}
        </span>
      </div>
    </div>
  );
}
