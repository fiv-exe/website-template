"use client";

import { useEffect, useRef } from "react";

export default function Booking() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    const el = ref.current?.querySelector(".reveal");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="termin"
      className="py-24 md:py-36 px-6 md:px-12 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 text-center relative overflow-hidden"
    >
      {/* Decorative circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full border border-teal-200/30 pointer-events-none" />

      <div className="reveal relative z-10">
        <p className="text-xs tracking-[0.3em] uppercase text-teal-600 mb-5 font-light">
          Bereit fur Ihre Verwandlung?
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-slate-900 mb-4">
          Jetzt <em className="italic text-teal-600">Termin</em> buchen
        </h2>
        <p className="text-slate-500 max-w-lg mx-auto font-light leading-relaxed mb-10">
          Vereinbaren Sie ganz einfach Ihren Wunschtermin &mdash; telefonisch,
          per WhatsApp oder direkt uber unser Kontaktformular.
        </p>
        <a
          href="#kontakt"
          className="inline-block px-12 py-5 bg-slate-900 text-white text-sm uppercase tracking-[0.2em] font-light relative overflow-hidden group transition-all duration-500 hover:bg-teal-700"
        >
          <span className="relative z-10">Termin anfragen</span>
        </a>
      </div>
    </section>
  );
}
